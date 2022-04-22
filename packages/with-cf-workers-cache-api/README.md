# 👷 Xata url shortner

An example URL shortner using Xata and Cloudflare Workers. It uses the Cache API to cache the mapping and avoid querying Xata on each request.

It's written in JS and uses the fetch API directly (no Xata SDK).

You can maintain the list of URLs via the Xata UI.

### To test locally

Create the associated Xata DB.
```
xata auth login
xata deploy
```

Go to the Xata UI and add a few URLs.

Then start the CF dev locally:

```
wrangler login
wrangler dev
```

### To deploy

```
wrangler publish
```