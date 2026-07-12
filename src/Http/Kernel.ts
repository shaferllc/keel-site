import { HttpKernel } from "@shaferllc/keel/core";
import type { Application } from "@shaferllc/keel/core";
import { canonicalHost } from "./Middleware/canonicalHost.js";
import { poweredBy } from "./Middleware/poweredBy.js";

/** The site's HTTP kernel — global middleware lives here. */
export class Kernel extends HttpKernel {
  constructor(app: Application) {
    super(app);
    this.use(canonicalHost); // redirect www → apex before anything else
    this.use(poweredBy);
  }
}
