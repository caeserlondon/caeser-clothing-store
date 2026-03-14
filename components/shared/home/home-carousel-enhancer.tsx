'use client'

import Autoplay from 'embla-carousel-autoplay'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import * as React from 'react'

import { buttonVariants } from '@/components/ui/button'
import {
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	Carousel as UiCarousel,
} from '@/components/ui/carousel'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import type { Carousel } from '@/types'

export default function HomeCarouselEnhancer({ items }: { items: Carousel[] }) {
	const t = useTranslations('Home')
	const [ready, setReady] = React.useState(false)

	const autoplay = React.useRef(
		Autoplay({ delay: 3000, stopOnInteraction: true }),
	)

	React.useEffect(() => {
		const showCarousel = () => {
			setReady(true)

			const fallback = document.getElementById('home-hero-fallback')
			if (fallback) {
				fallback.setAttribute('hidden', '')
				fallback.setAttribute('inert', '')
			}
		}

		if (document.readyState === 'complete') {
			const id = window.setTimeout(showCarousel, 300)
			return () => window.clearTimeout(id)
		}

		window.addEventListener('load', showCarousel, { once: true })

		return () => {
			window.removeEventListener('load', showCarousel)

			const fallback = document.getElementById('home-hero-fallback')
			if (fallback) {
				fallback.removeAttribute('hidden')
				fallback.removeAttribute('inert')
			}
		}
	}, [])

	if (!ready) return null

	return (
		<div className='absolute inset-0'>
			<UiCarousel
				dir='ltr'
				plugins={[autoplay.current]}
				className='h-full w-full'
				onMouseEnter={autoplay.current.stop}
				onMouseLeave={autoplay.current.reset}
			>
				<CarouselContent className='h-full'>
					{items.map((item) => (
						<CarouselItem key={item.title} className='h-full'>
							<div className='relative flex aspect-[16/6] items-center overflow-hidden'>
								<Image
									src={item.image}
									alt={t(item.title)}
									fill
									sizes='100vw'
									loading='lazy'
									fetchPriority='low'
									className='object-cover'
								/>

								<div className='absolute left-6 top-1/2 w-2/3 -translate-y-1/2 md:left-16 md:w-1/3'>
									<h2 className='mb-4 text-xl font-bold text-primary md:text-6xl'>
										{t(item.title)}
									</h2>

									<Link
										href={item.url}
										className={cn(buttonVariants(), 'hidden md:inline-flex')}
									>
										{t(item.buttonCaption)}
									</Link>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselPrevious className='left-2 md:left-6' />
				<CarouselNext className='right-2 md:right-6' />
			</UiCarousel>
		</div>
	)
}
