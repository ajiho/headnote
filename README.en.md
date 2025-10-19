# headnote

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://www.lujiahao.com/sponsor)
[![npm](https://img.shields.io/npm/v/headnote)](https://www.npmjs.com/package/headnote)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![cdn version](https://data.jsdelivr.com/v1/package/npm/headnote/badge)](https://www.jsdelivr.com/package/npm/headnote)
[![codecov](https://codecov.io/gh/ajiho/headnote/graph/badge.svg?token=G2P1AI238H)](https://codecov.io/gh/ajiho/headnote)
[![Test](https://img.shields.io/github/actions/workflow/status/ajiho/headnote/test.yml?label=Test&logo=github&style=flat-square&branch=main)](https://github.com/ajiho/headnote/actions/workflows/test.yml)
[![Node](https://img.shields.io/node/v/headnote.svg)](https://nodejs.org/en/about/previous-releases)
[![Vitest](https://img.shields.io/badge/tested%20with-vitest-fcc72b.svg?logo=vitest)](https://vitest.dev/)
[![npm bundle size](https://deno.bundlejs.com/badge?q=headnote)](https://bundlejs.com/?q=headnote)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

English | [简体中文](./README.md)

## What is headnote?

A command-line tool that quickly generates file banners based on package.json or custom configurations.

## Quick Start

**Install using npm**

```bash
$ npm install -D headnote
```

**Install using Yarn**

```bash
$ yarn add -D headnote
```

## Usage

> [!NOTE]
> Paths support Glob patterns.

```bash
$ headnote dist/**/*.css
```

headnote can read configurations from `.json`, `.js`, `.ts`, `.mjs`, `.mts` files, or from the `headnote` key in your `package.json` file.

- To use a custom configuration file, specify it via the command line:

```bash
$ headnote dist/**/*.css --config headnote.config.mjs
```

Example `headnote.config.mjs` configuration:

```js
export default {
  banner: `/*
 * Awesome Project v1.0.0
 * Copyright 2023-2025 yourname
 * license MIT
 */`,
}
```

- If the `--config` flag is omitted, headnote will look for configuration under the `headnote` key in your `package.json`. If this key is not found, headnote will by default read data from `package.json` to generate the banner comment.

Example `package.json` configuration:

```json
{
  "name": "headnote",
  "version": "1.0.0",
  "homepage": "https://lujiahao.com",
  "license": "MIT",
  "author": "ajiho <lujiahao@88.com>"
}
```

This will generate the following banner comment:

```js
/*!
 * Headnote v1.0.0
 * https://lujiahao.com
 *
 * Copyright (c) 2025 ajiho <lujiahao@88.com>
 * Licensed under the MIT license
 */
```

## CLI

Run `npx headnote --help` for help information.

```bash
Usage: headnote [options] <files...>

Prepend banner headers to files.

Arguments:
  files                    Files or glob patterns

Options:
  -V, --version            output the version number
  -c, --config <path>      Path to config file
  --exclude <patterns...>  Exclude files or directories (supports glob)
  --dry-run                Print actions without writing files
  -h, --help               display help for command

Examples:
  # Prepend banner to all JS files in src/
  $ headnote "src/**/*.js"

  # Load custom config file
  $ headnote "src/**/*.js" --config headnote.config.mjs
```

## License

[MIT](https://github.com/ajiho/headnote/blob/main/LICENSE)

Copyright (c) 2025-present, ajiho
