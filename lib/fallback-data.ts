/**
 * Fallback data used when the database has no settings.
 * This file is committed so the app can build and deploy on Vercel.
 * lib/data.ts may be gitignored for local seeding.
 */
import { i18n } from '@/i18n-config'
import type { ISettingInput } from '@/types'

export const headerMenus = [
	{ name: "Today's Deal", href: '/search?tag=todays-deal' },
	{ name: 'New Arrivals', href: '/search?tag=new-arrival' },
	{ name: 'Featured Products', href: '/search?tag=featured' },
	{ name: 'Best Sellers', href: '/search?tag=best-seller' },
	{ name: 'Browsing History', href: '/#browsing-history' },
	{ name: 'Customer Service', href: '/page/customer-service' },
	{ name: 'About Us', href: '/page/about-us' },
	{ name: 'Help', href: '/page/help' },
]

export const defaultSetting: ISettingInput = {
	common: {
		freeShippingMinPrice: 35,
		isMaintenanceMode: false,
		defaultTheme: 'Light',
		defaultColor: 'Gold',
		pageSize: 9,
	},
	site: {
		name: 'Caeser Store',
		description:
			'Caeser Store is a sample Ecommerce website built with Next.js, Tailwind CSS, and MongoDB.',
		keywords: 'Next Ecommerce, Next.js, Tailwind CSS, MongoDB',
		url: 'https://caeser-store.vercel.app',
		logo: '/icons/logo.png',
		slogan: 'Beyond Fashion. Pure Luxury.',
		author: 'Caeser Store',
		copyright:
			'2019-2026  Caeser Store Inc. and its affiliates. All rights reserved.',
		email: 'caeserlondon@gmail.com',
		address: '123, Caeser Street, Hyde Park, London W2 2UH',
		phone: '+44 07868863113',
	},
	carousels: [
		{
			title: 'Discover Our Most Fashionable New Arrivals',
			buttonCaption: 'Shop Now',
			image: '/images/banner1.jpg',
			url: '/search?tag=new-arrival',
		},
		{
			title: 'Elevate Your Style with Exquisite Cufflinks',
			buttonCaption: 'See More',
			image: '/images/banner2.jpg',
			url: '/search?category=Cufflinks',
		},
		{
			title: 'Explore the Finest Collection of Wrist Watches',
			buttonCaption: 'See More',
			image: '/images/banner3.jpg',
			url: '/search?category=Wrist+Watches',
		},
	],
	availableLanguages: i18n.locales.map((locale) => ({
		code: locale.code,
		name: locale.name,
	})),
	defaultLanguage: 'en-GB',
	availableCurrencies: [
		{ name: 'British Pound', code: 'GBP', symbol: '£', convertRate: 1 },
		{
			name: 'United States Dollar',
			code: 'USD',
			symbol: '$',
			convertRate: 1.27,
		},
		{ name: 'Euro', code: 'EUR', symbol: '€', convertRate: 1.17 },
		{ name: 'UAE Dirham', code: 'AED', symbol: 'AED', convertRate: 4.65 },
	],
	defaultCurrency: 'GBP',
	availablePaymentMethods: [
		{ name: 'PayPal', commission: 0 },
		{ name: 'Stripe', commission: 0 },
		{ name: 'Cash On Delivery', commission: 0 },
	],
	defaultPaymentMethod: 'PayPal',
	availableDeliveryDates: [
		{
			name: 'Tomorrow',
			daysToDeliver: 1,
			shippingPrice: 12.9,
			freeShippingMinPrice: 0,
		},
		{
			name: 'Next 3 Days',
			daysToDeliver: 3,
			shippingPrice: 6.9,
			freeShippingMinPrice: 0,
		},
		{
			name: 'Next 5 Days',
			daysToDeliver: 5,
			shippingPrice: 4.9,
			freeShippingMinPrice: 35,
		},
	],
	defaultDeliveryDate: 'Next 5 Days',
}
