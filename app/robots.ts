import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [
				'/admin',
				'/api', // Protect Next.js API routes from crawlers
				'/cart',
				'/checkout',
			],
		},
		sitemap: 'https://caeser-store.vercel.app',
	}
}
