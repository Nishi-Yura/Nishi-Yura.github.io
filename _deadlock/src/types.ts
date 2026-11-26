// reports/N.json の形。新しいレポートはこの形で書く（README.md 参照）

/** [選手名, ヒーロー, キル, デス, アシスト, ソウル, ダメージ, 回復] */
export type PlayerRow = [string, string, number, number, number, number, number, number]

export interface MapTeam {
  name: string
  /** ピック順 */
  picks: string[]
  bans: string[]
  players: PlayerRow[]
}

export interface MapData {
  id: string
  region: string
  no: number
  winner: string
  firstPick: string
  /** "36:32" */
  duration: string
  matchId: number
  /** public/deadlock-report-N/ からの相対パス */
  screenshot?: string
  screenshotNote?: string
  flow?: string
  /** teams[0] が先行ピックのチーム */
  teams: [MapTeam, MapTeam]
}

export interface Series {
  region: string
  teams: [string, string]
  score: [number, number]
  note?: string
}

export interface Report {
  id: number
  event: string
  title: string
  /** "2026-11-18" */
  date: string
  headline: string
  series: Series[]
  maps: MapData[]
  heroNote?: string
  banNote?: string
  takeaways: { title: string; body: string }[]
  practice?: string[]
  sources: { label: string; url: string }[]
}
