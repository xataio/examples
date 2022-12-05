# Create SvelteKit

Everything you need to build a SvelteKit project with Xata, powered by [`svelteKit`](https://kit.svelte.dev/).

## Creating a project

```bash
# create a new project in my-awesome-app
npx degit xataio/examples/apps/starter-sveltekit my-awesome-app
```

## Initialize your database

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), you need to initialize your database:

```bash
npm run xata:init
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

You will need to add the value to the `VITE_XATA_API_KEY` manually.

See in our [how to generate an API key](https://xata.io/docs/concepts/api-keys#generating-api-keys) in our documentation.
