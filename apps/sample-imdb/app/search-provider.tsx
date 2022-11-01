'use client'

import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'
import { TitleEpisodesRecord } from '~/lib/xata.codegen.server'

type SearchResults = Array<undefined | TitleEpisodesRecord>

type SearchResultsContext =
  | {
      results: SearchResults
      setResults: (results: SearchResults) => void
    }
  | undefined

type SearchContext =
  | {
      term?: string
      setTerm: (term: string) => void
    }
  | undefined

const SearchContext = createContext<SearchContext>(undefined)
const SearchResultsContext = createContext<SearchResultsContext>(undefined)

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [term, setTerm] = useState<string | undefined>()

  return (
    <SearchContext.Provider
      value={{
        term,
        setTerm,
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
