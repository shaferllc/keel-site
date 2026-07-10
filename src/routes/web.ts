import type { Router } from "keel/core";
import { SiteController } from "../Controllers/SiteController.js";

export default function routes(router: Router): void {
  router.get("/", [SiteController, "home"]);
  router.get("/health", [SiteController, "health"]);
}
