import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { getAllCategories } from '@/lib/actions/product.actions'

import { getSetting } from '@/lib/actions/setting.actions'
import { getTranslations } from 'next-intl/server'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select'

export default async function Search() {
	const {
		site: { name },
	} = await getSetting()
	const categories = await getAllCategories()

	const t = await getTranslations()

	return (
		<form action='/search' method='GET' className='flex h-10 items-stretch'>
			<Select name='category'>
				<SelectTrigger
					aria-label={t('Header.All')}
					className='w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none'
				>
					<SelectValue placeholder={t('Header.All')} />
				</SelectTrigger>

				<SelectContent position='popper'>
					<SelectItem value='all'>{t('Header.All')}</SelectItem>
					{categories.map((category) => (
						<SelectItem key={category} value={category}>
							{category}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Input
				className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full'
				placeholder={t('Header.Search Site', { name })}
				aria-label={t('Header.Search Site', { name })}
				name='q'
				type='search'
			/>

			<button
				type='submit'
				aria-label={t('Header.Search Site', { name })}
				className='bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-3 py-2'
			>
				<SearchIcon className='h-6 w-6' aria-hidden='true' />
			</button>
		</form>
	)
}
