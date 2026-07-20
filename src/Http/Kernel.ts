import { HttpKernel, NotFoundException, config, view } from "@shaferllc/keel/core";
import type { Application } from "@shaferllc/keel/core";
import type { AppInfo } from "../config.js";
import { canonicalHost } from "./Middleware/canonicalHost.js";
import { poweredBy } from "./Middleware/poweredBy.js";
import { NotFoundPage } from "../views/notfound.js";

/** The site's HTTP kernel — global middleware lives here. */
export class Kernel extends HttpKernel {
  constructor(app: Application) {
    super(app);
    this.use(canonicalHost); // redirect www → apex before anything else
    this.use(poweredBy);

    // A designed 404 — everything else keeps the framework's default rendering.
    this.onError(async (err, c) => {
      if (err instanceof NotFoundException) {
        const html = await view(NotFoundPage, {
          app: config<AppInfo>("app"),
          path: new URL(c.req.url).pathname,
        });
        return c.html(html, 404);
      }
      return this.renderException(err, c);
    });
  }
}
