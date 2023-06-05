# Xata + Next.js + Auth.js

Sample app using Next-Auth for managing OAuth login with the Xata adapter.

> ⚠️ This example uses the **App Routing**, if using `/pages`, go for **Pages Routing**.

## Features ⚡️

- React Server Components
- Next-Auth API Routes.
- GitHub as OAuth Provider with Xata official adapter.

### Cloning the Project

```bash
# create a new project in my-awesome-app
npx degit xataio/examples/apps/sample-next-auth-app my-awesome-app
```

## Initialize your Database

In order to connect to a workspace, a `XATA_API_TOKEN` and a database URL. One of way of setting it up is running the [Xata CLI](https://xata.io/docs/getting-started/cli).

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

## Setup GitHub as Single Sign-On Provider

This sample uses GitHub as the SSO Provider, any of the [supported providers by Auth.js](https://next-auth.js.org/providers/) can be used. [To setup the GitHub OAuth App, check Auth.js docs](https://next-auth.js.org/providers/github).

## File Structure and Routes

| Directory  | Description                                               |
| ---------- | --------------------------------------------------------- |
| `/app`     | Routes and files for **App directory** structure.         |
| `/pages`   | Where the API Routes live.                                |
| `/public`  | Static resources and assets (Next.js convention).         |
| `/shared`  | Components and libraries used by both routing structures. |
| `/.vscode` | TypeScript helper plugins for Next.js.                    |

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
