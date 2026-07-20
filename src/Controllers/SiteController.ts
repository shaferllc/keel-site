import type { Ctx } from "@shaferllc/keel/core";
import { config, view } from "@shaferllc/keel/core";
import type { AppInfo } from "../config.js";
import { HomePage } from "../views/home.js";
import { ChangelogPage } from "../views/changelog.js";
import { INSTALL_SH } from "../docs/generated.js";

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

  /** `curl -fsSL https://keeljs.com/install.sh | bash` — MCP config installer. */
  install(c: Ctx) {
    c.header("Content-Type", "text/x-shellscript; charset=utf-8");
    c.header("Cache-Control", "public, max-age=300");
    c.header("Content-Disposition", 'inline; filename="install.sh"');
    return c.text(INSTALL_SH);
  }
}