#!/usr/bin/env node
import { Command } from "commander"
import { loadConfig } from "./config.js"
import { headnote } from "./index.js"
import pkg from "../package.json" with { type: "json" }

const program = new Command()

program
  .name("headnote")
  .version(pkg.version)
  .description("Prepend banner headers to files.")
  .option("-c, --config <path>", "Path to config file")
  .option(
    "--exclude <patterns...>",
    "Exclude files or directories (supports glob)",
  )
  .option("--dry-run", "Print actions without writing files")
  .argument("<files...>", "Files or glob patterns")
  .addHelpText(
    "afterAll",
    `
Examples:
  # Prepend banner to all JS files in src/
  $ headnote "src/**/*.js"

  # Load custom config file
  $ headnote "src/**/*.js" --config headnote.config.mjs
`,
  )
  .parse(process.argv)

const opts = program.opts()
const files = program.args

try {
  const config = await loadConfig(opts.config)
  await headnote(files, {
    ...config,
    ...opts,
  })
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
