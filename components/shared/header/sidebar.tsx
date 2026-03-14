import { auth } from '@/auth'
import { Drawer } from '@/components/ui/drawer'
import { getDirection } from '@/i18n-config'
import { getLocale } from 'next-intl/server'
import { SidebarContent } from './sidebar-content'

export default async function Sidebar({
  categories,
}: Readonly<{
  categories: string[]
}>) {
  const session = await auth()
  const locale = await getLocale()
  const direction = getDirection(locale) === 'rtl' ? 'right' : 'left'

  return (
    <Drawer direction={direction} modal={false}>
      <SidebarContent categories={categories} session={session} />
    </Drawer>
  )
}