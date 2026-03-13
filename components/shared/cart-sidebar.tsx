'use client'

import useCartStore from '@/hooks/use-cart-store'
import useSettingStore from '@/hooks/use-setting-store'
import { getDirection } from '@/i18n-config'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { TrashIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button, buttonVariants } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { Separator } from '../ui/separator'
import ProductPrice from './product/product-price'

export default function CartSidebar() {
	const {
		cart: { items, itemsPrice },
		updateItem,
		removeItem,
	} = useCartStore()

	const {
		setting: {
			common: { freeShippingMinPrice },
		},
	} = useSettingStore()

	const t = useTranslations()
	const locale = useLocale()

	return (
		<div className='w-32 overflow-y-auto'>
			<div
				className={`fixed h-full w-32 ${
					getDirection(locale) === 'rtl' ? 'border-r' : 'border-l'
				}`}
			>
				<div className='flex h-full flex-col items-center justify-center gap-2 p-2'>
					<div className='space-y-2 text-center'>
						<div>{t('Cart.Subtotal')}</div>
						<div className='font-bold'>
							<ProductPrice price={itemsPrice} plain />
						</div>

						{itemsPrice > freeShippingMinPrice && (
							<div className='text-center text-xs'>
								{t('Cart.Your order qualifies for FREE Shipping')}
							</div>
						)}

						<Link
							className={cn(
								buttonVariants({ variant: 'outline' }),
								'w-full rounded-full hover:no-underline',
							)}
							href='/cart'
						>
							{t('Cart.Go to Cart')}
						</Link>

						<Separator className='mt-3' />
					</div>

					<ScrollArea className='w-full flex-1'>
						{items.map((item) => (
							<div key={item.clientId}>
								<div className='my-3'>
									<Link href={`/product/${item.slug}`}>
										<div className='relative h-24'>
											<Image
												src={item.image}
												alt={item.name}
												fill
												sizes='96px'
												className='object-contain'
											/>
										</div>
									</Link>

									<div className='text-center text-sm font-bold'>
										<ProductPrice price={item.price} plain />
									</div>

									<div className='mt-2 flex gap-2'>
										<Select
											value={item.quantity.toString()}
											onValueChange={(value) => {
												updateItem(item, Number(value))
											}}
										>
											<SelectTrigger
												className='ml-1 h-auto w-12 py-0 text-xs'
												aria-label={`${t('Cart.Quantity')}: ${item.quantity}`}
											>
												<SelectValue />
											</SelectTrigger>

											<SelectContent>
												{Array.from({ length: item.countInStock }).map(
													(_, i) => (
														<SelectItem value={(i + 1).toString()} key={i + 1}>
															{i + 1}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>

										<Button
											type='button'
											variant='outline'
											size='sm'
											aria-label={`${t('Cart.Delete')} ${item.name}`}
											onClick={() => {
												removeItem(item)
											}}
										>
											<TrashIcon className='h-4 w-4' aria-hidden='true' />
										</Button>
									</div>
								</div>

								<Separator />
							</div>
						))}
					</ScrollArea>
				</div>
			</div>
		</div>
	)
}
