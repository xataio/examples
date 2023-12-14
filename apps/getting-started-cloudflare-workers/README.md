# Getting Started with Xata + Cloudflare Workers

## Prerequisites

Install the Xata CLI:

```sh
npm install -g @xata.io/cli
```

Login to your Xata account or signup for an account and authenticate the Xata CLI:

```sh
xata auth login
```

### Install Xata Client

Inside your project root, run the following:

```sh
xata init
```

Accept the defaults. By the end you should have a `.env` file generated for you within your app folder. This file will contain the correct credentials to access your database from your Cloudflare worker.

```bash title=".env"
XATA_API_KEY=YOUR_API_KEY_HERE
XATA_BRANCH=main
```

A file called `.xatarc` should also be generated at the project root, with the following contents:

```base title=".xatarc"
{
  "databaseURL": <YOUR_DATABASE_URL_HERE>,
  "codegen": {
    "output": "src/xata.ts"
  }
}
```

You'll need to move these vars into a file called `.dev.vars` at your project root for local development. This file enables Cloudflare to access these values when running in development mode. For more information, see their [documentation](https://developers.cloudflare.com/workers/configuration/environment-variables/#interact-with-environment-variables-locally).

You should end up with a `.dev.vars` file that looks like this at your project root:

```bash title=".dev.vars"
XATA_API_KEY=<YOUR_API_KEY_HERE>
XATA_BRANCH=<YOUR_BRANCH_HERE>
XATA_DATABASE_URL=<YOUR_DATABASE_URL_HERE>
```

### Create tables

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

### Run your application

```sh
npm run wrangler dev
```

By default, the application runs on `http://localhost:8787`. When visiting this URL the post count should be shown in your browser.
