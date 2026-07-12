import type { ConfigData } from "@shaferllc/keel/core";

import { KEEL_VERSION } from "./docs/generated.js";

export interface AppInfo {
  name: string;
  tagline: string;
  description: string;
  version: string;
  url: string;
  repo: string;
  docs: string;
  starter: string;
}

/**
 * Config is passed to the container inline (no filesystem on Workers).
 * Reachable as config('app.*').
 */
export const config: ConfigData = {
  app: {
    name: "Keel",
    tagline: "The house framework for Node.js.",
    description:
      "A real service container, service providers, expressive routing, JSX views, and a code-generating console — on a modern TypeScript stack that runs on Node and the edge.",
    // Whatever version the guides on this page were rendered from — not a number
    // someone has to remember to bump.
    version: KEEL_VERSION,
    url: "https://keeljs.com",
    repo: "https://github.com/shaferllc/keel",
    docs: "https://github.com/shaferllc/keel/tree/main/docs",
    starter: "https://github.com/shaferllc/keel-app",
  },
};
