// Import Third-party Dependencies
import test from "tape";
import is from "@slimio/is";

// Import Internal Dependencies
import * as dependa from "../src/index.js";

// CONSTANTS
const kExperimentalModules = new Set(["wasi", "diagnostics_channel", "worker_threads"]);
const kBuiltinsFixedCount = 44;

test("get.builtins() returned value must be an ES6 Set", (tape) => {
  const builtins = dependa.get.builtins();
  tape.strictEqual(is.set(builtins), true, "builtins variable must be an ES6 Set");

  tape.end();
});

test("get.builtins() size", (tape) => {
  /**
   * - multiply * 2 for prefixed protocol 'node:'
   * - substract 1 for 'node:test'
   */
  const builtinsCount = (kBuiltinsFixedCount * 2) - 1;

  tape.strictEqual(dependa.get.builtins().size, builtinsCount);
  tape.strictEqual(
    dependa.get.builtins({ includeExperimental: false }).size,
    builtinsCount - (kExperimentalModules.size * 2)
  );

  tape.end();
});

test(`Given includeExperimental options equal false,
Then get.builtins() must return all core dependencies except experimental one`, (tape) => {
  const builtins = dependa.get.builtins({
    includeExperimental: false
  });

  const includeExperimental = [...builtins]
    .every((depName) => !kExperimentalModules.has(depName));

  tape.strictEqual(includeExperimental, true);
  tape.end();
});

test("Node.js version under <6.0.0 must include freelist", (tape) => {
  const builtinsOld = dependa.get.builtins({ version: "5.0.0" });
  const builtinsNew = dependa.get.builtins({ version: "7.0.0" });
  tape.true(builtinsOld.has("freelist"));
  tape.false(builtinsNew.has("freelist"));

  tape.end();
});

test("Node.js version under 1.0.0 must not include v8", (tape) => {
  const builtinsOld = dependa.get.builtins({ version: "0.10.0" });
  const builtinsNew = dependa.get.builtins({ version: "2.0.0" });
  tape.false(builtinsOld.has("v8"));
  tape.true(builtinsNew.has("v8"));

  tape.end();
});
