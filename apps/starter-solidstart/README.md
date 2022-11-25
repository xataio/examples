# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Creating a project

```bash
# create a new project in my-awesome-app
npx degit xataio/examples/apps/starter-solidstart my-awesome-app
```

## Deploy Your Own

You will need to add the value to the `VITE_XATA_API_KEY` manually.

See in our [how to generate an API key](https://xata.io/docs/concepts/api-keys#generating-api-keys) in our documentation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fxataio%2Fexamples%2Ftree%2Fmain%2Fapps%2Fstarter-solidstart&env=VITE_XATA_API_KEY&build-command=npm%20run%20deploy-your-own&envDescription=The%20API%20access%20token%20to%20your%20Xata%20Workspace&envLink=https%3A%2F%2Fapp.xata.io%2Fsettings&project-name=my-solid-xata-app&repository-name=my-solid-xata-app)

> ⚠️ once your app is deployed for the first time, otherwise `xata:init` will fail. You should then revert the Build command to the default.

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
