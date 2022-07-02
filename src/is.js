// Import Internal Dependencies
import { get } from "./get.js";

// CONSTANTS
const kBuiltinsModules = get.builtins();
const kSubModuleImportCharacter = "/";

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
  return kBuiltinsModules.has(
    moduleName.includes(kSubModuleImportCharacter) ?
      moduleName.split(kSubModuleImportCharacter)[0] :
      moduleName
  );
}

export const is = Object.freeze({
  builtins
});
