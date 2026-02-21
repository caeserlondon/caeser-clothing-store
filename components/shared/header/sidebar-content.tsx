'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { ChevronRight, MenuIcon, UserCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignOut } from '@/lib/actions/user.actions'
import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from '@/components/ui/drawer'

type SidebarContentProps = {
  categories: string[]
  session: { user: { name?: string | null } } | null
  direction: 'left' | 'right'
}

export function SidebarContent({
  categories,
  session,
  direction,
}: Readonly<SidebarContentProps>) {
  const router = useRouter()
  const t = useTranslations('Header')

  const handleNav = (href: string) => {
    router.push(href)
  }

  return (
    <>
      <DrawerTrigger className='header-button flex items-center !p-2  '>
        <MenuIcon className='h-5 w-5 mr-1' />
        {t('All')}
      </DrawerTrigger>
      <DrawerContent className='w-[350px] mt-0 top-0'>
        <div className='flex flex-col h-full'>
          <div className='dark bg-gray-800 text-foreground flex items-center justify-between'>
            <DrawerHeader>
              <DrawerTitle className='flex items-center'>
                <UserCircle className='h-6 w-6 mr-2' />
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
            <div className='p-4 border-b'>
              <h2 className='text-lg font-semibold'>
                {t('Shop By Department')}
              </h2>
            </div>
            <nav className='flex flex-col'>
              {categories.map((category) => (
                <button
                  key={category}
                  type='button'
                  onClick={() => handleNav(`/search?category=${encodeURIComponent(category)}`)}
                  className='flex items-center justify-between item-button w-full text-left'
                >
                  <span>{category}</span>
                  <ChevronRight className='h-4 w-4' />
                </button>
              ))}
            </nav>
          </div>

          <div className='border-t flex flex-col'>
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>
                {t('Help & Settings')}
              </h2>
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
                  className='w-full justify-start item-button text-base'
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
