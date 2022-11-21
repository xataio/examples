# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Creating a project

```bash
# create a new project in my-awesome-app
npx degit xataio/examples/apps/starter-solidstart my-awesome-app
```

## Initialize your database

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), you need to initialize your database:

```bash
npm run xata:init
```

## Developing

You can now start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.
