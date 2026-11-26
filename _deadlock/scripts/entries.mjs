// reports/*.json から、ビルドの入口になる HTML（entries/）を作り直す。
// npm run build の最初に自動で実行される。
import { readdirSync, readFileSync, mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const entries = join(root, "entries")
if (existsSync(entries)) rmSync(entries, { recursive: true })

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;")

const SITE = "https://nishi-yura.github.io"

const page = ({ title, ogTitle, description, report, depth, path, type }) => `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${path}">
<meta property="og:site_name" content="Deadlock レポート">
<meta property="og:type" content="${type}">
<meta property="og:locale" content="ja_JP">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:title" content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE}${path}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogTitle)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#2b2b2b">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@500;600;700&family=IBM+Plex+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
<div id="root"${report ? ` data-report="${report}"` : ""}></div>
<noscript>このページは JavaScript で表示しています。</noscript>
<script type="module" src="${"../".repeat(depth + 1)}src/main.tsx"></script>
</body>
</html>
`

const write = (dir, html) => {
  mkdirSync(join(entries, dir), { recursive: true })
  writeFileSync(join(entries, dir, "index.html"), html)
}

write("deadlock-report", page({
  title: "Deadlock レポート",
  ogTitle: "Deadlock レポート",
  path: "/deadlock-report/",
  type: "website",
  description: "Deadlock の大会の決勝を、ドラフトとマッチデータで振り返るレポートの一覧。",
  depth: 1,
}))

const files = readdirSync(join(root, "reports")).filter((f) => /^\d+\.json$/.test(f))
for (const f of files) {
  const r = JSON.parse(readFileSync(join(root, "reports", f), "utf8"))
  write(`deadlock-report/${r.id}`, page({
    title: `${r.title} | Deadlock レポート #${r.id}`,
    ogTitle: `${r.title}（レポート #${r.id}）`,
    path: `/deadlock-report/${r.id}/`,
    type: "article",
    description: r.headline,
    report: r.id,
    depth: 2,
  }))
}
console.log(`entries: 目次 + レポート ${files.length} 本`)
