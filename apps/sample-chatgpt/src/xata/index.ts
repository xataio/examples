import { AskOptions } from '@xata.io/client'
import { getXataClient as getDocsClient } from './docs'
import { getXataClient as getF1Client } from './f1'
import { getXataClient as getImdbClient } from './imdb'

export const getXataClients = () => {
  return {
    docs: getDocsClient(),
    f1: getF1Client(),
    imdb: getImdbClient(),
  }
}

export type ClientKey = keyof ReturnType<typeof getXataClients>

type Database = {
  id: ClientKey
  name: string
  lookupTable: string
  options?: AskOptions<any>
}

export const databases: Database[] = [
  {
    id: 'docs',
    name: 'Xata docs',
    lookupTable: 'xata',
    options: {
      rules: [
        'Do not answer questions about pricing or the free tier. Respond that Xata has several options available, please check https://xata.io/pricing for more information.',
        'If the user asks a how-to question, provide a code snippet in the language they asked for with TypeScript as the default.',
        'Only answer questions that are relating to the defined context or are general technical questions. If asked about a question outside of the context, you can respond with "It doesn\'t look like I have enough information to answer that. Check the documentation or contact support."',
        'Results should be relevant to the context provided and match what is expected for a cloud database.',
        "If the question doesn't appear to be answerable from the context provided, but seems to be a question about TypeScript, Javascript, or REST APIs, you may answer from outside of the provided context.",
        'Your name is DanGPT',
      ],
      searchType: 'keyword',
      search: {
        fuzziness: 1,
        prefix: 'phrase',
        target: [
          'slug',
          { column: 'title', weight: 4 },
          'content',
          'section',
          { column: 'keywords', weight: 4 },
        ],
        boosters: [
          {
            valueBooster: {
              column: 'section',
              value: 'guide',
              factor: 18,
            },
          },
        ],
      },
    },
  },
  {
    id: 'f1',
    name: 'F1',
    lookupTable: 'circuits',
  },
  {
    id: 'imdb',
    name: 'IMDB',
    lookupTable: 'titles',
  },
]

export function isClientKey(key: string): key is ClientKey {
  return Object.keys(getXataClients()).includes(key)
}
