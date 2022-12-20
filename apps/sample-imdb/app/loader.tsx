export default function Loader() {
  return (
    <aside className="pt-40">
      <div className="border-neutral-800 p-10 border-2 max-w-prose mx-auto rounded-lg animate-pulse grid grid-cols-[auto,1fr] place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-24 h-24 text-pink-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <ul className="text-3xl text-neutral-500">
          <li>Fetching records.</li>
          <li>Sorting records.</li>
          <li>Rendering records.</li>
        </ul>
      </div>
    </aside>
  )
}
