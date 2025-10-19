import { resolve } from "node:path"
import { lilconfig } from "lilconfig"
import { access, constants } from "node:fs/promises"

const CONFIG_NAME = "headnote"
const explorer = lilconfig(CONFIG_NAME)

async function loadConfig(customPath?: string) {
  let result
  if (customPath) {
    // 传递了config选项
    const filepath = resolve(process.cwd(), customPath)

    // 检查该文件是否存在
    const exists = await fileExists(filepath)

    if (!exists) {
      throw new Error(`No ${CONFIG_NAME} configuration found.`)
    }
    result = await explorer.load(filepath)
  } else {
    result = await explorer.search()
  }

  return result?.config || {}
}

async function fileExists(filePath: string) {
  try {
    await access(filePath, constants.F_OK)
    return true
  } catch {
    return false
  }
}

export { loadConfig }
