// Import Third-party Dependencies
import semver from "semver";

// Import Internal Dependencies
import { is } from "./is.js";

// CONSTANTS
const kNodeCoreModules = [
  "assert",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "https",
  "module",
  "net",
  "os",
  "path",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "sys",
  "timers",
  "tls",
  "tty",
  "url",
  "util",
  "vm",
  "zlib"
].flatMap((depName) => [depName, `node:${depName}`]);

const kVersionLockedModules = {
  freelist: {
    range: "<6.0.0"
  },
  v8: {
    range: ">=1.0.0"
  },
  process: {
    range: ">=1.1.0"
  },
  inspector: {
    range: ">=8.0.0"
  },
  async_hooks: {
    range: ">=8.1.0"
  },
  http2: {
    range: ">=8.4.0"
  },
  perf_hooks: {
    range: ">=8.5.0"
  },
  trace_events: {
    range: ">=10.0.0"
  },
  worker_threads: {
    range: ">=12.0.0",
    experimental: ">=10.5.0"
  },
  wasi: {
    range: null,
    experimental: ">=12.16.0"
  },
  diagnostics_channel: {
    range: null,
    experimental: "^14.17.0 || >=15.1.0"
  },
  "node:test": {
    prefixed: true,
    range: ">=18.0.0"
  }
};

/**
 * @description Get the list of Node.js core dependencies
 * @param {object} [options]
 * @param {string} [options.version="*"]
 * @param {boolean} [options.includeExperimental=true]
 * @returns {Set<string>}
 */
function builtins(options = {}) {
  const { version = "*", includeExperimental = true } = options;

  const builtins = new Set([...kNodeCoreModules]);

  for (const [name, dependency] of Object.entries(kVersionLockedModules)) {
    const isExperimental = typeof dependency.experimental === "string";
    if (isExperimental && !includeExperimental) {
      continue;
    }

    const range = isExperimental ?
      dependency.experimental :
      dependency.range;

    if (version === "*" || semver.satisfies(version, range)) {
      builtins.add(name);
      if (!dependency.prefixed) {
        builtins.add(`node:${name}`);
      }
    }
  }

  return builtins;
}

/**
 * @description Return the module (dependency) kind.
 * @param {!string} moduleName
 * @returns {"subpath" | "filesystem" | "builtins" | "thirdparty"}
 */
function kind(moduleName) {
  if (is.subpath(moduleName)) {
    return "subpath";
  }
  if (is.filesystem(moduleName)) {
    return "filesystem";
  }
  if (is.builtins(moduleName)) {
    return "builtins";
  }

  return "thirdparty";
}

export const get = Object.freeze({
  builtins,
  kind
});
