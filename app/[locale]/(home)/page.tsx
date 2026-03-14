import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import { HomeCard } from '@/components/shared/home/home-card'
import { HomeCarousel } from '@/components/shared/home/home-carousel'
import ProductSlider from '@/components/shared/product/product-slider'
import { Card, CardContent } from '@/components/ui/card'

import {
	getAllCategories,
	getProductsByTag,
	getProductsForCard,
} from '@/lib/actions/product.actions'
import { getSetting } from '@/lib/actions/setting.actions'
import { CATEGORY_IMAGES } from '@/lib/constants'
import { toSlug } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import { unstable_cache } from 'next/cache'

const getHomePageData = unstable_cache(
	async () => {
		const [
			setting,
			todaysDeals,
			bestSellingProducts,
			allCategories,
			newArrivals,
			featureds,
			bestSellers,
		] = await Promise.all([
			getSetting(),
			getProductsByTag({ tag: 'todays-deal' }),
			getProductsByTag({ tag: 'best-seller' }),
			getAllCategories(),
			getProductsForCard({ tag: 'new-arrival' }),
			getProductsForCard({ tag: 'featured' }),
			getProductsForCard({ tag: 'best-seller' }),
		])

		return {
			setting,
			todaysDeals,
			bestSellingProducts,
			allCategories,
			newArrivals,
			featureds,
			bestSellers,
		}
	},
	['home-page-data'],
	{
		tags: ['home-page', 'products', 'setting'],
		revalidate: 300,
	},
)

export default async function HomePage() {
	const t = await getTranslations('Home')

	const {
		setting,
		todaysDeals,
		bestSellingProducts,
		allCategories,
		newArrivals,
		featureds,
		bestSellers,
	} = await getHomePageData()

	const { carousels } = setting
	const categories = allCategories.slice(0, 4)

	const cards = [
		{
			title: t('Categories to explore'),
			link: {
				text: t('Browse all categories'),
				href: '/search',
			},
			items: categories.map((category) => ({
				name: category,
				image: CATEGORY_IMAGES[category] ?? `/images/${toSlug(category)}.avif`,
				href: `/search?category=${category}`,
			})),
		},
		{
			title: t('Explore New Arrivals'),
			items: newArrivals,
			link: {
				text: t('View all new arrivals'),
				href: '/search?tag=new-arrival',
			},
		},
		{
			title: t('Discover Best Sellers'),
			items: bestSellers,
			link: {
				text: t('View all best sellers'),
				href: '/search?tag=best-seller',
			},
		},
		{
			title: t('Featured Products'),
			items: featureds,
			link: {
				text: t('Shop featured products'),
				href: '/search?tag=featured',
			},
		},
	]

	return (
		<>
			<HomeCarousel items={carousels} />

			<div className='bg-border md:space-y-4 md:p-4'>
				<HomeCard cards={cards} />

				<Card className='w-full rounded-none'>
					<CardContent className='items-center gap-3 p-4'>
						<ProductSlider title={t("Today's Deals")} products={todaysDeals} />
					</CardContent>
				</Card>

				<Card className='w-full rounded-none'>
					<CardContent className='items-center gap-3 p-4'>
						<ProductSlider
							title={t('Best Selling Products')}
							products={bestSellingProducts}
							hideDetails
						/>
					</CardContent>
				</Card>
			</div>

			<div className='bg-background p-4'>
				<BrowsingHistoryList />
			</div>
		</>
	)
}
