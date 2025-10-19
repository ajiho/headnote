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

[English](./README.en.md) | 简体中文

## headnote是什么？

一个命令行工具，可以从 package.json 或自定义配置，快速生成文件横幅。

## 快速开始

**使用 npm 安装**

```bash
$ npm install -D headnote
```

**使用 Yarn 安装**

```bash
$ yarn add -D headnote
```

## 使用方法

> [!NOTE]
> 路径支持 Glob 模式

```bash
$ headnote dist/**/*.css
```

headnote 可以从 `.json`、`.js`、`.ts`、`.mjs`、`.mts`、 文件或你的 `package.json` 文件中读取配置。

- 若要使用自定义配置文件，请在命令行中指定它：

```bash
$ headnote dist/**/*.css --config headnote.config.mjs
```

`headnote.config.mjs` 配置示例：

```js
export default {
  banner: `/*
 * Awesome Project v1.0.0
 * Copyright 2023-2025 yourname
 * license MIT
 */`,
}
```

- 如果省略 `--config` 标志，headnote 会在你的 `package.json` 中查找 `headnote` 键的配置。如果没有找到该键,headnote默认从`package.json`读取数据生成横幅注释。

`package.json` 配置示例：

```json
{
  "name": "headnote",
  "version": "1.0.0",
  "homepage": "https://lujiahao.com",
  "license": "MIT",
  "author": "ajiho <lujiahao@88.com>"
}
```

会生成如下横幅注释：

```js
/*!
 * Headnote v1.0.0
 * https://lujiahao.com
 *
 * Copyright (c) 2025 ajiho <lujiahao@88.com>
 * Licensed under the MIT license
 */
```

## CLI 命令行

通过运行`npx headnote --help`获取帮助信息

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

## 许可证

[MIT](https://github.com/ajiho/headnote/blob/main/LICENSE)

Copyright (c) 2025-present, ajiho
