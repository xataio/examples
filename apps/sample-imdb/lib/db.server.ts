import { getXataClient, TitlesRecord } from '~/lib/xata.codegen.server'
import { gte, le } from '@xata.io/client'

type OMDBdata = {
  Poster: string
  Plot: string
}

const xata = getXataClient()

export const getMovie = async (id: TitlesRecord['id']) => {
  const title = await xata.db.titles.read(id)

  return title
}

export const getFunFacts = async () => {
  const { aggs } = await xata.db.titles.aggregate({
    totalCount: {
      count: '*',
    },
    sumVotes: {
      sum: {
        column: 'numVotes',
      },
    },
    ratingsAbove6: {
      count: {
        filter: {
          averageRating: { $gt: 6 },
        },
      },
    },
    rate6: {
      count: {
        filter: {
          averageRating: 6,
        },
      },
    },
    ratingsBelow6: {
      count: {
        filter: {
          averageRating: { $lt: 6 },
        },
      },
    },
  })

  return {
    totalTitles: aggs.totalCount.toLocaleString('en-US'),
    totalVotes: (aggs.sumVotes ?? 0).toLocaleString('en-US'),
    high: aggs.ratingsAbove6.toLocaleString('en-US'),
    low: aggs.ratingsBelow6.toLocaleString('en-US'),
    mid: aggs.rate6.toLocaleString('en-US'),
  }
}
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

export const fetchDefaultTitles = async () => {
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
          coverUrl: omdbData.Poster !== 'N/A' ? omdbData.Poster : undefined,
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

  // const records = await Promise.all(
  //   results.map(async (record) => {
  //     if (!record.coverUrl || !record.summary) {
  //       const omdbResponse = await fetch(
  //         `http://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${record.id}`
  //       )

  //       if (!omdbResponse.ok) {
  //         console.log('blow up')
  //         return record
  //       }

  //       const omdbData: OMDBdata = omdbResponse.ok
  //         ? await omdbResponse.json()
  //         : {}

  //       xata.db.titles.createOrUpdate({
  //         id: record.id,
  //         coverUrl: omdbData.Poster,
  //         summary: omdbData.Plot,
  //       })

  //       return {
  //         ...record,
  //         coverUrl: omdbData.Poster,
  //         summary: omdbData.Plot,
  //       }
  //     }

  //     return record
  //   })
  // )

  return {
    titles: results.filter(({ summary }) => summary !== 'N/A'),
  }
}

export const getMovies = async (term: string) => {
  return term.length > 0 ? await searchMovies(term) : await fetchDefaultTitles()
}
