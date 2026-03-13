'use client'

import { ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { useRouter as useNextRouter } from 'next/navigation'
import { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import useSettingStore from '@/hooks/use-setting-store'
import { useToast } from '@/hooks/use-toast'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

import { i18n } from '@/i18n-config'
import { getPathname, Link, usePathname, useRouter } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'

export default function Footer() {
	const router = useRouter()
	const nextRouter = useNextRouter()
	const pathname = usePathname()
	const locale = useLocale()
	const { toast } = useToast()

	const prefetchLocales = useCallback(() => {
		i18n.locales.forEach(({ code }) => {
			if (code !== locale) {
				nextRouter.prefetch(getPathname({ locale: code, href: pathname }))
			}
		})
	}, [locale, pathname, nextRouter])

	const {
		setting: { site, availableCurrencies, currency },
		setCurrency,
	} = useSettingStore()

	const { locales } = i18n
	const t = useTranslations()

	return (
		<footer className='bg-black text-white underline-link'>
			<div className='w-full'>
				<Button
					type='button'
					variant='ghost'
					className='w-full rounded-none bg-gray-800'
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				>
					<ChevronUp className='mr-2 h-4 w-4' aria-hidden='true' />
					{t('Footer.Back to top')}
				</Button>

				<div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 md:grid-cols-3'>
					<div>
						<h3 className='mb-2 font-bold'>{t('Footer.Get to Know Us')}</h3>
						<ul className='space-y-2'>
							<li>
								<Link href='/page/careers'>{t('Footer.Careers')}</Link>
							</li>
							<li>
								<Link href='/page/blog'>{t('Footer.Blog')}</Link>
							</li>
							<li>
								<Link href='/page/about-us'>
									{t('Footer.About name', { name: site.name })}
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='mb-2 font-bold'>{t('Footer.Make Money with Us')}</h3>
						<ul className='space-y-2'>
							<li>
								<Link href='/page/sell'>
									{t('Footer.Sell products on', { name: site.name })}
								</Link>
							</li>
							<li>
								<Link href='/page/become-affiliate'>
									{t('Footer.Become an Affiliate')}
								</Link>
							</li>
							<li>
								<Link href='/page/advertise'>
									{t('Footer.Advertise Your Products')}
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='mb-2 font-bold'>{t('Footer.Let Us Help You')}</h3>
						<ul className='space-y-2'>
							<li>
								<Link href='/page/shipping'>
									{t('Footer.Shipping Rates & Policies')}
								</Link>
							</li>
							<li>
								<Link href='/page/returns-policy'>
									{t('Footer.Returns & Replacements')}
								</Link>
							</li>
							<li>
								<Link href='/page/help'>{t('Footer.Help')}</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className='border-t border-gray-800'>
					<div className='mx-auto flex max-w-7xl flex-col items-center space-y-4 px-4 py-8'>
						<div className='flex flex-wrap items-center space-x-4 md:flex-nowrap'>
							<div className='relative h-14 w-14 shrink-0'>
								<Image
									src='/icons/logo.png'
									alt={`${site.name} logo`}
									fill
									className='object-contain'
									sizes='56px'
								/>
							</div>

							<Select
								value={locale}
								onOpenChange={(open) => open && prefetchLocales()}
								onValueChange={(value) => {
									if (value === locale) return

									toast({
										description: (
											<span className='flex items-center gap-2'>
												<span
													className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent'
													aria-hidden='true'
												/>
												Changing language...
											</span>
										),
										duration: 4000,
									})

									router.push(pathname, { locale: value })
								}}
							>
								<SelectTrigger aria-label={t('Footer.Select a language')}>
									<SelectValue placeholder={t('Footer.Select a language')} />
								</SelectTrigger>

								<SelectContent>
									{locales.map((lang, index) => (
										<SelectItem key={index} value={lang.code}>
											<span className='flex items-center gap-1'>
												<span className='text-lg' aria-hidden='true'>
													{lang.icon}
												</span>
												{lang.name}
											</span>
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select
								value={currency}
								onValueChange={(value) => {
									setCurrency(value)
									window.scrollTo(0, 0)
								}}
							>
								<SelectTrigger aria-label={t('Footer.Select a currency')}>
									<SelectValue placeholder={t('Footer.Select a currency')} />
								</SelectTrigger>

								<SelectContent>
									{availableCurrencies
										.filter((x) => x.code)
										.map((currencyItem, index) => (
											<SelectItem key={index} value={currencyItem.code}>
												{currencyItem.name} ({currencyItem.code})
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</div>

			<div className='p-4'>
				<div className='flex justify-center gap-3 text-sm'>
					<Link href='/page/conditions-of-use'>
						{t('Footer.Conditions of Use')}
					</Link>
					<Link href='/page/privacy-policy'>{t('Footer.Privacy Notice')}</Link>
					<Link href='/page/help'>{t('Footer.Help')}</Link>
				</div>

				<div className='flex justify-center text-sm'>
					<p>© {site.copyright}</p>
				</div>

				<div className='mb-10 mt-8 flex justify-center text-sm text-gray-400'>
					{site.address} | {site.phone}
				</div>
			</div>
		</footer>
	)
}
