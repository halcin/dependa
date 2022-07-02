# Dependa
Identify and categorize Node.js dependencies (builtins, third parties..). The module and the code has been inspired by [builtins](https://github.com/juliangruber/builtins) and [builtin-modules](https://github.com/sindresorhus/builtin-modules).

## Features
- Several ways to use the API (**get** and **is**).
- First class support of Node.js protocol `node:`.
- Wider API not limited/restricted to Node.js core.

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/dependa
# or
$ yarn add @nodesecure/dependa
```

## Usage example

```js
import * as dependa from "@nodesecure/dependa";

console.log(dependa.is.builtins("node:fs/promises"));
console.log(dependa.is.builtins("stream"));

const builtins = dependa.get.builtins();
console.log(builtins);
```

## API

### is.builtins(moduleName: string): boolean
Return true if the given moduleName is a Node.js core dependency.

### get.builtins(options): Set< string >
Return an ES6 Set of all Node.js builtins (core dependency).

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT

