import type { LoaderFunction } from '@remix-run/node'
import { getXataClient } from '~/lib/xata.codegen.server'

const LINKS = [
  {
    description: 'Everything you need to know about Xata APIs and tools.',
    title: 'Xata Docs',
    url: 'https://docs.xata.io',
  },
  {
    description: 'In case you need to check some Remix specifics.',
    title: 'Remix Docs',
    url: 'https://remix.run/docs',
  },
  {
    description:
      'Maintain your flow by managing your Xata Workspace without ever leaving VS Code.',
    title: 'Xata VS Code Extension',
    url: 'https://marketplace.visualstudio.com/items?itemName=xata.xata',
  },
  {
    description: 'Get help. Offer help. Show us what you built!',
    title: 'Xata Discord',
    url: 'https://xata.io/discord',
  },
]

const xata = getXataClient()

export const loader: LoaderFunction = async () => {
  await xata.db.remix_with_xata_example.create(LINKS)

  return {
    ok: true,
  }
}
