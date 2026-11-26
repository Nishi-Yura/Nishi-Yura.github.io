// dist/ の中身をサイトのリポジトリ直下にコピーする。
// 置き換えるのは deadlock-report/（中に N/）と deadlock-assets/ だけで、ほかのページには触らない。
import { readdirSync, rmSync, cpSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dist = join(root, "dist")
const site = join(root, "..")

const ok = /^(deadlock-report|deadlock-assets)$/
for (const name of readdirSync(dist)) {
  if (!ok.test(name)) {
    console.warn(`skip: ${name}`)
    continue
  }
  const dest = join(site, name)
  if (existsSync(dest)) rmSync(dest, { recursive: true })
  cpSync(join(dist, name), dest, { recursive: true })
  console.log(`copied: /${name}/`)
}
