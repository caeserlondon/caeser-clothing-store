import Image from 'next/image'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Link } from '@/i18n/routing'

type HomeCardItem = {
	name: string
	image: string
	href: string
}

type HomeCardData = {
	title: string
	link?: {
		text: string
		href: string
	}
	items: HomeCardItem[]
}

export function HomeCard({ cards }: { cards: HomeCardData[] }) {
	if (!cards.length) return null

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
			{cards.map((card) => (
				<Card key={card.title} className='flex flex-col rounded-none'>
					<CardContent className='flex-1 p-4'>
						<h3 className='mb-4 text-xl font-bold'>{card.title}</h3>

						<div className='grid grid-cols-2 gap-4'>
							{card.items.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className='flex flex-col'
								>
									<Image
										src={item.image}
										alt={item.name}
										width={120}
										height={120}
										className='mx-auto aspect-square h-auto max-w-full object-scale-down'
									/>
									<p className='truncate text-center text-sm'>{item.name}</p>
								</Link>
							))}
						</div>
					</CardContent>

					{card.link && (
						<CardFooter>
							<Link href={card.link.href}>{card.link.text}</Link>
						</CardFooter>
					)}
				</Card>
			))}
		</div>
	)
}
