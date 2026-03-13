import type { NextConfig } from 'next'
import withNextIntl from 'next-intl/plugin'

const nextConfig: NextConfig = withNextIntl()({
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
			},
		],
		deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1536, 1920, 2048, 3840],
	},
})

export default nextConfig
