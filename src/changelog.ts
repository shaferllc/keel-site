/** Release history, shown at /changelog. Newest first. */
export interface Release {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

export const RELEASES: Release[] = [
  {
    version: "0.17.0",
    date: "2026-07-10",
    title: "Cache",
    changes: [
      "Memory-backed cache with TTLs: cache().get/put/has/forget/pull/flush.",
      "remember(key, ttl, fn) and rememberForever(key, fn).",
      "Pluggable via the CacheStore interface (swap in Redis/KV).",
    ],
  },
  {
    version: "0.16.0",
    date: "2026-07-10",
    title: "Events",
    changes: [
      "A tiny event emitter: emit(event, payload) and listen(event, fn) global helpers.",
      "events() for once / off / listenerCount / clear.",
      "Async listeners are awaited in registration order.",
    ],
  },
  {
    version: "0.15.0",
    date: "2026-07-10",
    title: "Sessions",
    changes: [
      "Cookie-backed session store (edge-safe, no external service).",
      "session() get/put/has/forget/pull/increment/clear/all.",
      "Flash messages: session().flash() / flashed() survive one request.",
      "Enable with sessionMiddleware() in your HTTP kernel.",
    ],
  },
  {
    version: "0.14.0",
    date: "2026-07-10",
    title: "Request input, cookies, response helpers",
    changes: [
      "request.all() / input() / only() / except() merge query + parsed body; request.ip().",
      "Cookies: request.cookie(), response.cookie() / clearCookie().",
      "response.send() (objects → JSON, else text) and response.abort() (throws HttpException).",
    ],
  },
  {
    version: "0.13.0",
    date: "2026-07-10",
    title: "Controllers",
    changes: [
      "Single-action controllers: [Controller] calls handle().",
      "Lazy-loaded controllers: [() => import(...), method] imported on first hit.",
      "Richer resources: .as() / .params() / .use(actions, mw); nested resources (posts.comments → /posts/:post_id/comments/:id).",
      "make:controller --resource generates all seven RESTful actions.",
    ],
  },
  {
    version: "0.12.0",
    date: "2026-07-10",
    title: "Inertia + domain routing",
    changes: [
      "Inertia.js server adapter: inertia(\"Page\", props) + on().renderInertia(); X-Inertia negotiation, version 409s, partial reloads.",
      "Domain / subdomain routing: .domain(pattern), host dispatch, request.subdomain().",
      "Route matchers (number/uuid/slug/alpha), global router.where(), group .where().",
      "Brisk helpers: on().renderInertia / redirectToPath / redirectToRoute(qs). request.route + request.routeIs(). .use() middleware alias.",
    ],
  },
  {
    version: "0.11.0",
    date: "2026-07-10",
    title: "First-class routing",
    changes: [
      "Named routes + router.url() URL generation.",
      "Route groups: group(cb).prefix().middleware().as().",
      "Resource routes: router.resource(name, Controller) with only/except/apiOnly.",
      "Per-route .middleware() and .where() param constraints; on().redirect()/.render().",
    ],
  },
  {
    version: "0.10.0",
    date: "2026-07-10",
    title: "Request validation",
    changes: [
      "validate(schema, data?) parses input (JSON body by default) and returns typed data.",
      "Invalid input throws ValidationException → automatic 422 with per-field errors.",
      "Schema-agnostic — works with any Zod-style safeParse; the framework bundles no validation library.",
    ],
  },
  {
    version: "0.9.0",
    date: "2026-07-10",
    title: "Static routes + response accessor",
    changes: [
      'Static-response routes: router.get("/health", json({ status: "ok" })) — cloned per request.',
      "response accessor mirrors request: response.json/text/html/redirect + chainable status()/header().",
      "json/text/html/redirect now work outside a request too (plain Response).",
    ],
  },
  {
    version: "0.8.0",
    date: "2026-07-10",
    title: "request accessor",
    changes: [
      "request.method / path / url / status plus header()/param()/query()/json()/raw.",
      "Read the request in middleware and loggers without touching the context.",
    ],
  },
  {
    version: "0.7.0",
    date: "2026-07-10",
    title: "Global container helpers",
    changes: [
      "bind / singleton / instance / make / bound operate on the active application — no this.app.",
    ],
  },
  {
    version: "0.6.0",
    date: "2026-07-10",
    title: "Request helpers",
    changes: [
      "json / text / html / redirect / param / query / header / body / ctx reach the current request.",
      "Powered by async-context storage the HTTP kernel enables per request.",
    ],
  },
  {
    version: "0.5.0",
    date: "2026-07-10",
    title: "Error & exception handling",
    changes: [
      "HttpException + NotFound/Unauthorized/Forbidden/Validation subclasses.",
      "Kernel renders errors as JSON/HTML by Accept, a stack-trace page in debug, hidden internals in prod.",
      "Unmatched routes become a tidy 404; customize via kernel.onError().",
    ],
  },
  {
    version: "0.4.0",
    date: "2026-07-10",
    title: "view() helper",
    changes: [
      "view(Component, props) renders a view in one call with type-checked props.",
    ],
  },
  {
    version: "0.3.0",
    date: "2026-07-10",
    title: "config()/app() helpers + npm package",
    changes: [
      "Global config() and app() helpers.",
      "Published as @shaferllc/keel with a real build (compiled JS + .d.ts).",
    ],
  },
  {
    version: "0.2.0",
    date: "2026-07-10",
    title: "Views + edge-safe core",
    changes: [
      "View layer (Hono JSX). Core made Cloudflare Workers-safe.",
    ],
  },
  {
    version: "0.1.0",
    date: "2026-07-10",
    title: "MVP core",
    changes: [
      "Service container, providers, config, routing, middleware, and the console.",
    ],
  },
];
