# Xata + Next.js + Auth.js

This is a simple dashboard built using Next 13 with Auth.js to manage OAuth & the official [Xata adapter](https://authjs.dev/reference/adapter/xata) to capture user storage, sessions, and more!

> ⚠️ This example uses the Next 13 `app router`. If you're using `page routing` you can find an example [here](https://github.com/xataio/examples/tree/main/apps/sample-next-auth-pages).

## Features ⚡️

- React Server Components
- Auth.js Route Handlers
- GitHub as OAuth Provider
- User sessions, storage, and more in your database using the Xata adapter

### Cloning the Project

We'll be using [degit](https://github.com/Rich-Harris/degit) to clone the example locally, without any of the git history

```bash
npx degit xataio/examples/apps/sample-next-auth-app your/project/name
```

## Initialize your Database

First, make sure you've globally installed the [Xata CLI](https://xata.io/docs/getting-started/cli).

```bash
npm install --location=global @xata.io/cli@latest
```

Once installed we'll authorize our Xata account using the `auth` command:

```bash
xata auth login
```

Finally we have to do a few things:

- Create a new database
- Create the schema to match Auth.js' [expectations](https://authjs.dev/reference/adapter/xata#setup)
- Connect our new database to our project & generate the Xata client

Thankfully, the CLI can handle all of this using the `init` command (since we already have a local json schema).

```bash
xata init --schema=schema.template.json --codegen lib/xata.codegen.ts
```

> 💡 If you're curious about the above flags
>
> - `--schema=schema.template.json` defines a path to our schema that Xata can use to initialize tables in our database
>
> - `--codegen lib/xata.codegen.ts` defines a path to generate the Xata client & types

## Setup GitHub as Single Sign-On Provider

This sample uses GitHub as the SSO Provider, any of the [supported providers by Auth.js](https://next-auth.js.org/providers/) can be used. [To setup the GitHub OAuth App, check Auth.js docs](https://next-auth.js.org/providers/github).

## Set Environment Variables

Follow `.env.template` to fill your environment variables for development and for production.

| Key                    | Description                                  |
| ---------------------- | -------------------------------------------- |
| `XATA_API_KEY`         | `token` to your Xata workspace.              |
| `XATA_FALLBACK_BRANCH` | `main` (default).                            |
| `GITHUB_ID`            | `id` to your OAuth app.                      |
| `GITHUB_SECRET`        | `token` to your OAuth app.                   |
| `NEXTAUTH_URL`         | different callback URL for each environment. |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://beta.nextjs.org) - learn about the Next.js features and API.
- [Xata](https://xata.io/docs) - learn about Xata.
- [Auth.js](https://auth.js.org/) - learn Next-Auth in the Auth.js documentation.
