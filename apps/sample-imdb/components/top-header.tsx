import xataflyWhite from '~/public/xatafly-white.svg'
import { SiGithub as Github, SiDiscord as Discord } from 'react-icons/si'
import Image from 'next/image'
import { UserButton, auth } from '@clerk/nextjs/app-beta'
import { User } from './user'

export async function TopHeader() {
  const { sessionId } = auth()

  return (
    <aside className="sticky top-0 flex justify-between group bg-black">
      <div className="pt-8 pl-8">
        {sessionId !== null ? <UserButton /> : 'not logged in'}
      </div>
      <ul className="flex justify-end gap-3 pt-8 pr-8 opacity-40 group-focus-within:opacity-100 group-hover:opacity-100">
        <li>
          <a href="https://xata.io" rel="noopener noreferrer">
            <Image
              src={xataflyWhite}
              alt="Xata logo"
              className="w-6 hover:scale-125 focus:scale-125 transition-transform"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/xataio/examples/tree/main/apps/sample-imdb"
            rel="noopener noreferrer"
          >
            <Github className="text-2xl focus:scale-125 hover:scale-125 transition-transform" />
          </a>
        </li>
        <li>
          <a href="https://xata.io/discord" rel="noopener noreferrer">
            <Discord className="text-2xl focus:scale-125 hover:scale-125 transition-transform" />
          </a>
        </li>
      </ul>
    </aside>
  )
}
