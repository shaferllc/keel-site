# keel-site ⚓

The website for the [Keel framework](https://github.com/shaferllc/keel) — and a
working example of a Keel app deployed to **Cloudflare Workers**.

This repo is intentionally separate from the framework. It **installs Keel** as
a dependency and builds on `keel/core`, exactly the way any app would:

```
keel          →  the framework (the library)
keel-site     →  an app built on it (this repo)
```

## Stack

- **[Keel](https://github.com/shaferllc/keel)** — container, providers, routing,
  and the View layer, installed from GitHub.
- **[Hono](https://hono.dev)** — the HTTP + JSX runtime Keel builds on.
- **[Cloudflare Workers](https://workers.cloudflare.com)** — global edge
  hosting.

## How it runs on the edge

Keel's core has no hard Node dependency, so it boots on a Worker. The only
difference from a Node Keel app is in `src/bootstrap/app.ts`:

```ts
await app.boot([AppServiceProvider], { discoverConfig: false, config });
```

`discoverConfig: false` skips filesystem config discovery (there's no filesystem
on Workers); config is passed inline instead. The Worker entry
(`src/worker.ts`) builds the app once and exports its Hono instance as the fetch
handler.

## Develop

```bash
npm install          # pulls keel from GitHub
npm run dev          # wrangler dev — http://localhost:8787
npm run typecheck
```

## Deploy

```bash
npm run deploy       # wrangler deploy
```

## Layout

```
src/
├─ worker.ts               Cloudflare Worker entry (exports the fetch handler)
├─ config.ts               Inline config (no filesystem on Workers)
├─ bootstrap/app.ts        Boots Keel, loads routes, returns the Hono app
├─ Http/
│  ├─ Kernel.ts            Global middleware
│  └─ Middleware/
├─ Providers/              Service providers
├─ Controllers/            Resolved from the container (DI)
├─ routes/web.ts           Route definitions
└─ views/                  Hono JSX components (layout + home)
```

## License

MIT © 2026 Tom Shafer
