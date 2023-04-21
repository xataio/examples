'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const isActiveLink = (u: string, pathname: string) => u === pathname

const NavLink = ({
  href,
  pathname,
  text,
}: Record<'href' | 'pathname' | 'text', string>) => {
  return (
    <Link
      href={href}
      className={`${
        isActiveLink(href, pathname) ? 'top-nav-active-link' : ''
      } relative mt-6 py-2 px-4 rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors`}
    >
      {text}
    </Link>
  )
}

export default function TopNav({ userId }: { userId: string | null }) {
  const pathname = usePathname()

  return (
    <ul className="flex justify-center gap-3 pt-8 pr-8">
      <li>
        <NavLink href="/" pathname={pathname} text="Search" />
      </li>
      <li>
        <NavLink href={`/in/${userId}`} pathname={pathname} text="Likes" />
      </li>
    </ul>
  )
}
