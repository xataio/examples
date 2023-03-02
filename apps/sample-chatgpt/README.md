# Xata ChatGPT Sample App

This is a sample app that uses [Xata ChatGPT](https://xata.io/chatgpt) functionality.

> ⚠️ "Xata ChatGPT" is experimental and subject to changes until it reaches general availability.

## Getting Started

### Shallow Clone

You can copy locally only this project from the monorepo with the following command:

```sh
npx degit xataio/examples/apps/sample-chatgpt my-xata-chatgpt-app
```

### Install Project Dependencies

```bash
npm install
```

## Customize Used Databases

This project supports multiple databases to ask questions and get answers one at a time. Once you add to your `.env.local` a `XATA_API_KEY` and a `XATA_BRANCH` you can edit your `src/xata.ts` file to connect to each one of them.

<details>
<summary>Setup Environment Variables</summary>

Check the docs on how to [generate your API Key](https://xata.io/docs/getting-started/api-keys).

```
XATA_API_KEY=< your api key>
XATA_BRANCH=main
```

</details>


```ts
export const getDatabases = (): Database[] => {
  const blog = new BaseClient({
    databaseURL: 'https://awesome-f9u3t5.us-east-1.xata.sh/db/blog',
  })

  return [
    {
      id: 'blog',
      client: blog,
      name: 'My awesome blog',
      lookupTable: 'posts',
      options: {
        rules: [
          'Only answer questions about the blog',
          "Don't answer questions about other topics",
        ],
        searchType: 'keyword',
        search: {
          fuzziness: 1,
          prefix: 'phrase',
          target: [
            { column: 'title', weight: 4 },
            { column: 'keywords', weight: 2 },
            'content',
            'slug',
          ],
        },
      },
    },
  ]
}
```

**Start the app and run the Xata Worker concurrently**

```bash
npm run dev
```
By default the app runs on [localhost:3000](http://localhost:3000)
---

> 🐛 If you encounter any issues while using Xata, please open a [support ticket](https://support.xata.io/hc/en-usrequests/new).
