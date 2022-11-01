'use client'

import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'

const SearchContext = createContext<
  | {
      term?: string
    }
  | undefined
>(undefined)

// const SearchResultsContext = createContext<Array<undefined>>([])

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [term, setTerm] = useState<string | undefined>()
  return (
    <SearchContext.Provider
      value={{
        term: term,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const searchContext = useContext(SearchContext)

  if (!searchContext) {
    throw new Error('useSearch must be used inside a `SearchProvider`')
  }

  return searchContext
}
// export const useSearchResults = () => {
//   const searchContext = useContext(SearchResultsContext)

//   if (!searchContext) {
//     throw new Error('useSearchResults must be used inside a `SearchProvider`')
//   }

//   return searchContext
// }
