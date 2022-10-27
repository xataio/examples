import { Xmdb } from './logo'
import { Search } from './search'

export const HeaderNav = () => {
  return (
    <header className="grid grid-cols-[auto,1fr,auto] gap-2 p-2 bg-neutral-900">
      <h1 className="self-center">
        <Xmdb />
      </h1>
      <Search />
      <div className="border-l-2 border-slate-800 ml-2 pl-2 self-center">
        <button>Sign In</button>
      </div>
    </header>
  )
}
