# Next.js + Clerk + tRPC

This is a [Next.js](https://nextjs.org/) project, with [trpc](https://trpc.io), [clerk](https://clerk.dev) and [xata](https://xata.io) setup for you.

You can go play with `server/router/todos.ts` for the server side part. And `pages/index.tsx` for the front-end.

The entire project, thanks to trpc is typesafe end-to-end, from your xata schema until your react component.

You can update your xata schema and run `npm run xata codegen` to see how everything plays together.

### Creating a Project

```bash
# create a new project in my-awesome-app
npx degit xataio/examples/apps/starter-nextjs-trpc-clerk my-awesome-app
```

## Initialize your database

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), you need to initialize your database:

```bash
npm run xata:init
```

## Setup Clerk

You need to create a new project on [Clerk dashboard](https://dashboard.clerk.dev/) and copy/paste the credentials variables into your `.env` file.

The easiest way to find those credentials is to go to [Next.js + Clerk env setup documentation](https://clerk.dev/docs/nextjs/set-environment-keys) while logged in, and click the copy button

You can now run `npm run dev`, create an account and start a new todo!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [tRPC](https://trpc.io/docs) - learn about tRPC.
- [Clerk](https://clerk.dev/docs) - learn about Clerk.
- [Xata](https://xata.io/docs) - learn about Xata.
