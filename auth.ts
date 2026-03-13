import { MongoDBAdapter } from '@auth/mongodb-adapter'
import bcrypt from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { connectToDatabase } from './lib/db'
import client from './lib/db/client'
import User from './lib/db/models/user.model'

import NextAuth, { type DefaultSession } from 'next-auth'
import authConfig from './auth.config'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			role: string
		} & DefaultSession['user']
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	pages: {
		signIn: '/sign-in',
		newUser: '/',
		error: '/sign-in',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	adapter: MongoDBAdapter(client),
	providers: [
		Google({
			allowDangerousEmailAccountLinking: true,
		}),
		CredentialsProvider({
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' },
			},
			async authorize(credentials) {
				await connectToDatabase()
				if (!credentials) return null

				const user = await User.findOne({ email: credentials.email })

				if (user && user.password) {
					const isMatch = await bcrypt.compare(
						credentials.password as string,
						user.password,
					)

					if (isMatch) {
						return {
							id: String(user._id),
							name: user.name,
							email: user.email,
							role: user.role ?? 'user',
						}
					}
				}

				return null
			},
		}),
	],
	callbacks: {
		...authConfig.callbacks,
		async jwt({ token, user, trigger, session }) {
			if (user) {
				const fallbackName = user.name ?? user.email?.split('@')[0] ?? 'User'

				if (!user.name && user.id) {
					await connectToDatabase()
					await User.findByIdAndUpdate(user.id, {
						name: fallbackName,
						role: (user as { role?: string }).role ?? 'user',
					})
				}

				token.name = fallbackName
				token.role =
					(user as { role?: string }).role ??
					(token.role as string | undefined) ??
					'user'
			}

			if (trigger === 'update' && session?.user?.name) {
				token.name = session.user.name
			}

			return token
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub ?? ''
				session.user.role = (token.role as string) ?? 'user'
				session.user.name =
					(token.name as string | undefined) ?? session.user.name ?? 'User'
			}

			return session
		},
	},
})
