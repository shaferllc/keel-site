/** Release history, shown at /changelog. Newest first. */
export interface Release {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

export const RELEASES: Release[] = [
  {
    version: "0.37.0",
    date: "2026-07-10",
    title: "Templates & transformers",
    changes: [
      "Templates: a Blade/Edge-style engine — {{ }} interpolation and @-tags (if/each/include/layout/component/slot/filters).",
      "Interprets templates against a safe evaluator instead of eval/new Function, so they run on Node and on Workers.",
      "Transformers: shape models into API JSON — item/collection/document, when/whenLoaded, generator make:transformer.",
    ],
  },
  {
    version: "0.36.0",
    date: "2026-07-10",
    title: "Notifications",
    changes: [
      "notify(user, new InvoicePaid(4200)) over pluggable channels; via() + toMail/toArray.",
      "Built-ins: MailChannel (routed by email), DatabaseChannel (inserts toArray), ArrayChannel (tests).",
      "shouldQueue delivers from a queued job — composes the mail + queue layers. Generator make:notification.",
    ],
  },
  {
    version: "0.35.0",
    date: "2026-07-10",
    title: "Queues & jobs",
    changes: [
      "dispatch(new Job()) or dispatch(fn) onto a pluggable QueueDriver.",
      "SyncDriver runs immediately (default); MemoryDriver defers, work() drains FIFO.",
      "{ delay, queue } options; push-only custom driver is the seam for real brokers. Generator make:job.",
    ],
  },
  {
    version: "0.34.0",
    date: "2026-07-10",
    title: "Mail",
    changes: [
      "Fluent mailer: mail().to().subject().html().send() over a pluggable Transport.",
      "Built-ins: ArrayTransport (tests), LogTransport (dev), fetchTransport for provider HTTP APIs.",
      "Core imports no SDK — edge-safe; send() validates recipient/subject/body/from.",
    ],
  },
  {
    version: "0.33.0",
    date: "2026-07-10",
    title: "Model casts + mass-assignment guarding",
    changes: [
      "static casts round-trips columns as real JS types (int/float/boolean/string/json/array/date).",
      "static fillable/guarded filter create()/fill() against over-posting; forceFill() bypasses.",
      "No casts/fillable declared = unchanged (backward compatible).",
    ],
  },
  {
    version: "0.32.0",
    date: "2026-07-10",
    title: "Factories & seeders",
    changes: [
      "factory(Model, (f, i) => ({...})) with a built-in, dependency-free seedable Faker.",
      ".make()/.create()/.count(n) + inline overrides; Seeder classes with run() + call([...]).",
      "Generators make:factory and make:seeder. Edge-safe.",
    ],
  },
  {
    version: "0.31.0",
    date: "2026-07-10",
    title: "Model relationships",
    changes: [
      "hasMany/hasOne/belongsTo/belongsToMany on the query builder (no JOINs, edge-safe).",
      "Relations are awaitable and expose .query(); Model.load() eager-loads with one whereIn (fixes N+1).",
      "belongsToMany reads a pivot + attach/detach/sync; loaded relations serialize via toJSON().",
    ],
  },
  {
    version: "0.30.0",
    date: "2026-07-10",
    title: "Migrations",
    changes: [
      "Fluent schema builder: schema.createTable(name, t => { t.id(); t.string(...).unique(); t.timestamps(); }).",
      "Migrator up/down/ran — batch-tracked in a migrations table.",
      "Dialect-aware SQL (sqlite/mysql/postgres); driver-agnostic.",
    ],
  },
  {
    version: "0.29.0",
    date: "2026-07-10",
    title: "Active-record models",
    changes: [
      "Model base class over the query builder: static find/findOrFail/all/first/where/create.",
      "Instance save (insert-or-update)/delete/fill/toJSON.",
      "Runs on any registered connection (edge-safe); Model.query() for the raw builder.",
    ],
  },
  {
    version: "0.28.0",
    date: "2026-07-10",
    title: "Database query builder",
    changes: [
      "Driver-agnostic, parameterized query builder: db(table).where().orderBy().get()/first()/count().",
      "whereIn/whereNull/orWhere + insert/insertGetId/update/delete.",
      "Runs through a two-method Connection (setConnection) — D1/Neon/PlanetScale/Turso/pg. Core imports no driver.",
    ],
  },
  {
    version: "0.27.0",
    date: "2026-07-10",
    title: "Authentication",
    changes: [
      "Session-based auth: auth().login/logout/check/guest/id/user.",
      "Pluggable user provider via setUserProvider().",
      "authGuard({ redirectTo? }) middleware (401 or redirect). Built on session + hash.",
    ],
  },
  {
    version: "0.26.0",
    date: "2026-07-10",
    title: "Structured logger",
    changes: [
      "logger().debug/info/warn/error with structured JSON output (pretty in debug).",
      "Level threshold from config('logger.level').",
      "logger().child({ … }) for bound fields (request ids, etc.).",
    ],
  },
  {
    version: "0.25.0",
    date: "2026-07-10",
    title: "Rate limiter",
    changes: [
      "rateLimiter({ max, window, key, message }) middleware — fixed-window, per-key buckets.",
      "X-RateLimit-* / Retry-After headers, 429 on exceed.",
      "In-memory store by default; pluggable for distributed limiting.",
    ],
  },
  {
    version: "0.24.0",
    date: "2026-07-10",
    title: "Hashing + encryption",
    changes: [
      "hash.make/verify/needsRehash (PBKDF2-SHA256, timing-safe).",
      "encryption.encrypt/decrypt (AES-GCM keyed by config('app.key'); decrypt returns null on tamper).",
      "Both use Web Crypto — edge-safe, no native bindings.",
    ],
  },
  {
    version: "0.23.0",
    date: "2026-07-10",
    title: "Debugging: dump & dd",
    changes: [
      "dump(...values) logs to the console and returns its first argument.",
      "dd(...values) renders values in the browser and halts the request (self-rendering exception).",
      "Both edge-safe.",
    ],
  },
  {
    version: "0.22.0",
    date: "2026-07-10",
    title: "Self-handling exceptions + error codes",
    changes: [
      "Exceptions with handle(c) render themselves; report() is awaited before rendering.",
      "HttpException.code included in the JSON error body.",
    ],
  },
  {
    version: "0.21.0",
    date: "2026-07-10",
    title: "URL builder + signed URLs",
    changes: [
      "router.url(name, params, { qs }) query-string support.",
      "Signed URLs: router.signedUrl() (HMAC-SHA256 via Web Crypto, keyed by config('app.key'), expiresIn).",
      "router.hasValidSignature() verifies the current request. Edge-safe.",
    ],
  },
  {
    version: "0.20.0",
    date: "2026-07-10",
    title: "Named middleware registry",
    changes: [
      "router.named({ auth, admin }) registers middleware by name.",
      "Reference with .use(\"auth\") on routes, groups, and resources.",
      "Names resolve at build time (unknown names throw); raw functions still work.",
    ],
  },
  {
    version: "0.19.0",
    date: "2026-07-10",
    title: "File uploads + request/response completeness",
    changes: [
      "File uploads: request.file()/files()/allFiles() return web File objects (edge-safe).",
      "Content negotiation: request.accepts/types/language/languages.",
      "request.hasBody()/headers()/ips(); response.type()/append()/removeHeader().",
      "Guards: response.abortIf() / abortUnless().",
    ],
  },
  {
    version: "0.18.0",
    date: "2026-07-10",
    title: "Static file server",
    changes: [
      "serveStatic(options) serves ./public before routes.",
      "ETag / Last-Modified / 304, Cache-Control (maxAge/immutable), dot-file policy, per-file headers, traversal guard.",
      "node:fs loaded dynamically so the core still imports on the edge.",
    ],
  },
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
