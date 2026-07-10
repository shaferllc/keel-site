/**
 * Documentation content, as structured blocks. Rendered by src/views/docs.tsx
 * so every page shares the drafting-sheet styling. Add a page here and link it
 * in a GROUP — the routes and sidebar pick it up automatically.
 */

export type Block =
  | { h: string }
  | { p: string }
  | { code: string; file?: string }
  | { list: string[] }
  | { note: string };

export interface DocPage {
  title: string;
  summary: string;
  blocks: Block[];
}

export const GROUPS: { title: string; pages: string[] }[] = [
  { title: "Getting Started", pages: ["introduction", "installation"] },
  {
    title: "The Basics",
    pages: ["container", "providers", "configuration", "routing", "controllers", "request", "sessions", "views", "middleware"],
  },
  { title: "Digging Deeper", pages: ["helpers", "errors", "validation", "events", "cache", "static", "inertia", "console", "architecture"] },
];

/** Flat ordered slug list, for prev/next. */
export const ORDER: string[] = GROUPS.flatMap((g) => g.pages);

export const PAGES: Record<string, DocPage> = {
  introduction: {
    title: "Introduction",
    summary: "Keel is a house framework for Node.js — the ergonomics you reach for, on a modern TypeScript stack.",
    blocks: [
      { p: "Keel gives you a real service container, service providers, dot-notation config, expressive routing, JSX views, request helpers, and error handling — a small, legible core you can read in an afternoon and ship on for real." },
      { p: "[Hono](https://hono.dev) powers the HTTP layer under the hood; everything above it is Keel's. Because the core has no hard Node dependency, the same app runs on Node and on the edge — this very site is a Keel app on Cloudflare Workers." },
      { h: "Philosophy" },
      { list: [
        "**Convention over configuration.** Fixed folders (`app/`, `config/`, `routes/`) mean you always know where things live.",
        "**One container, resolved everywhere.** Testability and composition follow from routing every dependency through it.",
        "**Thin over clever.** No magic you can't read — the framework is a few hundred lines.",
        "**Wrap the best, own the surface.** Hono does HTTP; Keel owns the developer-facing API.",
      ] },
      { h: "Two repos" },
      { p: "Keel is distributed like any real framework — a library you install, plus an app that builds on it:" },
      { list: [
        "**@shaferllc/keel** — the framework library.",
        "**keel-app** — the starter you clone to build something. `npm update` pulls core improvements.",
      ] },
    ],
  },

  installation: {
    title: "Installation",
    summary: "Install the framework into an app, or clone the starter and go.",
    blocks: [
      { h: "Requirements" },
      { list: ["Node.js **≥ 22**", "npm (ships with Node)"] },
      { h: "Start from the starter" },
      { p: "The fastest path is the official starter — a working app with routing, views, config, and a console:" },
      { code: "git clone https://github.com/shaferllc/keel-app my-app\ncd my-app\nnpm install\ncp .env.example .env\nnpm run dev        # http://localhost:3000" },
      { h: "Add to an existing app" },
      { p: "Or install the library and import from `@shaferllc/keel/core`:" },
      { code: "npm install @shaferllc/keel" },
      { code: 'import { Application, Router, config, view } from "@shaferllc/keel/core";' },
      { note: "Getting core updates is just `npm update @shaferllc/keel`." },
    ],
  },

  container: {
    title: "The Service Container",
    summary: "The backbone of the framework — every service is registered in it and resolved out of it.",
    blocks: [
      { p: "Instead of importing concrete classes everywhere and `new`-ing them by hand, you bind how a service is built once, then resolve it wherever you need it." },
      { h: "Binding" },
      { p: "Bindings live in a service provider's `register()` method. A binding is keyed by a token — a string, symbol, or class — and a factory that receives the container." },
      { code: 'this.app.bind("clock", () => new Date());          // transient\nthis.app.singleton(Mailer, (app) => new Mailer(app)); // shared\nthis.app.instance("version", "0.6.0");                // pre-built value' },
      { h: "Resolving" },
      { p: "Use `make()` (or its alias `get()`) to pull something out. Passing an unbound class auto-constructs it, handing it the container:" },
      { code: 'const mailer = this.app.make(Mailer);\nconst version = this.app.make<string>("version");' },
      { h: "The API" },
      { list: [
        "`bind(token, factory)` — transient, fresh value each resolve",
        "`singleton(token, factory)` — shared, resolved once then cached",
        "`instance(token, value)` — register a pre-built value",
        "`make(token)` / `get(token)` — resolve a token",
        "`bound(token)` — whether a token is bound",
      ] },
    ],
  },

  providers: {
    title: "Service Providers",
    summary: "The central place to configure your application, with a two-phase lifecycle.",
    blocks: [
      { p: "A provider has two methods, run in two distinct phases. The application runs every `register()` first, then every `boot()` — so providers can depend on each other without worrying about order." },
      { code: 'export class AppServiceProvider extends ServiceProvider {\n  register(): void {\n    // Phase 1 — bind things into the container.\n    // Do NOT resolve other services here.\n  }\n\n  boot(): void {\n    // Phase 2 — runs after every provider has registered.\n    // Safe to resolve and wire things together.\n  }\n}', file: "app/Providers/AppServiceProvider.ts" },
      { p: "Register your provider in `bootstrap/providers.ts`. Both methods may be `async`." },
      { note: "Rule of thumb: `register()` binds, `boot()` uses. Resolving a service in `register()` is the most common mistake." },
    ],
  },

  configuration: {
    title: "Configuration",
    summary: "Environment variables plus config files, read with a dot-notation helper.",
    blocks: [
      { p: "Config files in `config/` export a default object and are auto-loaded under their filename. `config/app.ts` becomes the `app` namespace." },
      { code: 'import { env } from "@shaferllc/keel/core";\n\nexport default {\n  name: env("APP_NAME", "Keel App"),\n  debug: env("APP_DEBUG", true),\n  port: env("APP_PORT", 3000),\n};', file: "config/app.ts" },
      { h: "Reading config" },
      { p: "The global `config()` helper reads any value with dot notation — no container needed:" },
      { code: 'config("app.name");        // "Keel App"\nconfig("app.port", 3000);  // with a fallback' },
      { p: "Use `env()` only inside config files, so all environment coupling lives in one layer." },
    ],
  },

  routing: {
    title: "Routing",
    summary: "Controllers, static responses, or closures — with request/response helpers so you never thread the context.",
    blocks: [
      { p: "Routes live in `routes/web.ts`. A handler can be a `[Controller, method]` tuple (resolved from the container with DI), a **static response** passed directly, or a **closure** for anything that reads the request." },
      { code: 'router.get("/", [HomeController, "index"]);        // controller\nrouter.get("/health", json({ status: "ok" }));      // static\nrouter.get("/users/:id", () => json({ id: param("id") })); // dynamic', file: "routes/web.ts" },
      { note: "Rule of thumb: same response every time → pass it directly; response depends on the request → wrap it in `() =>` (param() must run per request)." },
      { h: "Request & response helpers" },
      { p: "You don't have to thread the context (`c`) through everything. Global helpers reach the current request for you:" },
      { code: 'import { json, param, query, body } from "@shaferllc/keel/core";\n\n// instead of  show(c) { return c.json({ id: c.req.param("id") }); }\nshow() {\n  return json({ id: param("id") });\n}\n\nasync store() {\n  const data = await body<{ email: string }>();\n  return json({ created: data.email }, 201);\n}' },
      { list: [
        "**Read** — `request.param(name)` · `request.query(name)` · `request.header(name)` · `await request.json()`",
        "**Write** — `response.json(data)` · `response.text()` · `response.html()` · `response.status(201).json(...)`",
        "**Meta** — `request.method` · `request.path` · `request.status` · `request.raw`",
      ] },
      { p: "The `request` accessor is handy in middleware and logging:" },
      { code: "`${request.method} ${request.path} → ${request.status} (${ms}ms)`" },
      { note: "Helpers are powered by async-context storage the kernel enables per request. Taking `c` explicitly still works." },
      { h: "Named routes & groups" },
      { p: "Name routes for URL generation, and group them to share a prefix, middleware, and name prefix:" },
      { code: 'router.get("/users/:id", [Users, "show"]).name("users.show");\nrouter.url("users.show", { id: 42 }); // "/users/42"\n\nrouter\n  .group(() => {\n    router.get("/status", json({ up: true })).name("status");\n  })\n  .prefix("/api")        // -> /api/status\n  .middleware([auth])\n  .as("api");            // -> "api.status"' },
      { h: "Resource routes" },
      { p: "Generate the seven RESTful routes for a controller in one line. Trim with `.only()` / `.except()` / `.apiOnly()`, rename with `.as()` / `.params()`, guard with `.use()`, and nest with a dotted name:" },
      { code: 'router.resource("posts", PostController).apiOnly();\nrouter.resource("posts.comments", Comments); // /posts/:post_id/comments/:id\nrouter\n  .resource("posts", PostController)\n  .as("articles")\n  .params({ posts: "post" })\n  .use(["store", "update", "destroy"], auth);' },
      { h: "Param constraints & matchers" },
      { code: 'router.get("/n/:id", [N, "show"]).where("id", /\\d+/);\nrouter.get("/u/:id", [U, "show"]).where("id", router.matchers.uuid());\nrouter.where("id", router.matchers.number()); // global' },
      { h: "Brisk routes: redirect, view & Inertia" },
      { code: 'router.on("/old").redirect("/new");\nrouter.on("/posts").redirectToRoute("articles.index", {}, { qs: { page: 1 } });\nrouter.on("/about").render(AboutPage, { title: "About" });\nrouter.on("/dashboard").renderInertia("Dashboard", { user });' },
      { h: "Domain & subdomain routing" },
      { p: "Bind routes to a host pattern; `:segments` capture subdomain params, dispatched by the `Host` header:" },
      { code: 'router\n  .group(() => {\n    router.get("/", () => json({ tenant: request.subdomain("tenant") }));\n  })\n  .domain(":tenant.example.com");' },
      { h: "The current route & verbs" },
      { code: 'request.route;                 // { name, pattern, methods }\nrequest.routeIs("posts.show"); // boolean\nrouter.any("/webhook", [Hook, "handle"]);\nrouter.route(["GET", "POST"], "/search", [S, "index"]);' },
    ],
  },

  controllers: {
    title: "Controllers",
    summary: "Plain classes in app/Controllers/, resolved from the container with a fresh instance per request.",
    blocks: [
      { p: "Each public method is an action. Controllers are resolved from the container, so they get dependency injection (the constructor receives the container)." },
      { code: 'export class PostController {\n  index() {\n    return json({ posts: [] });\n  }\n  show() {\n    return json({ id: param("id") });\n  }\n}\n\nrouter.get("/posts", [PostController, "index"]);\nrouter.get("/posts/:id", [PostController, "show"]);' },
      { h: "Single-action controllers" },
      { p: "Define a `handle` method and reference the class with no method name:" },
      { code: 'export class PublishPost {\n  handle() { return json({ published: true }); }\n}\nrouter.post("/posts/:id/publish", [PublishPost]);' },
      { h: "Lazy-loaded controllers" },
      { p: "Pass a `() => import(...)` loader — the controller is imported only when its route is first hit:" },
      { code: 'router.get("/reports", [() => import("../Controllers/ReportController.js"), "index"]);' },
      { h: "Resource controllers" },
      { code: "npm run keel make:controller Post --resource" },
      { note: "Wire them up with `router.resource(\"posts\", PostController)` — see Routing." },
    ],
  },

  request: {
    title: "Request & Response",
    summary: "The full input/output surface — reading input, cookies, and writing responses without threading the context.",
    blocks: [
      { h: "Reading input" },
      { code: 'request.param("id");            // route parameter\nrequest.query("q");             // query value\nrequest.header("authorization");\n\nawait request.all();            // query + parsed body\nawait request.input("email");   // one value, query or body\nawait request.input("page", 1); // with a fallback\nawait request.only(["email"]);  // a subset\nawait request.except(["password"]);' },
      { p: "`request` also exposes `request.method`, `request.path`, `request.status`, `request.ip()`, and `request.raw`." },
      { h: "Cookies" },
      { code: 'request.cookie("session");   // one cookie\nrequest.cookie();            // all cookies\n\nresponse.cookie("session", token, { httpOnly: true });\nresponse.clearCookie("session");' },
      { h: "File uploads" },
      { p: "Uploaded files come back as web-standard `File` objects — edge-safe, no temp directory:" },
      { code: 'const avatar = await request.file("avatar"); // File | undefined\nconst docs = await request.files("docs");     // File[]\nconst all = await request.allFiles();\nconst bytes = await avatar?.arrayBuffer();     // persist via R2/S3/fs' },
      { h: "Content negotiation" },
      { code: 'request.accepts(["application/json", "text/html"]);\nrequest.language(["en", "fr"]);\nrequest.types();' },
      { h: "Writing output" },
      { code: 'response.json({ ok: true });\nresponse.send(anything);          // objects → JSON, else text\nresponse.status(201).json(created);\nresponse.type("text/csv").append("vary", "accept");\nresponse.cookie("flash", "saved").redirect("/");\nresponse.abortIf(!user, "Not found", 404);' },
    ],
  },

  sessions: {
    title: "Sessions",
    summary: "A cookie-backed session store — edge-safe, no external service, with flash messages.",
    blocks: [
      { p: "Add `sessionMiddleware()` to your HTTP kernel, then reach the session anywhere with `session()`. Data lives in an HTTP-only cookie, so it works the same on Node and the edge." },
      { code: 'this.use(sessionMiddleware());  // in app/Http/Kernel.ts' },
      { code: 'session().put("userId", user.id);\nconst id = session().get("userId", null);\nsession().has("userId");\nsession().forget("userId");\nsession().pull("cart");        // read + remove\nsession().increment("visits");' },
      { h: "Flash messages" },
      { p: "Flash data survives exactly one request — perfect for post-redirect messages:" },
      { code: 'session().flash("status", "Saved!");\nreturn redirect("/profile");\n\n// next request\nsession().flashed("status"); // "Saved!"' },
      { note: "Cookie-backed, so keep sessions small (~4KB). For larger sessions, write a middleware that persists to a store and stashes the data on the context the same way." },
    ],
  },

  views: {
    title: "Views",
    summary: "Type-safe JSX components that render the same on Node and the edge.",
    blocks: [
      { p: "Keel renders HTML with Hono JSX — components in `resources/views/`. Layouts are just components that wrap their children." },
      { code: '// @jsxRuntime automatic\n// @jsxImportSource hono/jsx\nimport type { FC } from "hono/jsx";\n\nexport const WelcomePage: FC<{ name: string }> = ({ name }) => (\n  <Layout title={name}>\n    <h1>Hello, {name}</h1>\n  </Layout>\n);', file: "resources/views/welcome.tsx" },
      { note: "The two pragma comments at the top are required on every .tsx file — they select Hono's JSX runtime instead of React." },
      { h: "Rendering" },
      { p: "The global `view()` helper renders a component in one call. Props are type-checked, and it returns a full HTML document you can return straight from a handler:" },
      { code: 'return view(WelcomePage, { name: config("app.name") });' },
    ],
  },

  middleware: {
    title: "Middleware",
    summary: "Code that wraps every request — register it in your HTTP kernel.",
    blocks: [
      { p: "Global middleware is registered in `app/Http/Kernel.ts`. Each runs in the order added." },
      { code: 'export class Kernel extends HttpKernel {\n  constructor(app: Application) {\n    super(app);\n    this.use(requestLogger);\n  }\n}', file: "app/Http/Kernel.ts" },
      { h: "Writing middleware" },
      { p: "A middleware is an async function of `(c, next)`. Do work, `await next()` to continue down the stack, then optionally work on the way back up. Return a response without calling `next()` to short-circuit:" },
      { code: 'export const requireApiKey: MiddlewareHandler = async (c, next) => {\n  if (c.req.header("x-api-key") !== process.env.API_KEY) {\n    return c.json({ error: "Unauthorized" }, 401);\n  }\n  await next();\n};' },
    ],
  },

  helpers: {
    title: "Global Helpers",
    summary: "Reach the app and the current request from anywhere, no plumbing.",
    blocks: [
      { p: "Keel favors small global helpers over threading objects through every function. They resolve against the active application (and, for request helpers, the current request)." },
      { h: "Application" },
      { list: [
        "`app()` — the active application container",
        "`config(key, fallback?)` — read configuration",
        "`view(Component, props)` — render a view to a full HTML document",
      ] },
      { h: "Request" },
      { list: [
        "`json()` · `text()` · `html()` · `redirect()` — responses",
        "`param()` · `query()` · `header()` · `body()` — request input",
        "`request()` · `ctx()` — the raw Request / Hono context",
      ] },
      { code: 'index() {\n  return json({ app: config("app.name"), id: param("id") });\n}' },
    ],
  },

  errors: {
    title: "Errors & Exceptions",
    summary: "Throw an exception anywhere; the kernel renders the right response.",
    blocks: [
      { p: "Throw an `HttpException` (or a subclass) from a handler, middleware, or a service deep in the container — the HTTP kernel turns it into the right response. No try/catch in every controller." },
      { code: 'import { NotFoundException, HttpException } from "@shaferllc/keel/core";\n\nthrow new NotFoundException("Widget not found"); // 404\nthrow new HttpException(429, "Slow down");        // any status' },
      { h: "How it renders" },
      { list: [
        "Client accepts JSON → `{ error, status }`",
        "Client accepts HTML → a rendered error page",
        "`app.debug` on → full message + **stack trace**",
        "`app.debug` off → internals hidden for unexpected 500s",
        "Unmatched routes → a tidy automatic 404",
      ] },
      { h: "Customizing" },
      { p: "Override the whole thing from your HTTP kernel with `onError()`, or override the protected `renderException(err, c)` to change just the presentation." },
      { code: 'this.onError((err, c) => {\n  // report to your logging service, then render\n  return c.json({ oops: true }, 500);\n});' },
    ],
  },

  validation: {
    title: "Validation",
    summary: "Parse request input against a schema; invalid input becomes an automatic 422.",
    blocks: [
      { p: "`validate()` parses input and returns typed data. On failure it throws a `ValidationException` that the kernel renders as a 422 with per-field errors — no manual checking." },
      { p: "It's schema-agnostic: any [Zod](https://zod.dev)-style `safeParse` schema works, so the framework never bundles a validation library. Install Zod in your app:" },
      { code: "npm install zod" },
      { h: "Validating a body" },
      { p: "Call `validate(schema)` with no data and it parses the JSON body, fully typed from the schema:" },
      { code: 'import { json, validate } from "@shaferllc/keel/core";\nimport { z } from "zod";\n\nconst NewUser = z.object({\n  email: z.string().email(),\n  age: z.number().min(18),\n});\n\nasync store() {\n  const data = await validate(NewUser); // { email: string; age: number }\n  return json({ created: data.email }, 201);\n}' },
      { p: "Invalid input never reaches your logic:" },
      { code: '// POST /users  { "email": "nope", "age": 15 }\n{\n  "error": "The given data was invalid.",\n  "status": 422,\n  "errors": {\n    "email": ["Invalid email address"],\n    "age": ["Too small: expected number to be >=18"]\n  }\n}' },
      { h: "Validating other input" },
      { p: "Pass data explicitly to validate query strings, params, or anything else:" },
      { code: 'const { q, page } = validate(Search, request.query());' },
    ],
  },

  events: {
    title: "Events",
    summary: "A tiny event emitter for decoupling — fire in one place, handle in another.",
    blocks: [
      { p: "The emitter is a container singleton, reached through the global `emit()` / `listen()` helpers. `emit()` awaits every listener in order." },
      { code: 'listen("user.registered", (user) => {\n  sendWelcomeEmail(user);\n});\n\nawait emit("user.registered", user);' },
      { p: "Register listeners in a provider's `boot()` so they wire up once at startup. `listen()` returns an unsubscribe function." },
      { h: "The full API" },
      { code: 'events().once("boot", () => {});\nevents().off("tick", listener);\nevents().listenerCount("tick");\nevents().clear();' },
      { note: "Events are in-process. For durable or cross-process events, have a listener publish to your queue/broker." },
    ],
  },

  cache: {
    title: "Cache",
    summary: "A small cache with TTLs and the remember pattern — memory-backed, pluggable stores.",
    blocks: [
      { code: 'await cache().put("user:1", user);       // forever\nawait cache().put("otp", code, 300);     // expires in 300s\nawait cache().get("user:1", fallback);\nawait cache().has("otp");\nawait cache().pull("otp");                // get + forget' },
      { h: "remember" },
      { p: "Return the cached value, or compute it, cache it, and return it:" },
      { code: 'const stats = await cache().remember("stats", 60, async () => {\n  return computeExpensiveStats(); // runs only on a miss\n});' },
      { h: "Custom stores" },
      { p: "The default is in-memory (ephemeral, per-isolate). Implement `CacheStore` and bind your own `Cache` in a provider to persist to Redis/KV:" },
      { code: 'singleton(Cache, () => new Cache(new RedisStore()));' },
    ],
  },

  static: {
    title: "Static Files",
    summary: "serveStatic() serves files from a directory before your routes, with caching and dot-file safety.",
    blocks: [
      { p: "Add the middleware to your HTTP kernel. Files map directly to URLs (`./public/css/app.css` → `/css/app.css`), and requests fall through to your routes when no file matches." },
      { code: 'this.use(serveStatic());\nthis.use(serveStatic({ root: "./assets", maxAge: 86400, immutable: true }));' },
      { p: "Every response carries `ETag` + `Last-Modified` (with `304` support). Dot-files (`.env`, `.git`) are 404'd by default and path traversal is blocked." },
      { code: 'serveStatic({\n  dotFiles: "ignore",   // "deny" (403) | "allow"\n  headers: (path) => path.endsWith(".html") ? { "X-Frame-Options": "DENY" } : undefined,\n});' },
      { note: "serveStatic() reads the filesystem (node:fs, loaded dynamically) — it's for Node apps. On Workers, serve assets via the platform binding. In production, prefer a CDN/reverse proxy." },
    ],
  },

  inertia: {
    title: "Inertia",
    summary: "A server-side Inertia.js adapter — render page components without building an API.",
    blocks: [
      { p: "Pair Keel's routing with an Inertia client (React/Vue/Svelte) and render pages from the server. `inertia(\"Page\", props)` returns the right response automatically — full HTML on first load, the JSON page object on XHR navigations." },
      { h: "Configure it" },
      { p: "Bind an `Inertia` instance in a provider with a root view (the HTML shell) and an asset version:" },
      { code: 'singleton(Inertia, () => new Inertia({\n  version: "1",\n  rootView: (page) =>\n    `<!DOCTYPE html><div id="app" ` +\n    `data-page="${inertiaPageAttr(page)}"></div>` +\n    `<script src="/assets/app.js"></script>`,\n}));' },
      { h: "Render a page" },
      { code: 'show() {\n  return inertia("Users/Show", { user });\n}\n\n// or straight from a route\nrouter.on("/dashboard").renderInertia("Dashboard", { title });' },
      { h: "The protocol, handled for you" },
      { list: [
        "First visit → the full HTML document from your root view",
        "Inertia navigation (`X-Inertia`) → `{ component, props, url, version }` JSON",
        "Asset version changed → `409` + `X-Inertia-Location` (client hard-reloads)",
        "Partial reload → only the requested props",
      ] },
    ],
  },

  console: {
    title: "The Console",
    summary: "Run the server and generate code — the console lives in your app.",
    blocks: [
      { p: "Your app ships its own console at `bin/console.ts`, so it's yours to extend." },
      { code: "npm run keel routes                 # list routes\nnpm run keel serve --port 8080      # start the server\nnpm run keel make:controller Post   # -> app/Controllers/PostController.ts\nnpm run keel make:provider Billing  # -> app/Providers/BillingServiceProvider.ts\nnpm run keel make:middleware Auth   # -> app/Http/Middleware/authMiddleware.ts" },
      { p: "Generators refuse to overwrite an existing file. Because commands boot the application, they get the same container, config, and providers your HTTP requests do." },
    ],
  },

  architecture: {
    title: "Architecture",
    summary: "How the pieces fit — container, application, kernel, and the request lifecycle.",
    blocks: [
      { p: "Keel is small on purpose. The `Container` is the dependency registry; the `Application` is the container plus a lifecycle (load env + config, register/boot providers); the `HttpKernel` applies middleware and compiles routes onto Hono." },
      { h: "Boot sequence" },
      { list: [
        "`createApplication()` builds the `Application` and loads `.env` + `config/*.ts`",
        "Each provider's `register()` runs (bind only), then every `boot()` (wire up)",
        "The HTTP kernel applies global middleware and compiles the router onto Hono",
        "On Node, `@hono/node-server` serves it; on the edge, the Worker exports its fetch handler",
      ] },
      { h: "Request lifecycle" },
      { list: [
        "async-context storage captures the request so helpers (`json`, `param`, …) can reach it",
        "the container is bound to the context; global middleware runs in order",
        "the handler runs — a closure, a container-resolved controller, or a static response",
        "thrown errors and unmatched routes flow through the kernel's error renderer",
      ] },
      { note: "The whole framework core is a few hundred lines — open the source; there is no hidden magic." },
    ],
  },
};
