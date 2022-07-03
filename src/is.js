// Import Internal Dependencies
import { get } from "./get.js";

// CONSTANTS
let kBuiltinsModules = null;

/**
 * @description Return true if the given module name is a core Node.js dependency
 * @param {!string} moduleName
 * @returns {boolean}
 *
 * @example
 * is.builtins("node:fs/promises"); // true
 * is.builtins("zlib"); // true
 * is.builtins("foobar"); // false
 */
function builtins(moduleName) {
  if (kBuiltinsModules === null) {
    kBuiltinsModules = get.builtins();
  }

  return kBuiltinsModules.has(
    moduleName.includes("/") ?
      moduleName.split("/")[0] :
      moduleName
  );
}

/**
 * @see https://nodejs.org/api/modules.html#all-together
 *
 * @description Return true if the given module name is a filesystem import
 * @param {!string} moduleName
 * @returns {boolean}
 *
 * @example
 * dependa.is.filesystem("/foobar"); // true
 * dependa.is.filesystem("../index.js"); // true
 * dependa.is.filesystem("./test.js"); // true
 */
function filesystem(moduleName) {
  return moduleName.startsWith("./") ||
    moduleName.startsWith("../") ||
    moduleName.startsWith("/");
}

/**
 * @see https://nodejs.org/api/packages.html#subpath-imports
 *
 * @description Return true if the given module name is a subpath import
 * @param {!string} moduleName
 * @returns {boolean}
 *
 * @example
 * dependa.is.subpath("#deps"); // true
 */
function subpath(moduleName) {
  return moduleName.charAt(0) === "#";
}

/**
 * @description Return true if the given module name is a third party dependency
 * @param {!string} moduleName
 * @returns {boolean}
 */
function thirdparty(moduleName) {
  return !subpath(moduleName) && !filesystem(moduleName) && !builtins(moduleName);
}

export const is = Object.freeze({
  builtins,
  filesystem,
  subpath,
  thirdparty
});
