import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { glob } from "tinyglobby"

import type { HeadnoteOptions } from "./interfaces.js"
export type * from "./interfaces.js"

const DEFAULT: HeadnoteOptions = {
  banner: "",
  exclude: [],
  dryRun: false,
}
function defineConfig(config: HeadnoteOptions): HeadnoteOptions {
  return config
}
async function headnote(
  patterns: string | string[],
  options: HeadnoteOptions = {},
): Promise<void> {
  // 合并选项
  // eslint-disable-next-line prefer-const
  let { banner, exclude, dryRun } = { ...DEFAULT, ...(options ?? {}) }

  if (!banner) {
    banner = await getDefaultBanner()
  }

  const files = await glob(patterns, { ignore: exclude })

  for (const file of files) {
    const content = await readFile(file, "utf-8")

    // 避免重复插入
    if (content.startsWith(banner)) {
      console.warn(`skip: ${file}`)
      continue
    }

    const newContent = `${banner}\n${content}`

    if (dryRun) {
      console.warn(`[dry-run] ${file}`)
      continue
    }

    await writeFile(file, newContent, "utf-8")
    console.log(`update: ${file}`)
  }
}

async function getDefaultBanner() {
  try {
    const pkgPath = path.resolve(process.cwd(), "package.json")
    const pkgContent = await readFile(pkgPath, "utf-8")
    const pkg = JSON.parse(pkgContent)

    const name = pkg.name || "Unknown"
    const version = pkg.version || ""
    const homepage = pkg.homepage || ""
    const license = pkg.license || "UNLICENSED"
    const author = pkg.author || ""
    const year = new Date().getFullYear()

    return `/*!
 * ${name.charAt(0).toUpperCase() + name.slice(1)} v${version}
 * ${homepage}
 *
 * Copyright (c) ${year} ${author}
 * Licensed under the ${license} license
 */`
  } catch (err) {
    return "/* */"
  }
}

export { headnote, defineConfig }
