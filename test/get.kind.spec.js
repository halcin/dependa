// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import * as dependa from "../src/index.js";

test("Given a Node.js core dependency as argument then get.kind() must return the 'builtins' kind", (tape) => {
  tape.strictEqual(dependa.get.kind("fs"), "builtins");
  tape.strictEqual(dependa.get.kind("node:fs/promises"), "builtins");
  tape.strictEqual(dependa.get.kind("http"), "builtins");
  tape.end();
});

test("Given a Subpath import as argument then get.kind() must return the 'subpath' kind", (tape) => {
  tape.strictEqual(dependa.get.kind("#deps"), "subpath");
  tape.end();
});

test("Given a Filesystem location as argument then get.kind() must return the 'filesystem' kind", (tape) => {
  tape.strictEqual(dependa.get.kind("./file.js"), "filesystem");
  tape.strictEqual(dependa.get.kind("../"), "filesystem");
  tape.strictEqual(dependa.get.kind("/location"), "filesystem");
  tape.end();
});

test(`Given a string that is not a subpath or filesystem or builtins
then get.kind() must return the 'thirdparty' kind`, (tape) => {
  tape.strictEqual(dependa.get.kind("foobar"), "thirdparty");
  tape.end();
});
