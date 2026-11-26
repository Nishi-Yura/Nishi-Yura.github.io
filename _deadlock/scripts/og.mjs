// SNS（Discord・X など）に URL を貼ったときのカード画像を作る。1200×630 の PNG。
//   public/deadlock-report/og.png      … 目次用
//   public/deadlock-report/N/og.png    … 各レポート用
// npm run build の中で自動で実行される。見た目は design/DESIGN.md の A 案に合わせている。
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const W = 1200
const H = 630
const C = { page: "#cfcfcb", panel: "#ffffff", cell: "#f1f1ef", ink: "#2b2b2b", mute: "#6b6b6b", line: "#e3e3e3", win: "#2b8a3e" }

// フォント。数字・英字は Barlow Semi Condensed（@fontsource）、和文は IBM Plex Sans JP の完全版（@ibm/plex-sans-jp）
const nm = (...p) => join(root, "node_modules", ...p)
const plex = (w) => readFileSync(nm("@ibm", "plex-sans-jp", "fonts", "complete", "woff", "hinted", `IBMPlexSansJP-${w}.woff`))
const fonts = [
  { name: "Barlow", weight: 700, style: "normal", data: readFileSync(nm("@fontsource", "barlow-semi-condensed", "files", "barlow-semi-condensed-latin-700-normal.woff")) },
  { name: "Plex", weight: 700, style: "normal", data: plex("Bold") },
  { name: "Plex", weight: 500, style: "normal", data: plex("Medium") },
]

// satori は React 要素の形のオブジェクトを受け取る
const h = (type, style, ...children) => ({ type, props: { style: { display: "flex", ...style }, children: children.flat().filter((c) => c !== null && c !== false) } })

async function render(tree, out) {
  const svg = await satori(tree, { width: W, height: H, fonts })
  const png = new Resvg(svg, { fitTo: { mode: "width", value: W } }).render().asPng()
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, png)
}

const M = 36
const PX = 52
const PY = 40
const frame = (...children) =>
  h("div", { width: W, height: H, background: C.page, fontFamily: "Plex", position: "relative" },
    // satori の width/height は padding を含まないので、その分を引く
    h("div", { position: "absolute", left: M, top: M, width: W - M * 2 - PX * 2, height: H - M * 2 - PY * 2, flexDirection: "column", background: C.panel, padding: `${PY}px ${PX}px` }, ...children))

const label = (text) => h("div", { fontSize: 22, fontWeight: 700, letterSpacing: 2, color: C.mute }, text)

function reportCard(r) {
  const many = r.series.length > 2
  const teamSize = many ? 40 : 52
  const scoreSize = many ? 56 : 76
  const series = r.series.map((s) => {
    const winA = s.score[0] > s.score[1]
    return h("div", { alignItems: "center", padding: many ? "6px 0" : "12px 0", borderTop: `2px solid ${C.line}` },
      h("div", { width: 70, fontSize: 22, fontWeight: 700, color: C.mute }, s.region),
      h("div", { flex: 1, justifyContent: "flex-end", fontFamily: "Barlow", fontSize: teamSize, fontWeight: 700, color: C.ink }, s.teams[0]),
      h("div", { width: 230, justifyContent: "center", fontFamily: "Barlow", fontSize: scoreSize, fontWeight: 700, color: C.ink },
        h("span", { color: winA ? C.win : C.ink }, String(s.score[0])),
        h("span", { color: "#b9b9b9", padding: "0 14px" }, ":"),
        h("span", { color: winA ? C.ink : C.win }, String(s.score[1]))),
      h("div", { flex: 1, fontFamily: "Barlow", fontSize: teamSize, fontWeight: 700, color: C.ink }, s.teams[1]),
      h("div", { width: 70 }))
  })
  return frame(
    h("div", { justifyContent: "space-between", alignItems: "baseline" },
      label(`DEADLOCK レポート #${r.id}`),
      h("div", { fontSize: 22, fontWeight: 500, color: C.mute }, r.date.replaceAll("-", "."))),
    h("div", { fontSize: 42, fontWeight: 700, color: C.ink, marginTop: 10, marginBottom: 18 }, r.title),
    h("div", { flexDirection: "column" }, ...series),
    h("div", { flex: 1 }),
    h("div", { background: C.cell, padding: "16px 22px", fontSize: 28, fontWeight: 500, color: C.ink, lineHeight: 1.4 }, r.headline),
  )
}

function indexCard(reports) {
  const latest = reports[0]
  return frame(
    label(`${reports.length} 本のレポート`),
    h("div", { fontFamily: "Barlow", fontSize: 96, fontWeight: 700, color: C.ink, marginTop: 18, lineHeight: 1 }, "Deadlock"),
    h("div", { fontSize: 64, fontWeight: 700, color: C.ink, marginTop: 6 }, "レポート"),
    h("div", { fontSize: 28, fontWeight: 500, color: C.mute, marginTop: 18 }, "大会の決勝を、ドラフトとマッチデータで振り返る"),
    h("div", { flex: 1 }),
    latest &&
      h("div", { background: C.cell, padding: "16px 22px", alignItems: "baseline" },
        h("div", { fontFamily: "Barlow", fontSize: 30, fontWeight: 700, color: C.mute, marginRight: 18 }, `#${latest.id}`),
        h("div", { fontSize: 22, fontWeight: 700, color: C.mute, marginRight: 14 }, "最新"),
        h("div", { fontSize: 26, fontWeight: 700, color: C.ink }, latest.event)),
  )
}

const reports = readdirSync(join(root, "reports"))
  .filter((f) => /^\d+\.json$/.test(f))
  .map((f) => JSON.parse(readFileSync(join(root, "reports", f), "utf8")))
  .sort((a, b) => b.id - a.id)

const pub = join(root, "public", "deadlock-report")
await render(indexCard(reports), join(pub, "og.png"))
for (const r of reports) await render(reportCard(r), join(pub, String(r.id), "og.png"))
console.log(`og: 目次 + レポート ${reports.length} 本`)
