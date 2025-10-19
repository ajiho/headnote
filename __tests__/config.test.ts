import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import fs from "fs-extra"
import path from "node:path"
import { loadConfig } from "../src/config.js"
import { temporaryDirectory } from "tempy"

// 旧工作目录和临时目录
let oldCwd: string
let TMP_DIR: string

describe("loadConfig", () => {
  beforeEach(() => {
    oldCwd = process.cwd()
    TMP_DIR = temporaryDirectory({ prefix: "headnote-" })

    // 清空并创建缓存目录
    fs.emptyDirSync(TMP_DIR)
    process.chdir(TMP_DIR)
  })

  afterEach(() => {
    process.chdir(oldCwd) // 恢复工作目录
  })

  it("文件存在时从自定义路径加载配置", async () => {
    const filePath = path.join(TMP_DIR, "test.json")

    fs.outputJSONSync(filePath, { foo: "bar" })

    const result = await loadConfig(filePath)

    expect(result).toEqual({ foo: "bar" })
  })

  it("当自定义路径文件不存在时抛出错误", async () => {
    const filePath = path.join(TMP_DIR, "test.json")
    await expect(loadConfig(filePath)).rejects.toThrow(
      "No headnote configuration found.",
    )
  })

  it("通过搜索未找到配置文件时返回 {}", async () => {
    const result = await loadConfig()
    expect(result).toEqual({})
  })
})
