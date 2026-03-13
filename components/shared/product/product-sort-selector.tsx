'use client'

import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { getFilterUrl } from '@/lib/utils'

export default function ProductSortSelector({
	sortOrders,
	sort,
	params,
}: {
	sortOrders: { value: string; name: string }[]
	sort: string
	params: {
		q?: string
		category?: string
		tag?: string
		price?: string
		rating?: string
		sort?: string
		page?: string
	}
}) {
	const router = useRouter()
	const t = useTranslations('Product')

	const currentSort =
		sortOrders.find((s) => s.value === sort)?.name ?? sortOrders[0]?.name ?? ''

	return (
		<Select
			value={sort}
			onValueChange={(value) => {
				router.push(getFilterUrl({ params, sort: value }))
			}}
		>
			<SelectTrigger
				aria-label={`${t('Sort by')}: ${currentSort}`}
				className='w-full'
			>
				<SelectValue>
					{t('Sort by')}: {currentSort}
				</SelectValue>
			</SelectTrigger>

			<SelectContent>
				{sortOrders.map((s) => (
					<SelectItem key={s.value} value={s.value}>
						{s.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
