import type { MiddlewareHandler } from "hono";

/**
 * Redirect www.keeljs.com → keeljs.com (301) so there is a single canonical
 * host. Any other host (the apex, the workers.dev fallback, localhost) passes
 * through untouched.
 */
export const canonicalHost: MiddlewareHandler = async (c, next) => {
  if ((c.req.header("host") ?? "").toLowerCase() === "www.keeljs.com") {
    const url = new URL(c.req.url);
    url.host = "keeljs.com";
    return c.redirect(url.toString(), 301);
  }
  await next();
};
