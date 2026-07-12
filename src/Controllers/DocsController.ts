import { view, param, config, NotFoundException } from "@shaferllc/keel/core";
import type { AppInfo } from "../config.js";
import { PAGES } from "../docs/generated.js";
import { DocsPage } from "../views/docs.js";

/** Serves the documentation, rendered by the framework it documents. */
export class DocsController {
  index() {
    return view(DocsPage, { slug: "getting-started", app: config<AppInfo>("app") });
  }

  show() {
    const slug = param("slug");
    if (!PAGES[slug]) {
      throw new NotFoundException(`No documentation page for "${slug}".`);
    }
    return view(DocsPage, { slug, app: config<AppInfo>("app") });
  }
}
