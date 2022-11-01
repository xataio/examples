'use client'

import { type FC, type ReactNode } from 'react'
import { SearchProvider } from './search-provider'

export const SearchWrapper: FC<{
  children: ReactNode
}> = ({ children }) => {
  return <SearchProvider>{children}</SearchProvider>
}
