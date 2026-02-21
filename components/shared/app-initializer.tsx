import React, { useLayoutEffect } from 'react'
import useSettingStore from '@/hooks/use-setting-store'
import { ClientSetting } from '@/types'

export default function AppInitializer({
  setting,
  children,
}: {
  setting: ClientSetting
  children: React.ReactNode
}) {
  useLayoutEffect(() => {
    useSettingStore.setState({ setting })
  }, [setting])

  return children
}
