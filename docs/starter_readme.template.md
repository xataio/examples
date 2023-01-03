<!--
- Default example commands to `npm` because it's the stock solution to Node.js.
-
-
- Include a degit code command snippet for low-depth cloning: `npx degit <url>`.
-->

# App Title

<!--
🚀 Starters are named after the stack they power up.
🧙‍♂️ Samples are named after the features they showcase.
-->

## Features ⚡️

<!--🧙‍♂️ If Sample: which features are being showcased. -->

### Clone the Example 🐑

<!--
🚀 Starters: if there is a CLI to use as template, offer a command.
🚀🧙‍♂️ Starter & Samples: provide a degit comand for shallow-cloning.
-->

```sh
npx degit xataio/examples/apps/<name-of-app> my-xata-app
```

## Initialize your Database 🐣

In order to connect to a workspace, a `XATA_API_TOKEN` and a database URL. One of way of setting it up is running the [Xata CLI](https://xata.io/docs/cli/getting-started).

> 💡 Having it globally will speed-up linking your project via `xata init`, just make sure you have it up-to-date so it generates the SDK with compatible types.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), you need to initialize your database:

```bash
npm run xata:init
```

> ⚠️ By default this command runs with `npx`, adjust your `package.json` accordingly, specially if you have the CLI globally available in your system.

### Regenerating Types

Once the project is already linked, re-generate your types every time the schema changes via

```
npm run xata:codegen
```

> ⚠️ By default this command runs with `npx`, adjust your `package.json` accordingly, specially if you have the CLI globally available in your system.

<!--
🚀 Starters: how to use it as a template.
🧙‍♂️ Samples: how to run it locally.
-->

## Notes 💡

<!--
Additional notes that can be useful to users.
Links, resources, ...
-->
