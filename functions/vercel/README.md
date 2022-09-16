<h1> Vercel Serverless Functions + Xata <img alt="Xatafly, the logo from Xata" src="/public/flap.gif" width="50" /></h1>

[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)

## Features ⚡️

- Rewrite from `/api` to `/` at `vercel.json`
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions) & [Edge Functions](https://vercel.com/features/edge-functions)
- Dynamic Routes for each table name

## Setup & Usage 🐣

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

> ⚠️ once linked, you can just run `xata:codegen` to re-generate types.

### Run it locally 🚀

To run it locally it will be needed to replicate Vercel's runtime, the easiest way to achieve that is through the [Vercel CLI](https://vercel.com/docs/cli).
The `dev` command in your `package.json` will attempt to run Vercel's CLI development environment.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

> 💡 to manage Node.js versions and global toolchain, a Node Version Manager like [volta.sh](https://volta.sh) is recommended.

## Hot Tip 🔥

- The Xata [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=xata.xata) will make managing your data more comfortable
