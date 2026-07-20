import type { Router } from "@shaferllc/keel/core";
import { SiteController } from "../Controllers/SiteController.js";
import { DocsController } from "../Controllers/DocsController.js";

export default function routes(router: Router): void {
  router.get("/", [SiteController, "home"]);
  router.get("/changelog", [SiteController, "changelog"]);
  router.get("/health", [SiteController, "health"]);
  router.get("/install.sh", [SiteController, "install"]);
  router.get("/install-mcp.sh", [SiteController, "install"]);
  router.get("/llms.txt", [SiteController, "llms"]);
  router.get("/llms-full.txt", [SiteController, "llmsFull"]);
  router.get("/robots.txt", [SiteController, "robots"]);
  router.get("/sitemap.xml", [SiteController, "sitemap"]);
  router.get("/docs", [DocsController, "index"]);
  router.get("/docs/:slug", [DocsController, "show"]);
}
