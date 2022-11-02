import { type FC, type ReactNode } from 'react'
import { Xmdb } from './logo'

export const HeaderNav: FC<{ children: ReactNode }> = ({ children }) => (
  <header className="grid grid-cols-[auto,1fr] gap-2 mx-auto max-w-prose pt-24 pb-12">
    <h1 className="self-center">
      <Xmdb />
    </h1>
    {children}
  </header>
)
