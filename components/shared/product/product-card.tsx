import { Link } from '@/i18n/routing'
import Image from 'next/image'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IProduct } from '@/lib/db/models/product.model'
import { formatNumber, generateId, round2 } from '@/lib/utils'

import AddToCart from './add-to-cart'
import ImageHover from './image-hover'
import ProductPrice from './product-price'
import Rating from './rating'

const CARD_IMAGE_SIZES =
	'(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 117px'

const ProductCard = ({
	product,
	hideBorder = false,
	hideDetails = false,
	hideAddToCart = false,
}: {
	product: IProduct
	hideDetails?: boolean
	hideBorder?: boolean
	hideAddToCart?: boolean
}) => {
	const ProductImage = () => (
		<Link href={`/product/${product.slug}`}>
			<div className='relative h-52'>
				{product.images.length > 1 ? (
					<ImageHover
						src={product.images[0]}
						hoverSrc={product.images[1]}
						alt={product.name}
						sizes={CARD_IMAGE_SIZES}
					/>
				) : (
					<Image
						src={product.images[0]}
						alt={product.name}
						fill
						sizes={CARD_IMAGE_SIZES}
						className='object-contain'
					/>
				)}
			</div>
		</Link>
	)

	const ProductDetails = () => (
		<div className='flex-1 space-y-2'>
			<p className='font-bold'>{product.brand}</p>

			<Link
				href={`/product/${product.slug}`}
				className='overflow-hidden text-ellipsis'
				style={{
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
				}}
			>
				{product.name}
			</Link>

			<div className='flex justify-center gap-2'>
				<Rating rating={product.avgRating} />
				<span>({formatNumber(product.numReviews)})</span>
			</div>

			<ProductPrice
				isDeal={product.tags.includes('todays-deal')}
				price={product.price}
				listPrice={product.listPrice}
				forListing
			/>
		</div>
	)

	const AddButton = () => (
		<div className='w-full text-center'>
			<AddToCart
				minimal
				item={{
					clientId: generateId(),
					product: product._id,
					size: product.sizes[0],
					color: product.colors[0],
					countInStock: product.countInStock,
					name: product.name,
					slug: product.slug,
					category: product.category,
					price: round2(product.price),
					quantity: 1,
					image: product.images[0],
				}}
			/>
		</div>
	)

	return hideBorder ? (
		<div className='flex flex-col'>
			<ProductImage />
			{!hideDetails && (
				<>
					<div className='flex-1 p-3 text-center'>
						<ProductDetails />
					</div>
					{!hideAddToCart && <AddButton />}
				</>
			)}
		</div>
	) : (
		<Card className='flex flex-col'>
			<CardHeader className='p-3'>
				<ProductImage />
			</CardHeader>

			{!hideDetails && (
				<>
					<CardContent className='flex-1 p-3 text-center'>
						<ProductDetails />
					</CardContent>
					<CardFooter className='p-3'>
						{!hideAddToCart && <AddButton />}
					</CardFooter>
				</>
			)}
		</Card>
	)
}

export default ProductCard
