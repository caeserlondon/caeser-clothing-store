import { getAllCategories } from '@/lib/actions/product.actions'
import { getSetting } from '@/lib/actions/setting.actions'
import { headerMenus } from '@/lib/fallback-data'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import Search from './search'
import Sidebar from './sidebar'

export default async function Header() {
	const categories = await getAllCategories()
	const { site } = await getSetting()
	const t = await getTranslations()
	return (
		<header className='bg-black  text-white'>
			<div className='px-2'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<Link
							href='/'
							className='flex items-center header-button text-2xl font-bold text-primary'
						>
							<Image
								src='/icons/logo.png'
								width={48}
								height={48}
								alt={`${site.name} logo`}
								className='my-1 mx-3'
							/>
							<span className='font-libre-baskerville italic'>
								{site.name}
							</span>
						</Link>
					</div>

					<div className='hidden md:block flex-1 max-w-xl'>
						<Search />
					</div>
					<Menu />
				</div>
				<div className='md:hidden block py-2'>
					<Search />
				</div>
			</div>
			<div className='flex items-center px-3 mb-[1px]  bg-gray-800'>
				<Sidebar categories={categories} />
				<div className='flex items-center flex-wrap gap-3 overflow-hidden   max-h-[42px]'>
					{headerMenus.map((menu) => (
						<Link
							href={menu.href}
							key={menu.href}
							className='header-button !p-2 '
						>
							{t('Header.' + menu.name)}
						</Link>
					))}
				</div>
			</div>
		</header>
	)
}
