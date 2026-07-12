/** Release history, shown at /changelog. Newest first. */
export interface Release {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

export const RELEASES: Release[] = [
  {
    version: "0.70.0",
    date: "2026-07-11",
    title: "Telemetry and a real testing toolkit",
    changes: [
      "Telemetry: distributed tracing with no SDK. trace(name, fn) opens a span and nests automatically across await boundaries — and across concurrent traces, because the current span lives in AsyncLocalStorage rather than a global. tracing() middleware opens a server span per request and joins the caller's trace via their traceparent. Speaks OTLP/HTTP over fetch, so it runs on Workers as happily as on Node, and any collector takes it (Jaeger, Tempo, Honeycomb, Grafana, Datadog). New /docs/telemetry guide.",
      "Sampling decided once at the root and inherited by every child (half a trace is worse than none), injectTraceContext() for outgoing calls, traceIds() to hang trace_id/span_id on a log line, and otlpExporter / consoleExporter / MemoryExporter.",
      "Testing: assertJsonContains (a subset match, so adding an unrelated field doesn't break twenty tests), assertValidationErrors, assertSee, assertCookie, status shorthands, and withToken/withCookie/form/multipart request builders that return a copy so a configured client can't leak into another test.",
      "Testing: database assertions (assertDatabaseHas/Missing/Count/Empty), truncate(), freezeTime/timeTravel so 'expires in an hour' doesn't take an hour, spy()/spyOn() that call through by default, resetState() to stop one test leaking into the next, and runCommand() for console tests.",
    ],
  },
  {
    version: "0.69.1",
    date: "2026-07-11",
    title: "serveStorage: fail loudly on a basePath mismatch",
    changes: [
      "serveStorage({ signed: true }) now throws when the disk's url() prefix doesn't match basePath, naming both paths. It used to 403 every request — which reads as 'your link expired' and sends you hunting in the wrong place, when the real problem is a misconfiguration.",
    ],
  },
  {
    version: "0.69.0",
    date: "2026-07-11",
    title: "AI-native tooling, locks, i18n, mail, queues, logger",
    changes: [
      "AI-native tooling: an MCP server (keel mcp) exposing the docs, the full public API, and the generators to any Model Context Protocol client, plus AGENTS.md, llms.txt / llms-full.txt, and the /docs/ai guide — all generated from the same source as the human docs, so they never drift.",
      "Distributed locks: lock('invoice:42').run(fn) — 'only one of you may do this at a time' across processes and nodes, over a pluggable store seam. Every acquisition mints an owner token, so a late release() can't free a lock someone else now holds. New /docs/locks guide.",
      "Internationalization with no dependency: ICU messages (plural with =0 branches and #, selectordinal, select, number/date/time, nested), the Intl-backed formatters, detectLocale() and negotiateLocale(), and an es-MX → es → default fallback chain. Plural categories come from the locale, not from English. New /docs/i18n guide.",
      "Mail: sendLater() to put a message on the queue instead of holding the request open for an SMTP round trip, attachments and inline cid: embeds, BaseMail classes, named mailers, and fakeMail() with separate sent/queued assertions.",
      "Queues: retries with backoff (exponential/linear/fixed), a failed() hook and a dead-letter list, priority, JobContext, and fakeQueue() with assertions. A failed job no longer takes down the worker — it's logged, recorded, and the queue keeps draining.",
      "Logger: trace and fatal levels, pluggable sinks (send logs anywhere, not just the console), wildcard/censor/remove redaction, isLevelEnabled() so you don't build a context object for a line nobody emits, and named loggers.",
    ],
  },
  {
    version: "0.68.0",
    date: "2026-07-11",
    title: "Storage signed URLs, typed events, health checks",
    changes: [
      "Storage: signedUrl() for private files and signedUploadUrl() so the browser PUTs straight to the bucket (a large upload never streams through a Worker). put() now infers the content type from the extension, so files stop landing in your bucket as application/octet-stream. Plus metadata()/size()/copy()/move(), serveStorage() middleware, and fakeDisk() with assertions.",
      "Events: an opt-in EventsList registry — declare a payload once and both sides are checked, so what you emit and what a listener receives can't drift apart. Plus onError(), onAny(), and fake() with an assertion buffer. A throwing listener no longer skips the listeners after it.",
      "Health checks: /health/live (answers instantly, checks nothing — a liveness probe that touched the database would restart a healthy app during a blip) and /health/ready (200 while healthy, 503 when a check fails). Built-in database/redis/cache checks, plus check(name, fn) for your own. New /docs/health guide.",
    ],
  },
  {
    version: "0.67.0",
    date: "2026-07-11",
    title: "Cache: stampede protection, grace, tags, namespaces",
    changes: [
      "Stampede protection: concurrent remember() misses for the same key collapse into a single factory run, so a hot key expiring no longer dog-piles the upstream.",
      "Grace / stale-on-error: an expired value is retained a little longer and served if the refreshing factory throws — a flaky upstream degrades to slightly-stale data instead of an error.",
      "Tags with deleteByTag(), and namespaces with a scoped flush() — both via version stamps, so invalidation is O(tags) with no key index and works on any store. Plus add(), missing(), and forgetMany().",
    ],
  },
  {
    version: "0.66.0",
    date: "2026-07-11",
    title: "hash.fake() for fast tests",
    changes: [
      "hash.fake() / hash.restore(): swap real PBKDF2 for a trivial scheme in tests so suites that create many users don't pay the hashing cost.",
    ],
  },
  {
    version: "0.65.0",
    date: "2026-07-11",
    title: "Security: CORS, shield headers, CSRF",
    changes: [
      "cors() middleware with automatic preflight handling (origin allowlist/predicate, credentials, exposeHeaders, maxAge).",
      "securityHeaders(): CSP (string or directives object), HSTS, X-Frame-Options, nosniff, Referrer-Policy. csrf() session-backed protection with csrfField()/csrfToken() + XSRF-TOKEN cookie for SPAs.",
      "encryption.encrypt() gains expiresIn + purpose (self-expiring, purpose-bound tokens); rateLimiter adds X-RateLimit-Reset. New /docs/cors and /docs/security guides.",
    ],
  },
  {
    version: "0.64.0",
    date: "2026-07-11",
    title: "Auth: OAuth 1.0a social sign-in",
    changes: [
      "social.twitter(config) preset + social.driver1() for any OAuth 1.0a provider (Twitter/X, Trello, …).",
      "OAuth1Driver: requestToken → redirect → accessToken/user three-legged flow, HMAC-SHA1-signed with Web Crypto (edge-native). Same normalized SocialUser.",
      "oauth1Signature() low-level RFC 5849 signer exposed for custom API calls (verified against the canonical Twitter vector).",
    ],
  },
  {
    version: "0.63.0",
    date: "2026-07-11",
    title: "Auth: the full kitchen",
    changes: [
      "Opaque access tokens: revocable, ability-scoped, DB-backed bearer tokens (createToken/verifyToken/revoke/listTokens) + tokenAuth() guard with abilities. Split selector/verifier, hash-only storage, no RETURNING needed.",
      "Social sign-in: fetch-based OAuth2 with GitHub/Google/Discord presets (social.github/google/discord) + social.driver() for any provider; normalized SocialUser. New /docs/social-auth guide.",
      "basicAuth() guard (WWW-Authenticate challenge), hash.dummy for timing-safe login, and gateAfter() to complete authorization parity. Edge-native, all additive.",
    ],
  },
  {
    version: "0.62.0",
    date: "2026-07-11",
    title: "Request/Response: proxy-aware URLs + helpers",
    changes: [
      "Proxy-aware URL accessors: request.protocol/secure/host/hostname/origin/fullUrl/querystring, honoring X-Forwarded-Proto/Host.",
      "response.back(fallback) + redirect('back') via Referer; response.attachment(filename) with RFC 5987 filename*.",
      "Encoding & charset content negotiation (request.encoding/encodings, charset/charsets) alongside accepts/language.",
    ],
  },
  {
    version: "0.61.0",
    date: "2026-07-11",
    title: "Database: batteries-included adapters",
    changes: [
      "@shaferllc/keel/db/d1 — d1Connection(env.DB) for Cloudflare D1 (sqlite).",
      "@shaferllc/keel/db/pg — pgConnection(client) for pg (Node) or @neondatabase/serverless (edge).",
      "@shaferllc/keel/db/libsql — libsqlConnection(client) for @libsql/client / Turso. Each duck-types its driver: core stays dependency-free, you install only what you use.",
    ],
  },
  {
    version: "0.60.0",
    date: "2026-07-11",
    title: "Database: multiple connections",
    changes: [
      "addConnection(name, conn, dialect): register named connections alongside the default — talk to several databases at once, each with its own dialect.",
      "db(table, name) routes a query to a named connection; connection(name) returns a handle (table() + raw select/write); Model.connection puts a whole model on one.",
      "setDefaultConnection/connectionNames/clearConnections. Fully backward compatible (setConnection = default); resolution stays lazy. Edge-safe, no bundled driver.",
    ],
  },
  {
    version: "0.59.0",
    date: "2026-07-11",
    title: "Auth: stateless JWT tokens + bearer guard",
    changes: [
      "jwt.sign/verify: HS256 on Web Crypto (no deps), signed with app.key. expiresIn (secs or '1h'/'7d'), subject/issuer/audience; verify returns null (never throws) and refuses alg:none.",
      "bearerAuth(): guard that reads Authorization: Bearer, verifies, and drives auth() — no session store needed. { optional: true } lets guests through.",
      "auth().id() now honors a verified token over the session. Local login (hash + login) unchanged; OAuth out of scope.",
    ],
  },
  {
    version: "0.58.0",
    date: "2026-07-11",
    title: "Errors: full HTTP exception family",
    changes: [
      "Named exception classes for every common status (400/402/405/406/408/409/411/429/500/501/502/503), each with a fixed status + stable machine code.",
      "HttpException gains an optional data bag that surfaces in the JSON body, plus toJSON() returning the rendered body shape (errors for ValidationException).",
      "STATUS_TEXT gains labels for the new statuses. All additive and backward compatible.",
    ],
  },
  {
    version: "0.57.0",
    date: "2026-07-11",
    title: "Application: Feathers-style ergonomics",
    changes: [
      "app.configure(fn): inline configurator, chainable — the one-shot alternative to a ServiceProvider.",
      "app.set/get: app-wide settings store backed by Config (shared store with config()).",
      "app.on/once/off/emit: app-level events delegating to the Events singleton. New Configurator type.",
    ],
  },
  {
    version: "0.56.0",
    date: "2026-07-11",
    title: "Broker: validation + caching",
    changes: [
      "Validating: action.params (Zod-style schema) validated+coerced before the handler; bad calls reject with ValidationException.",
      "Caching: action.cache: true|{ttl,keys} + BrokerOptions.cacher (any Keel Cache) memoizes results by action+params.",
      "Metrics/tracing (middleware seam + trace ctx), errors (typed + createError), runner (createService+start) — documented.",
    ],
  },
  {
    version: "0.55.0",
    date: "2026-07-11",
    title: "Broker: fault tolerance + registry",
    changes: [
      "Retry: call(..., { retries }) re-runs on failure (BrokerOptions.retries default); fallback: value|fn instead of throwing.",
      "Order: retry → error hooks → fallback → throw. Registry: hasAction/listActions/listServices/getService.",
      "Networking = pluggable Transporter seam; single-node has no cross-node balancing (documented).",
    ],
  },
  {
    version: "0.54.0",
    date: "2026-07-11",
    title: "Broker: events/context + middlewares",
    changes: [
      "Events/context: broadcastLocal, event groups & wildcard patterns, internal events, event + request-tree context.",
      "Middlewares: new Broker({ middlewares:[...] }) — localAction(next, action) wraps every call (composed), started/stopped lifecycle.",
      "Moleculer lifecycle hooks and per-service this.logger were already in place.",
    ],
  },
  {
    version: "0.53.0",
    date: "2026-07-11",
    title: "Route config / metadata",
    changes: [
      ".config({...}) attaches metadata to a route or group; read it via request.route.config (Fastify's route config).",
      "Group config merges into each route (route keys win); route context is set before route middleware.",
      "Request and Server were already covered — this fills the one gap from Fastify's Routes page.",
    ],
  },
  {
    version: "0.51.0",
    date: "2026-07-11",
    title: "Response header helpers + principles",
    changes: [
      "response gains headers({...}), getHeader(name), hasHeader(name) — inspect and conditionally set response headers.",
      "Brings the response accessor to parity with Fastify's Reply.",
      "Keel's design principles documented in architecture.md (edge-safe/driver-agnostic, explicit-over-implicit).",
    ],
  },
  {
    version: "0.50.0",
    date: "2026-07-11",
    title: "Parameterized providers",
    changes: [
      "app.register(Provider, options) hands options to the provider — typed via ServiceProvider<O>, read as this.options.",
      "Providers are Keel's plugin system; the same class registers multiple times with different options. Reusable plugins.",
      "Backward compatible (options default to {}). Providers stay un-encapsulated by design; middleware is the per-request seam.",
    ],
  },
  {
    version: "0.49.0",
    date: "2026-07-11",
    title: "Broadcasting",
    changes: [
      "broadcast(channels, event, payload) over a pluggable Broadcaster — core owns no socket (Pusher/Ably/Durable Object).",
      "channelAuth patterns gate private/presence channels (false/true/member-data) via authorizeChannel.",
      "MemoryBroadcaster is the in-process default and fans out to local subscribers (Durable Object / SSE).",
    ],
  },
  {
    version: "0.48.0",
    date: "2026-07-11",
    title: "Task scheduling",
    changes: [
      "schedule(job).daily()/everyFiveMinutes()/cron(...) — a task is a Job or a function.",
      "scheduler().runDue(now) runs everything due (to the minute); built-in cron matcher (*, lists, ranges, steps).",
      "Wire to Cloudflare Cron Triggers' scheduled() or a Node interval — one trigger drives all tasks.",
    ],
  },
  {
    version: "0.47.0",
    date: "2026-07-11",
    title: "File storage",
    changes: [
      "Driver-agnostic storage on a pluggable Disk — core imports no fs/SDK, runs on Node and the edge.",
      "storage(): put(string|bytes|ArrayBuffer)/get/getText/exists/delete/list(prefix)/url; named disks.",
      "MemoryDisk is the default for tests; local/S3/R2 adapters in the docs.",
    ],
  },
  {
    version: "0.46.0",
    date: "2026-07-11",
    title: "Authorization (gates & policies)",
    changes: [
      "define(ability, fn) gates; policy(Model, PolicyClass) routes can('update', post) to PostPolicy.update by class.",
      "can/cannot booleans; authorize throws 403; canFor/authorizeFor for a specific user; gateBefore admin bypass.",
      "Current user resolves from auth().user() (setUserResolver overrides); unknown abilities deny.",
    ],
  },
  {
    version: "0.45.0",
    date: "2026-07-11",
    title: "Test client",
    changes: [
      "testClient(app) injects requests (no server) → TestResponse with get/post(JSON)/put/patch/delete helpers.",
      "Fluent, chainable assertions: assertStatus/Ok/Json/Text/Header/Redirect. Body pre-buffered (sync, repeatable reads).",
      "Accepts an Application, an HttpKernel (for global middleware), or any request()-able. Edge-safe.",
    ],
  },
  {
    version: "0.44.0",
    date: "2026-07-11",
    title: "Declarative request validation",
    changes: [
      "validateRequest({ body, query, params }) validates the request before the handler, rejecting bad input with a 422.",
      "Errors from every part aggregate (keyed part.field); validated(part) returns the parsed, typed value.",
      "The declarative counterpart to Fastify route schemas, on the same validate() engine (bring your own schema).",
    ],
  },
  {
    version: "0.43.0",
    date: "2026-07-10",
    title: "Per-request logging & redaction",
    changes: [
      "requestLogger() binds a reqId child logger per request so every log line correlates (Fastify's request.log).",
      "requestLog() reaches the request logger anywhere; logs request start/completion; genReqId/idHeader options.",
      "Logger redact option replaces top-level keys / dot paths with [redacted] without mutating the logged object.",
    ],
  },
  {
    version: "0.42.0",
    date: "2026-07-10",
    title: "Lifecycle hooks & graceful shutdown",
    changes: [
      "onReady(hook) runs after boot; onShutdown(hook) + terminate() run cleanup LIFO for graceful shutdown on SIGTERM.",
      "terminate() is idempotent; a throwing hook can't strand the rest. Router.onRoute(hook) observes route registration.",
      "Application methods + global helpers. Request-lifecycle hooks stay middleware.",
    ],
  },
  {
    version: "0.40.1",
    date: "2026-07-10",
    title: "Raw request-body accessors",
    changes: [
      "request.text(), request.arrayBuffer(), and request.blob() read the body for content types json()/all() don't handle.",
      "XML, CSV, protobuf, msgpack, or any custom format — parse it yourself. Body parsing stays explicit.",
    ],
  },
  {
    version: "0.40.0",
    date: "2026-07-10",
    title: "Request decorators",
    changes: [
      "decorateRequest(name, resolver) attaches named per-request values, resolved lazily and memoized per request.",
      "decorated(name) computes once then caches; setRequestValue overrides from middleware; hasRequestDecorator checks.",
      "Fastify-inspired, without the null-placeholder/onRequest dance — WeakMap-keyed memo, no cross-request leak.",
    ],
  },
  {
    version: "0.39.0",
    date: "2026-07-10",
    title: "Redis",
    changes: [
      "Pluggable RedisConnection driver — core imports no client, runs on Node and the edge.",
      "redis(): get/set(ex,px)/del/exists/incr/decr/expire/ttl/keys/flushAll, getJson/setJson, remember.",
      "MemoryRedis (TTL-aware) is the default for tests; redisStore() adapts it to a CacheStore. Upstash-ready.",
    ],
  },
  {
    version: "0.38.0",
    date: "2026-07-10",
    title: "ORM maturity",
    changes: [
      "Timestamps: static timestamps auto-manages created_at/updated_at.",
      "Pagination (Model.paginate / db().paginate → Paginated<T>), aggregates (sum/avg/min/max), value/pluck.",
      "More clauses (whereBetween/whereNotIn/whereLike, latest/oldest); firstOrCreate/updateOrCreate; update()/refresh().",
    ],
  },
  {
    version: "0.37.1",
    date: "2026-07-10",
    title: "Papercut fixes",
    changes: [
      "make:* stubs import @shaferllc/keel/core (was the non-resolving internal alias).",
      "Connection.select is non-generic (Promise<Row[]>) — drivers drop the `as Connection` cast.",
      "hash.verify returns false on malformed hashes; sessions serialize cookies UTF-8-safe (emoji); router.url() fills repeated params.",
    ],
  },
  {
    version: "0.37.0",
    date: "2026-07-10",
    title: "Templates & transformers",
    changes: [
      "Templates: a {{ }} + @-tag engine (if/each/include/layout/component/slot/filters), in the spirit of AdonisJS Edge.",
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
