import type { MiddlewareHandler } from "hono";

/** Adds an X-Powered-By header — because this site runs on Keel. */
export const poweredBy: MiddlewareHandler = async (c, next) => {
  await next();
  c.header("X-Powered-By", "Keel ⚓");
};
