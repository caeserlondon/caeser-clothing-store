'use client'

import Image from 'next/image'
import { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const GALLERY_IMAGE_SIZES =
	'(max-width: 768px) 82vw, (max-width: 1280px) 60vw, 50vw'

export default function ProductGallery({ images }: { images: string[] }) {
	const [selectedImage, setSelectedImage] = useState(0)

	return (
		<div className='flex gap-2'>
			<div className='mt-8 flex flex-col gap-2'>
				{images.map((image, index) => (
					<button
						key={index}
						type='button'
						onClick={() => setSelectedImage(index)}
						onMouseOver={() => setSelectedImage(index)}
						className={`overflow-hidden rounded-lg bg-white ${
							selectedImage === index
								? 'ring-2 ring-blue-500'
								: 'ring-1 ring-gray-300'
						}`}
						aria-label={`Show product image ${index + 1}`}
					>
						<Image
							src={image}
							alt={`Product thumbnail ${index + 1}`}
							width={48}
							height={48}
						/>
					</button>
				))}
			</div>

			<div className='w-full'>
				<Zoom>
					<div className='relative h-[500px]'>
						<Image
							src={images[selectedImage]}
							alt={`Product image ${selectedImage + 1}`}
							fill
							sizes={GALLERY_IMAGE_SIZES}
							className='object-contain'
							priority
						/>
					</div>
				</Zoom>
			</div>
		</div>
	)
}
