import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from "vitest"
import fs from "fs-extra"
import path from "node:path"
import { headnote, defineConfig } from "../src"
import { temporaryDirectory } from "tempy"
import escapeStringRegexp from "escape-string-regexp"

let oldCwd: string
let TMP_DIR: string

describe("headnote", () => {
  let filePath: string
  let banner: string

  beforeAll(() => {
    oldCwd = process.cwd()
  })

  beforeEach(() => {
    TMP_DIR = temporaryDirectory()
    fs.ensureDirSync(TMP_DIR)
    process.chdir(TMP_DIR)

    filePath = path.join(TMP_DIR, "test.js")

    banner = "/* my banner */"
  })

  afterEach(() => {
    process.chdir(oldCwd)
    fs.removeSync(TMP_DIR)
  })

  it("应该给文件添加横幅", async () => {
    fs.outputFileSync(filePath, "console.log('hi')\n", "utf-8")

    const patterns = "test.js"

    await headnote(patterns, { banner })
    const content = fs.readFileSync(patterns, "utf-8")

    expect(content.startsWith(banner)).toBe(true)
  })

  it("应该原样返回传入的配置对象", () => {
    const input = { banner: "/* test */", exclude: ["dist"], dryRun: true }
    const result = defineConfig(input)
    expect(result).toBe(input) // 同一个引用对象
    expect(result).toEqual(input)
  })

  it("应该跳过已经设置过横幅的文件", async () => {
    fs.outputFileSync(filePath, `${banner}\nconsole.log('hi')\n`, "utf-8")

    const patterns = "test.js"
    await headnote(patterns, { banner })
    const content = fs.readFileSync(filePath, "utf-8")

    console.log(content)

    const matches =
      content.match(new RegExp(escapeStringRegexp(banner), "g")) || []

    expect(matches.length === 1).toBe(true)
  })

  it("如果没有提供banner, 如果package.json存在则从中选择字段生成横幅", async () => {
    const pkgJson = {
      name: "my-lib",
      version: "1.2.3",
      homepage: "https://example.com",
      license: "MIT",
      author: "tester",
    }

    fs.outputJSONSync("package.json", pkgJson, { spaces: 2 })
    fs.outputFileSync(filePath, "console.log('hi')\n", "utf-8")

    const patterns = "test.js"
    await headnote(patterns, {})
    const content = fs.readFileSync(filePath, "utf-8")

    expect(content.includes(`My-lib v1.2.3`)).toBe(true)
    expect(content.includes("https://example.com")).toBe(true)
  })

  it("如果没有提供banner, 如果package.json存在但是需要的字段不存在", async () => {
    const pkgJson = { type: "module" }
    fs.outputJSONSync("package.json", pkgJson, { spaces: 2 })
    fs.outputFileSync(filePath, "console.log('hi2')\n", "utf-8")

    const patterns = "test.js"
    await headnote(patterns, {})
    const content = fs.readFileSync(filePath, "utf-8")

    expect(content).toMatchSnapshot()
  })

  it("如果没有提供banner, 如果package.json不存在返回空注释", async () => {
    fs.outputFileSync(filePath, "console.log('hi')\n", "utf-8")
    const patterns = "test.js"
    await headnote(patterns, {})
    const content = fs.readFileSync(filePath, "utf-8")

    expect(content.includes("/* */")).toBe(true)
  })

  it("dryRun为true时不应写入文件", async () => {
    const fileCnt = "console.log('hi')\n"
    fs.outputFileSync(filePath, fileCnt, "utf-8")
    const patterns = "test.js"
    await headnote(patterns, { banner, dryRun: true })
    const finalContent = fs.readFileSync(filePath, "utf-8")

    expect(finalContent).toBe(fileCnt)
  })

  it("在传入 null 时应使用默认配置", async () => {
    const fn = async () => {
      // @ts-expect-error 故意传入错误的选项
      await headnote([], null)
    }

    await expect(fn()).resolves.not.toThrow()
  })
})
