import type { Ctx } from "keel/core";
import { config, view } from "keel/core";
import type { AppInfo } from "../config.js";
import { HomePage } from "../views/home.js";
import { ChangelogPage } from "../views/changelog.js";

/** Serves the Keel marketing site. */
export class SiteController {
  home(c: Ctx) {
    return view(HomePage, { app: config<AppInfo>("app") });
  }

  changelog(c: Ctx) {
    return view(ChangelogPage, { app: config<AppInfo>("app") });
  }

  /** A tiny JSON health endpoint, to show it's a real Keel app. */
  health(c: Ctx) {
    return c.json({
      ok: true,
      framework: "keel",
      version: config("app.version", "0.0.0"),
    });
  }
}
