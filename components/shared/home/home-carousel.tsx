import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import type { Carousel } from '@/types'
import HomeCarouselEnhancer from './home-carousel-enhancer'

export async function HomeCarousel({ items }: { items: Carousel[] }) {
	const t = await getTranslations('Home')

	if (!items.length) return null

	const firstItem = items[0]

	return (
		<div className='relative mx-auto w-full'>
			<section
				id='home-hero-fallback'
				className='relative flex aspect-[16/6] items-center overflow-hidden'
			>
				<Image
					src={firstItem.image}
					alt={t(firstItem.title)}
					fill
					fetchPriority='high'
					loading='eager'
					sizes='100vw'
					className='object-cover'
				/>

				<div className='absolute left-6 top-1/2 w-2/3 -translate-y-1/2 md:left-16 md:w-1/3'>
					<h1 className='mb-4 text-xl font-bold text-primary md:text-6xl'>
						{t(firstItem.title)}
					</h1>

					<Link
						href={firstItem.url}
						className={cn(buttonVariants(), 'hidden md:inline-flex')}
					>
						{t(firstItem.buttonCaption)}
					</Link>
				</div>
			</section>

			{items.length > 1 ? <HomeCarouselEnhancer items={items} /> : null}
		</div>
	)
}
