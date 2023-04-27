async function searchAction(data: FormData) {
  'use server'
  const searchTerm = data.get('searchField') ?? ''

  if (searchTerm?.length > 0) {
    return {
      redirect: {
        destination: `/search/${searchTerm}`,
        permanent: false,
      },
    }
  }
}

export const Search = ({ term }: { term?: string }) => {
  return (
    <form
      // @ts-expect-error async action callback
      action={searchAction}
      className=" grid grid-cols-[1fr,auto] h-[2em] w-[50ch] pl-4 border-2 border-neutral-600 rounded-2xl  focus-within:transform focus-within:scale-110 origin-left transition-all focus-within:border-pink-500 overflow-hidden"
    >
      <input
        type="search"
        name="searchField"
        defaultValue={typeof term === 'string' ? decodeURI(term) : ''}
        autoComplete="off"
        className="bg-transparent text-white outline-none"
      />
      <button type="submit" className="bg-pink-400 text-black text-lg px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </form>
  )
}
