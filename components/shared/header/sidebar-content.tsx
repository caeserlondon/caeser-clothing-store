'use client'

import { Button } from '@/components/ui/button'
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useRouter } from '@/i18n/routing'
import { SignOut } from '@/lib/actions/user.actions'
import { ChevronRight, MenuIcon, UserCircle, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

type SidebarContentProps = {
  categories: string[]
  session: { user: { name?: string | null } } | null
}

export function SidebarContent({
  categories,
  session,
}: Readonly<SidebarContentProps>) {
  const router = useRouter()
  const t = useTranslations('Header')

  const handleNav = (href: string) => {
    router.push(href)
  }

  return (
    <>
      <DrawerTrigger className='header-button flex items-center !p-2'>
        <MenuIcon className='mr-1 h-5 w-5' />
        {t('All')}
      </DrawerTrigger>

      <DrawerContent className='top-0 mt-0 w-[350px]'>
        <div className='flex h-full flex-col'>
          <div className='dark flex items-center justify-between bg-gray-800 text-foreground'>
            <DrawerHeader>
              <DrawerTitle className='flex items-center'>
                <UserCircle className='mr-2 h-6 w-6' />
                {session ? (
                  <button
                    type='button'
                    onClick={() => handleNav('/account')}
                    className='text-left text-lg font-semibold hover:underline'
                  >
                    {t('Hello')}, {session.user.name}
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={() => handleNav('/sign-in')}
                    className='text-left text-lg font-semibold hover:underline'
                  >
                    {t('Hello')}, {t('sign in')}
                  </button>
                )}
              </DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>

            <DrawerClose asChild>
              <Button variant='ghost' size='icon' className='mr-2'>
                <X className='h-5 w-5' />
                <span className='sr-only'>Close</span>
              </Button>
            </DrawerClose>
          </div>

          <div className='flex-1 overflow-y-auto'>
            <div className='border-b p-4'>
              <h2 className='text-lg font-semibold'>{t('Shop By Department')}</h2>
            </div>

            <nav className='flex flex-col'>
              {categories.map((category) => (
                <button
                  key={category}
                  type='button'
                  onClick={() =>
                    handleNav(
                      `/search?category=${encodeURIComponent(category)}`
                    )
                  }
                  className='item-button flex w-full items-center justify-between text-left'
                >
                  <span>{category}</span>
                  <ChevronRight className='h-4 w-4' />
                </button>
              ))}
            </nav>
          </div>

          <div className='flex flex-col border-t'>
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>{t('Help & Settings')}</h2>
            </div>

            <button
              type='button'
              onClick={() => handleNav('/account')}
              className='item-button text-left'
            >
              {t('Your account')}
            </button>

            <button
              type='button'
              onClick={() => handleNav('/page/customer-service')}
              className='item-button text-left'
            >
              {t('Customer Service')}
            </button>

            {session ? (
              <form action={SignOut} className='w-full'>
                <Button
                  className='item-button w-full justify-start text-base'
                  variant='ghost'
                >
                  {t('Sign out')}
                </Button>
              </form>
            ) : (
              <button
                type='button'
                onClick={() => handleNav('/sign-in')}
                className='item-button text-left'
              >
                {t('Sign in')}
              </button>
            )}
          </div>
        </div>
      </DrawerContent>
    </>
  )
}