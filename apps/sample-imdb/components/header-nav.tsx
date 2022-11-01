import { type FC, type ReactNode } from 'react'
import { Xmdb } from './logo'

export const HeaderNav: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <header className="grid grid-cols-[auto,1fr] pt-10 gap-2 mx-auto max-w-prose">
      <h1 className="self-center">
        <Xmdb />
      </h1>
      {children}
      {/* <div className="border-l-2 border-slate-800 ml-2 pl-2 self-center">
        <button>Sign In</button>
      </div> */}
    </header>
  )
}
