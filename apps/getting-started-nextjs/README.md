# Getting Started with Xata + Next.js

An example application demonstrating the basics of using Xata within a Next.js app using **App Routing**.

## Prerequisites

Install the Xata CLI:

```sh
npm install -g @xata.io/cli
```

Login to your Xata account or signup for an account and authenticate the Xata CLI:

```sh
xata auth login
```

## Clone the application

```bash
npx degit xataio/examples/apps/getting-started-nextjs xata-nextjs
```

And `cd` into the app directory:

```sh
cd xata-nextjs
```

Install the dependencies:

```sh
npm install
```

## Initialize your Xata project

Initialize a new Xata project with the following command, agreeing to the default prompt options.
This step will create a new database with the name `getting-started-nextjs` for you, the `.xatarc` file and generate the type under `src/xata.ts`.

```sh
xata init
```

The above command will create a `.env` file containing your Xata project configuration.

| Key            | Description                         |
| -------------- | ----------------------------------- |
| `XATA_API_KEY` | The API key to your Xata workspace. |
| `XATA_BRANCH`  | The database branch to be used.     |

Download a CSV file providing a basic schema and seed data for the application:

```sh
curl https://raw.githubusercontent.com/xataio/examples/main/seed/blog-posts.csv --create-dirs -o seed/blog-posts.csv
```

Create your database schema and seed the database using the CSV of blog post listings in `seed/blog-posts.csv`:

```sh
xata import csv seed/blog-posts.csv --table Posts --create
```

Next, update the generated code in `src/xata.ts` based on the schema that was created by the above command:

```sh
xata pull main
```

## Run the Xata + Next.js application

Run the application as follows:

```sh
npm run dev
```

## Learn More

To learn more about Xata and Next.js, take a look at the following resources:

- [Xata docs](https://xata.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
