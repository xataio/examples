import { AskOptions, BaseClient } from '@xata.io/client'

type Database = {
  id: string
  name: string
  client: BaseClient
  lookupTable: string
  options: AskOptions<any>
}

export const getDatabases = (): Database[] => {
  const docs = new BaseClient({
    databaseURL: 'https://sample-databases-v0sn1n.us-east-1.xata.sh/db/docs',
    branch: 'main',
  })

  const hp = new BaseClient({
    databaseURL:
      'https://sample-databases-v0sn1n.us-east-1.xata.sh/db/harry-potter',
    branch: 'main',
  })

  const pokemon = new BaseClient({
    databaseURL: 'https://sample-databases-v0sn1n.us-east-1.xata.sh/db/pokemon',
    branch: 'main',
  })

  const f1 = new BaseClient({
    databaseURL: 'https://sample-databases-v0sn1n.eu-west-1.xata.sh/db/f1',
    branch: 'main',
  })

  return [
    {
      id: 'docs',
      client: docs,
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
      id: 'hp',
      client: hp,
      name: 'Harry Potter',
      lookupTable: 'overview',
      options: {
        searchType: 'keyword',
        search: {
          fuzziness: 1,
          prefix: 'phrase',
        },
        rules: [
          'If the user asks for a character that does not exist, respond with "I don\'t know that character."',
          'If the user asks for a spell that does not exist, respond with "I don\'t know that spell."',
          'If the user asks for a potion that does not exist, respond with "I don\'t know that potion."',
          'Only answer questions that are relating to the know plot of the movie.',
        ],
      },
    },
    {
      id: 'pokemon',
      client: pokemon,
      name: 'Pokemon',
      lookupTable: 'overview',
      options: {
        searchType: 'keyword',
        search: {
          fuzziness: 1,
          prefix: 'phrase',
        },
        rules: [
          'If the user asks for a pokemon that does not exist, respond with "I don\'t know that pokemon."',
          'If the user asks for a fight between two pokemon, make sure to respond with the winner and the reason why.',
          'If the user asks for a fight between two pokemon that do not exist, respond with "I don\'t know those pokemon."',
          'If the user asks for a fight between two pokemon that are the same, respond with "They are the same pokemon."',
          'If you are asked a question that is not about pokemon, respond with "That is not a question I can answer."',
        ],
      },
    },
    {
      id: 'f1',
      client: f1,
      name: 'Formula 1',
      lookupTable: 'overview',
      options: {
        searchType: 'keyword',
        search: {
          fuzziness: 1,
          prefix: 'phrase',
        },
        rules: [
          'If the user asks for a driver that does not exist, respond with "I don\'t know that driver."',
          'If the user asks for data of a race be precise and respond with the correct data.',
          "Don't answer questions about the future.",
          'If you are asked a question that is not about F1, respond with "That is not a question I can answer."',
        ],
      },
    },
  ]
}
