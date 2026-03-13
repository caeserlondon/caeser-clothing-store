'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import useIsMounted from '@/hooks/use-is-mounted'
import { useTranslations } from 'next-intl'

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme()
	const t = useTranslations('Header')
	const isMounted = useIsMounted()

	const changeTheme = (value: string) => {
		setTheme(value)
	}

	const currentLabel = theme === 'dark' && isMounted ? t('Dark') : t('Light')

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className='header-button h-[41px]'
				aria-label={`${t('Theme')}: ${currentLabel}`}
			>
				{theme === 'dark' && isMounted ? (
					<div className='flex items-center gap-1'>
						<Moon className='h-4 w-4' aria-hidden='true' />
						{t('Dark')}
						<ChevronDownIcon aria-hidden='true' />
					</div>
				) : (
					<div className='flex items-center gap-1'>
						<Sun className='h-4 w-4' aria-hidden='true' />
						{t('Light')}
						<ChevronDownIcon aria-hidden='true' />
					</div>
				)}
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{t('Theme')}</DropdownMenuLabel>

				<DropdownMenuRadioGroup value={theme} onValueChange={changeTheme}>
					<DropdownMenuRadioItem value='dark'>
						<Moon className='mr-1 h-4 w-4' aria-hidden='true' />
						{t('Dark')}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='light'>
						<Sun className='mr-1 h-4 w-4' aria-hidden='true' />
						{t('Light')}
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
