// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import * as dependa from "../src/index.js";

test("Given a dependency prefixed with the Node.js protocol and a sub import then it should return true", (tape) => {
  tape.strictEqual(dependa.is.builtins("node:fs/promises"), true);
  tape.strictEqual(dependa.is.builtins("node:stream/promises"), true);
  tape.end();
});

test("Given a dependency prefixed with the Node.js protocol then it should return true", (tape) => {
  tape.strictEqual(dependa.is.builtins("node:test"), true);
  tape.strictEqual(dependa.is.builtins("node:fs"), true);
  tape.strictEqual(dependa.is.builtins("node:zlib"), true);
  tape.end();
});

test("Given the dependency 'test' with no Node.js protocol prefix then it should return false", (tape) => {
  tape.strictEqual(dependa.is.builtins("test"), false);
  tape.end();
});

test("Given Node.js dependencies with no prefix then it should return true", (tape) => {
  tape.strictEqual(dependa.is.builtins("fs"), true);
  tape.strictEqual(dependa.is.builtins("http"), true);
  tape.strictEqual(dependa.is.builtins("https"), true);
  tape.end();
});
