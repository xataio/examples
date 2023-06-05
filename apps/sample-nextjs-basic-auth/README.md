# Next.js + Xata with Basic Auth

This is the app mentioned in our [Quickstart documentation](https://xata.io/docs/quickstart/index).

## Run locally 👾

Copy the code from this repository. Or use it as a Next.js starter:

```
npx create-next-app -e https://github.com/xataio/examples/apps/sample-nextjs-basic-auth
```

We recomend to have the [Xata CLI](https://xata.io/docs/getting-started/cli) installed globally to make your usage more ergonomic:

```
npm i -g @xata.io/cli@latest
```

And then you can initialize your database with `schema-template.json`

```
xata init --schema=./schema-template.json
```

This command will link your database to your workspace, push your schema, and run `xata codegen` for the first time.
From then on, once you change schema, you will just need to run `xata codegen`.

Run locally:

```
npm run dev
```

See it on [localhost:3000](http://localhost:3000)

---

<img alt="Xatafly, Xata's logo" src="https://raw.githubusercontent.com/xataio/vscode-extension/2e3d0b877cf6aff1e0fc717e05ada714465ca783/doc/xata-icon-128.png" width="24" />
