# Upload file example with Next.js

An example application demonstrating a simple file upload flow as described in our documentation.

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
npx degit xataio/examples/apps/sample-nextjs-upload-file xata-nextjs-upload-file
```

And `cd` into the app directory:

```sh
cd xata-nextjs-upload-file
```

Install the dependencies:

```sh
npm install
```

## Initialize your Xata project

Initialize a new Xata project with the following command, agreeing to the default prompt options.
This step will create a new database with the name `sample-nextjs-upload-file` for you, the `.xatarc` file and generate the client under `utils/xata.ts`.

```sh
xata init --codegen=utils/xata.ts
```

The above command will create a `.env` file containing your Xata project configuration.

| Key            | Description                         |
| -------------- | ----------------------------------- |
| `XATA_API_KEY` | The API key to your Xata workspace. |
| `XATA_BRANCH`  | The database branch to be used.     |

## Create database schema for this example

This repo contains a simple `images` table. Load the schema as shown.

```sh
xata schema upload schema.json
```

Then pull down the schema changes

```sh
xata pull main
```

## Run the Xata + Next.js application

```sh
npm run dev
```
