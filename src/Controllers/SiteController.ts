import type { Ctx, Container } from "keel/core";
import { Application, View } from "keel/core";
import type { AppInfo } from "../config.js";
import { HomePage } from "../views/home.js";

/** Serves the Keel marketing site. Resolved from the container (DI). */
export class SiteController {
  constructor(private app: Container) {}

  home(c: Ctx) {
    const info = this.app.make(Application).config().get<AppInfo>("app");
    return this.app.make(View).render(HomePage({ app: info }));
  }

  /** A tiny JSON health endpoint, to show it's a real Keel app. */
  health(c: Ctx) {
    const version = this.app
      .make(Application)
      .config()
      .get("app.version", "0.0.0");
    return c.json({ ok: true, framework: "keel", version });
  }
}
