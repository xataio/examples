---
name: Server Actions with Xata and Vercel Starter
slug: server-actions-xata-starter
description: A simple Next.js app that uses Xata as a database from Next.js Server Actions.
framework: Next.js
useCase: Starter
css: Tailwind
database: Xata
deployUrl:
demoUrl:
relatedTemplates:
  - postgres-starter
---

# Server Actions with Xata and Vercel Starter

A simple Next.js app that uses Xata as a database from Next.js Server Actions.

## Demo

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)]()

### Clone and Deploy

Execute [`create-next-app`]() with [pnpm](https://pnpm.io/installation) to bootstrap the example:

```bash
pnpm create next-app --example https://github.com/xataio/examples/tree/main/
```

Once that's done, copy the .env.example file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.example .env.local
```

Then open .env.local and set the environment variables to match the ones in your Vercel Storage Dashboard. Your keys should be available under your database's `.env` tab.

Next, run Next.js in development mode:

```bash
pnpm dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples) ([Documentation](https://nextjs.org/docs/deployment)).
