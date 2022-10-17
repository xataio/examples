<h1> Remix + Xata + Netlify <img alt="Xatafly, the logo from Xata" src="/public/flap.gif" width="50" /></h1>

[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)

## Features ⚡️

- Deployed to Netlify Edge
- Type-safe Codegen
- Accessibility-Ready
  - Dark/Light mode
  - Respects `prefers-reduce-motion` for CSS Transitions

> ⚠️ Find `@TODO` comments to check places you need to adjust your code.

## Setup & Usage 🐣

### Clone the Example

Execute [`create-remix-app`](https://github.com/vercel/next.js/tree/canary/packages/create-remix-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```sh
npx create-remix-app --template https://github.com/xataio/examples/tree/main/apps/remix-netlify remix-xata-app

```

<details>
<summary> Yarn or PNPM</summary>

```sh
yarn create remix-app --template https://github.com/xataio/examples/tree/main/apps/remix-netlify remix-xata-app
```

```sh
pnpm create remix-app --template https://github.com/xataio/examples/tree/main/apps/remix-netlify remix-xata-app
```

</details>

### Link Your Xata Workspace and Run Codegen

```sh
npm run start:xata
```

<details>
<summary> Yarn or PNPM</summary>

```sh
yarn start:xata
```

```sh
pnpm run start:xata
```

</details>

> ⚠️ once linked, you can just run `xata` to re-generate types.

### Start Coding 🚀

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

> 💡 the template will prompt you to create a dummy new table (`remix_with_xata_example`) with some useful resources.

## Hot Tip 🔥

- The Xata [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=xata.xata) will make managing your data more comfortable
