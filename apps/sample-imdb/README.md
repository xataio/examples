<h1> XMDB <img alt="Xatafly, the logo from Xata" src="/public/flap.gif" width="50" /></h1>

Xata Movie Database (XMDB) was built with Xata using Next.js and TypeScript to showcase Xata can be used by large databases (over **9 million records**).

## Features ⚡️

- [Typo-Tolerant Full-Text Search](https://xata.io/docs/api-guide/search).
- [Aggregations](https://xata.io/docs/api-guide/aggregate).
- [Type-Safe SDK/ORM](https://github.com/xataio/client-ts/blob/main/packages/client/README.md) (schema-based types generation).

## Under the Hood ⚙️

- [Next.js 13](https://beta.nextjs.org/docs) with Server-Components.
- Experimental [App Directory](https://beta.nextjs.org/docs/app-directory-roadmap) feature.
- [Turbopack](https://turbo.build/pack) Compatible.
- [Tailwind CSS](https://tailwindcss.com/).

### Setup 🧱

To have your own local instance of this app, you will need 2 API keys, and your deployment URL.

- [`XATA_API_TOKEN`](https://xata.io/docs/concepts/api-keys): to connect your own Xata workspace.
- [`OMDB_API_TOKEN`](https://www.omdbapi.com/apikey.aspx): used as fallback to complement whenever there's missing data in our tables.
- `VERCEL_URL`: popullated by Vercel, on your local environment it’s your local server url (`https://localhost:3000` by default).

Once you have those keys, you can create your own `.env` or `.env.local` as shown in `.env.template`.

> ⚠️ Remember to **never** share this tokens in unsecured connections.

### Run Locally 🧑‍✈️

- Run the `dev` task to compile and serve it using Webpack.

By default, server will run on [localhost:3000](http://localhost:3000).

> ⚠️ To try running with Turbopack, remove the `experimental.runtime` config from `next.config.mjs`.

---

<img alt="Xatafly, Xata's logo" src="https://raw.githubusercontent.com/xataio/vscode-extension/2e3d0b877cf6aff1e0fc717e05ada714465ca783/doc/xata-icon-128.png" width="24" />
