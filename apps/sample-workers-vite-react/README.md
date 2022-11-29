# Xata Workers Vite React Sample App

This is a sample app that uses [Xata Workers](https://xata.io/beta/workers) and [Vite](https://vitejs.dev) to build a React app.

> ⚠️ "Xata Workers" is a private beta feature and subject to changes until it reaches general availability.

- [Join the for Xata Workers waitlist](https://xata.io/beta/workers).
- Contact us in our [Discord Community](https://xata.io/discord) to let us know about your use case.
- If you're already a user, you can also open a [support ticket](https://support.xata.io/hc/en-usrequests/new).

## Getting Started

### Shallow Clone

You can copy locally only this project from the monorepo with the following command:

```sh
npx degit xataio/examples/apps/sample-workers-vite-react my-xata-workers-app
```

### Install Project Dependencies

```bash
npm install
```

## Setup Your Xata Database and Worker

This project uses the "demo db" from your project initialization.

<details>
    <summary> "Start with sample data" at Xata's UI </summary>
    <img alt="Xata dashboard for starting with sample data" src="/sample-db.png" />
</details>

> 💡 We recommend installing `@xataio/cli` globally in your system. But if you don't wish to do so, it is possible to add to your project dependencies and run it through the package manager.

**Connect this project to a Xata workspace and database**

```bash
xata init
```

**Configure Xata Workers**

```bash
xata workers init
```

**Start the app and run the Xata Worker concurrently**

```bash
npm run dev
```

## Deploying Your Own

To deploy the Xata worker you need to run:

```bash
xata workers upload
```

Finnaly, build your app and serve from your provider of choice.

## Xata Workers feedback

We'd love to hear your feedback on Xata Workers.
Please [join our Discord](http://xata.io/discord) and let us know what you think!

> 🐛 If you encounter any issues while using Xata, please open a [support ticket](https://support.xata.io/hc/en-usrequests/new).
