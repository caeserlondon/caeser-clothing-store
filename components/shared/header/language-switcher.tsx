'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { usePathname, useRouter as useI18nRouter, getPathname } from '@/i18n/routing'
import useSettingStore from '@/hooks/use-setting-store'
import { useToast } from '@/hooks/use-toast'
import { i18n } from '@/i18n-config'
import { setCurrencyOnServer } from '@/lib/actions/setting.actions'
import { ChevronDownIcon, Loader2 } from 'lucide-react'

export default function LanguageSwitcher() {
  const { locales } = i18n
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const i18nRouter = useI18nRouter()
  const { toast } = useToast()
  const [changingLocale, setChangingLocale] = React.useState<string | null>(null)

  const prefetchLocales = React.useCallback(() => {
    locales.forEach(({ code }) => {
      if (code !== locale) {
        const href = getPathname({ locale: code, href: pathname })
        router.prefetch(href)
      }
    })
  }, [locales, locale, pathname, router])

  const handleLocaleChange = React.useCallback(
    (code: string) => {
      if (code === locale) return
      setChangingLocale(code)
      toast({
        description: (
          <span className='flex items-center gap-2'>
            <Loader2 className='h-4 w-4 animate-spin' />
            Changing language...
          </span>
        ),
        duration: 4000,
      })
      i18nRouter.push(pathname, { locale: code })
    },
    [locale, pathname, i18nRouter, toast]
  )

  const {
    setting: { availableCurrencies, currency },
    setCurrency,
  } = useSettingStore()
  const handleCurrencyChange = async (newCurrency: string) => {
    await setCurrencyOnServer(newCurrency)
    setCurrency(newCurrency)
  }
  return (
    <DropdownMenu onOpenChange={(open) => open && prefetchLocales()}>
      <DropdownMenuTrigger className='header-button h-[41px]'>
        <div className='flex items-center gap-1'>
          <span className='text-xl'>
            {locales.find((l) => l.code === locale)?.icon}
          </span>
          {locale.toUpperCase().slice(0, 2)}
          <ChevronDownIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale}>
          {locales.map((c) => (
            <DropdownMenuRadioItem
              key={c.name}
              value={c.code}
              onSelect={() => handleLocaleChange(c.code)}
            >
              <span className='flex items-center gap-1'>
                {changingLocale === c.code ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <span className='text-lg'>{c.icon}</span>
                )}{' '}
                {c.name}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={currency}
          onValueChange={handleCurrencyChange}
        >
          {availableCurrencies.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.code}>
              {c.symbol} {c.code}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
