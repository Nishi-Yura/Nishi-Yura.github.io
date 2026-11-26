// 次のレポートのひな形を作る:  npm run new
// reports/N.json と public/deadlock-report/N/img/ を作る。中身は README.md の手順で埋める。
import { readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const ids = readdirSync(join(root, "reports")).map((f) => /^(\d+)\.json$/.exec(f)?.[1]).filter(Boolean).map(Number)
const id = Number(process.argv[2]) || Math.max(0, ...ids) + 1
const file = join(root, "reports", `${id}.json`)
if (existsSync(file)) {
  console.error(`reports/${id}.json はもうあります`)
  process.exit(1)
}

const team = (name) => ({ name, picks: ["", "", "", "", "", ""], bans: ["", "", ""], players: [["選手", "ヒーロー", 0, 0, 0, 0, 0, 0]] })
const tpl = {
  id,
  event: "Deadlock Night Shift #00",
  title: "Deadlock Night Shift #00 決勝",
  date: "2026-01-01",
  headline: "このレポートで一番伝えたい結論を1文で",
  series: [{ region: "EU", teams: ["チームA", "チームB"], score: [2, 0], note: "チームA が優勝" }],
  maps: [{
    id: "eu1", region: "EU", no: 1, winner: "チームA", firstPick: "チームA",
    duration: "00:00", matchId: 0, screenshot: "img/eu_m1.png", flow: "",
    teams: [team("チームA"), team("チームB")],
  }],
  heroNote: "",
  banNote: "",
  takeaways: [{ title: "", body: "" }],
  practice: [],
  sources: [{ label: "Deadlock API（マッチデータ）", url: "https://api.deadlock-api.com/" }],
}
writeFileSync(file, JSON.stringify(tpl, null, 2) + "\n")
mkdirSync(join(root, "public", "deadlock-report", String(id), "img"), { recursive: true })
console.log(`作成: reports/${id}.json と public/deadlock-report/${id}/img/`)
