import { Star } from 'lucide-react'

export default function Rating({
	rating = 0,
	size = 6,
}: {
	rating: number
	size?: number
}) {
	const safeRating = Math.max(0, Math.min(5, rating))
	const fullStars = Math.floor(safeRating)
	const partialStar = safeRating % 1
	const emptyStars = 5 - Math.ceil(safeRating)

	// Keep the existing API where size=6 roughly matches Tailwind w-6/h-6
	const iconPx = size * 4

	return (
		<div
			className='flex items-center'
			role='img'
			aria-label={`Rating: ${safeRating.toFixed(1)} out of 5 stars`}
		>
			{[...Array(fullStars)].map((_, i) => (
				<Star
					key={`full-${i}`}
					size={iconPx}
					className='fill-primary text-primary'
					aria-hidden='true'
				/>
			))}

			{partialStar > 0 && (
				<div
					className='relative'
					style={{ width: iconPx, height: iconPx }}
					aria-hidden='true'
				>
					<Star size={iconPx} className='text-primary' />
					<div
						className='absolute left-0 top-0 overflow-hidden'
						style={{ width: `${partialStar * 100}%`, height: iconPx }}
					>
						<Star size={iconPx} className='fill-primary text-primary' />
					</div>
				</div>
			)}

			{[...Array(emptyStars)].map((_, i) => (
				<Star
					key={`empty-${i}`}
					size={iconPx}
					className='text-primary'
					aria-hidden='true'
				/>
			))}
		</div>
	)
}
