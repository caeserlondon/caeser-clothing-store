import { auth } from '@/auth'

import { Button, buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOut } from '@/lib/actions/user.actions'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function UserButton() {
	const t = await getTranslations()
	const session = await auth()

	return (
		<div className='flex items-center gap-2'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type='button'
						className='header-button flex items-center'
						aria-label={
							session?.user?.name
								? `${t('Header.Account & Orders')}, ${session.user.name}`
								: `${t('Header.Sign in')} ${t('Header.Account & Orders')}`
						}
					>
						<div className='flex flex-col text-left text-xs'>
							<span>
								{t('Header.Hello')},{' '}
								{session?.user?.name ?? t('Header.sign in')}
							</span>
							<span className='font-bold'>{t('Header.Account & Orders')}</span>
						</div>
						<ChevronDownIcon aria-hidden='true' focusable='false' />
					</button>
				</DropdownMenuTrigger>

				{session ? (
					<DropdownMenuContent className='w-56' align='end' forceMount>
						<DropdownMenuLabel className='font-normal'>
							<div className='flex flex-col space-y-1'>
								<p className='text-sm font-medium leading-none'>
									{session.user.name}
								</p>
								<p className='text-xs leading-none text-muted-foreground'>
									{session.user.email}
								</p>
							</div>
						</DropdownMenuLabel>

						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href='/account'>{t('Header.Your account')}</Link>
							</DropdownMenuItem>

							<DropdownMenuItem asChild>
								<Link href='/account/orders'>{t('Header.Your orders')}</Link>
							</DropdownMenuItem>

							{session.user.role === 'Admin' && (
								<DropdownMenuItem asChild>
									<Link href='/admin/overview'>{t('Header.Admin')}</Link>
								</DropdownMenuItem>
							)}
						</DropdownMenuGroup>

						<DropdownMenuItem className='mb-1 p-0'>
							<form action={SignOut} className='w-full'>
								<Button
									type='submit'
									className='h-4 w-full justify-start px-2 py-4'
									variant='ghost'
								>
									{t('Header.Sign out')}
								</Button>
							</form>
						</DropdownMenuItem>
					</DropdownMenuContent>
				) : (
					<DropdownMenuContent className='w-56' align='end' forceMount>
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link
									className={cn(buttonVariants(), 'w-full')}
									href='/sign-in'
								>
									{t('Header.Sign in')}
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuLabel>
							<div className='font-normal'>
								{t('Header.New Customer')}?{' '}
								<Link href='/sign-up'>{t('Header.Sign up')}</Link>
							</div>
						</DropdownMenuLabel>
					</DropdownMenuContent>
				)}
			</DropdownMenu>
		</div>
	)
}
