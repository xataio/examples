import { getXataClient } from '~/lib/xata.codegen.server'
import { gte, le } from '@xata.io/client'

type OMDBdata = {
  Poster: string
  Plot: string
}

const xata = getXataClient()

export const getTotalTitles = async () => {
  const { aggs } = await xata.db.titles.aggregate({
    totalCount: {
      count: '*',
    },
  })

  return {
    totalTitles: aggs.totalCount.toLocaleString('en-US'),
  }
}

const fetchTitles = async () => {
  const { records: titleRecords } = await xata.db.titles
    .filter({
      $exists: 'startYear',
      titleType: 'movie',
      isAdult: false,
    })
    .filter({
      startYear: le(new Date().getFullYear()),
      numVotes: gte(200000), // only movies with a bunch of votes
    })
    .sort('startYear', 'desc')
    .getPaginated({
      pagination: {
        size: 20,
      },
    })

  const titles = await Promise.all(
    titleRecords.map(async (title) => {
      if (!title.coverUrl || !title.summary) {
        const omdbResponse = await fetch(
          `http://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${title.id}`
        )
        const omdbData: OMDBdata = await omdbResponse.json()

        xata.db.titles.createOrUpdate({
          id: title.id,
          coverUrl: omdbData.Poster,
          summary: omdbData.Plot,
        })

        return {
          ...title,
          coverUrl: omdbData.Poster,
          summary: omdbData.Plot,
        }
      }

      return title
    })
  )

  return {
    titles: titles.filter(({ summary }) => summary !== 'N/A'),
  }
}

export const searchMovies = async (term: string) => {
  // const result = await xata.db.titles.search(term, {
  //   fuzziness: 1,
  // })

  // console.log(result)

  const results = await xata.db.titles.search(term, {
    fuzziness: 2,
    filter: {
      titleType: 'movie',
    },
    boosters: [
      {
        valueBooster: { column: 'primaryTitle', factor: 1, value: term },
      },

      {
        numericBooster: { column: 'averageRating', factor: 2 },
      },
    ],
  })

  const records = await Promise.all(
    results.map(async (record) => {
      if (!record.coverUrl || !record.summary) {
        const omdbResponse = await fetch(
          `http://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${record.id}`
        )
        const omdbData: OMDBdata = await omdbResponse.json()

        xata.db.titles.createOrUpdate({
          id: record.id,
          coverUrl: omdbData.Poster,
          summary: omdbData.Plot,
        })

        return {
          ...record,
          coverUrl: omdbData.Poster,
          summary: omdbData.Plot,
        }
      }

      return record
    })
  )

  console.log(records, 'records')

  return {
    titles: records.filter(({ summary }) => summary !== 'N/A'),
  }
}

export const getMovies = (term?: string) => {
  return term ? searchMovies(term) : fetchTitles()
}
