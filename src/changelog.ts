/** Release history, shown at /changelog. Newest first. */
export interface Release {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

export const RELEASES: Release[] = [
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
