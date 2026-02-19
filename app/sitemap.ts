import { connectToDatabase } from '@/lib/db'
import Product from '@/lib/db/models/product.model'
import { getSetting } from '@/lib/actions/setting.actions'
import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl =
		process.env.NEXT_PUBLIC_SITE_URL ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
		'https://caeser-store.vercel.app'

	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily' as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/search`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		},
	]

	try {
		await connectToDatabase()
		const { site } = await getSetting()
		const siteBaseUrl = site.url.replace(/\/$/, '') || baseUrl

		const products = await Product.find(
			{ isPublished: true },
			{ slug: 1, updatedAt: 1 }
		)
			.lean()
			.exec()

		const productEntries = products.map((product) => ({
			url: `${siteBaseUrl}/product/${product.slug}`,
			lastModified: (product.updatedAt as Date) || new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.7,
		}))

		return [...staticPages, ...productEntries]
	} catch {
		return staticPages
	}
}
