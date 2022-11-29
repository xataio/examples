# Xata Workers Vite React Sample App

This is a sample app that uses [Xata Workers](https://xata.io/beta/workers) and [Vite](https://vitejs.dev) to build a React app.

**Note:** "Xata Workers" is a private beta feature and subject to changes until it reaches general availability.  
In order to access Xata Workers, you first need to request [Beta access](https://xata.io/beta/workers), which follows a waitlist.  
In case you would like to request expedited early access please [contact Support](https://support.xata.io/hc/en-us/requests/new).

## Getting Started

1. Install dependencies

```bash
pnpm install
```

2. Connect to your Xata database (demo db)

```bash
xata init
```

3. Configure Xata Workers

```bash
xata workers init
```

4. Start the app

```bash
pnpm dev
xata workers watch
```

## Deploying

1. Deploy Xata Workers

```bash
xata workers upload
```

2. Build the app

```bash
pnpm build
```

## Xata Workers feedback

We'd love to hear your feedback on Xata Workers. Please [join our Discord](http://xata.io/discord) and let us know what you think!
