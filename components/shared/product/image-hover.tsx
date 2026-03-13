'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type ImageHoverProps = {
	src: string
	hoverSrc: string
	alt: string
	sizes?: string
}

const DEFAULT_CARD_IMAGE_SIZES =
	'(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 117px'

const ImageHover = ({
	src,
	hoverSrc,
	alt,
	sizes = DEFAULT_CARD_IMAGE_SIZES,
}: ImageHoverProps) => {
	const [isHovered, setIsHovered] = useState(false)
	const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const handleMouseEnter = () => {
		hoverTimeoutRef.current = setTimeout(() => {
			setIsHovered(true)
		}, 1000)
	}

	const handleMouseLeave = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current)
			hoverTimeoutRef.current = null
		}
		setIsHovered(false)
	}

	useEffect(() => {
		return () => {
			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current)
			}
		}
	}, [])

	return (
		<div
			className='relative h-52'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Image
				src={src}
				alt={alt}
				fill
				sizes={sizes}
				className={`object-contain transition-opacity duration-500 ${
					isHovered ? 'opacity-0' : 'opacity-100'
				}`}
			/>
			<Image
				src={hoverSrc}
				alt={alt}
				fill
				sizes={sizes}
				className={`absolute inset-0 object-contain transition-opacity duration-500 ${
					isHovered ? 'opacity-100' : 'opacity-0'
				}`}
			/>
		</div>
	)
}

export default ImageHover
