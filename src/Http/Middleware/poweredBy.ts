import type { MiddlewareHandler } from "hono";

/** Adds an X-Powered-By header — because this site runs on Keel. */
export const poweredBy: MiddlewareHandler = async (c, next) => {
  await next();
  // ASCII only — header values with non-ASCII bytes throw in browser fetch.
  c.header("X-Powered-By", "Keel");
};
