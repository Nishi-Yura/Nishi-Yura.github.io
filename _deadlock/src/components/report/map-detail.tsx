import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { HeroIcon, Label, Panel } from "./parts"
import { fmt, kills, mapLabel, winnerFirst } from "@/lib/report"
import type { MapData, MapTeam, PlayerRow } from "@/types"
import { cn } from "@/lib/utils"

export function MapDetail({ map, base }: { map: MapData; base: string }) {
  const [k0, k1] = kills(map)
  const [w, l] = winnerFirst(map)
  const wk = w === map.teams[0] ? k0 : k1
  const lk = w === map.teams[0] ? k1 : k0
  const all = map.teams.flatMap((t) => t.players)
  const max = (i: number) => Math.max(...all.map((p) => p[i] as number))
  const best = { k: max(2), d: max(3), dmg: max(6), heal: max(7) }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <Panel>
          <Label>ドラフト（ピック順）</Label>
          <Draft map={map} />
        </Panel>
        <Panel>
          <Label>マップ情報</Label>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-4 pt-2.5 pb-4">
            <dt className="text-mute">勝ち</dt>
            <dd className="font-bold text-win">{map.winner}</dd>
            <dt className="text-mute">時間</dt>
            <dd className="num">{map.duration}</dd>
            <dt className="text-mute">キル</dt>
            <dd className="num">{wk} - {lk}</dd>
            <dt className="text-mute">先行ピック</dt>
            <dd>{map.firstPick}</dd>
            <dt className="text-mute">マッチ ID</dt>
            <dd className="num">{map.matchId}</dd>
          </dl>
          {map.flow && (
            <>
              <Separator />
              <p className="px-4 py-3 text-mute">{map.flow}</p>
            </>
          )}
        </Panel>
      </div>

      <Panel>
        <Scoreboard team={w} result="勝ち" best={best} />
        <Scoreboard team={l} result="負け" best={best} last />
      </Panel>

      {map.screenshot && (
        <Panel>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 hover:bg-cellhover [&::-webkit-details-marker]:hidden">
              <span className="lab">配信画面のドラフト</span>
              <span className="text-[12px] text-link group-open:hidden">開く</span>
              <span className="hidden text-[12px] text-link group-open:inline">閉じる</span>
            </summary>
            <div className="px-4 pb-4">
              <img src={base + map.screenshot} alt={`${mapLabel(map)} のドラフト画面`} loading="lazy" className="block h-auto w-full" />
              {map.screenshotNote && <p className="mt-1.5 text-[12px] text-mute">{map.screenshotNote}</p>}
            </div>
          </details>
        </Panel>
      )}
    </div>
  )
}

function Draft({ map }: { map: MapData }) {
  const [a, b] = map.teams
  const head = (t: MapTeam, first: boolean) => (
    <div className="flex items-baseline justify-between gap-2 pb-1.5">
      <span className="font-num text-[16px] font-semibold">{t.name}</span>
      <span className={cn("text-[11px] font-bold", t.name === map.winner ? "text-win" : "text-lose")}>
        {t.name === map.winner ? "勝ち" : "負け"}
        {first && <span className="font-normal text-mute">・先行</span>}
      </span>
    </div>
  )
  return (
    <div className="grid grid-cols-2 gap-x-4 px-4 pt-2.5 pb-4">
      {head(a, true)}
      {head(b, false)}
      {a.picks.map((h, i) => (
        <PickRow key={"a" + i} n={i + 1} hero={h} />
      )).flatMap((el, i) => [el, <PickRow key={"b" + i} n={i + 1} hero={b.picks[i]} />])}
      <BanRow bans={a.bans} />
      <BanRow bans={b.bans} />
    </div>
  )
}

function PickRow({ n, hero }: { n: number; hero: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2 py-[3px]">
      <span className="num w-3 shrink-0 text-right text-[11px] text-mute">{n}</span>
      <HeroIcon hero={hero} />
      <span className="truncate">{hero}</span>
    </div>
  )
}

function BanRow({ bans }: { bans: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-line pt-2">
      <span className="mr-1 text-[11px] font-bold text-mute">BAN</span>
      {bans.map((h) => (
        <HeroIcon key={h} hero={h} size={22} dim />
      ))}
    </div>
  )
}

type Best = { k: number; d: number; dmg: number; heal: number }

function Scoreboard({ team, result, best, last }: { team: MapTeam; result: string; best: Best; last?: boolean }) {
  const win = result === "勝ち"
  return (
    <div className={cn("px-4 pt-3", last && "pb-3")}>
      <div className="flex items-baseline justify-between">
        <h3 className="font-num text-[17px] font-semibold">{team.name}</h3>
        <span className={cn("text-[11px] font-bold", win ? "text-win" : "text-lose")}>{result}</span>
      </div>
      <Table className="mt-1 min-w-[480px] table-fixed border-separate border-spacing-[3px] text-[13px]">
        <colgroup>
          <col className="w-[34%]" />
          <col className="w-[17%]" />
          <col className="w-[16%]" />
          <col className="w-[17%]" />
          <col className="w-[15%]" />
        </colgroup>
        <TableHeader className="[&_tr]:border-0">
          <TableRow className="hover:bg-transparent">
            <TableHead className="sticky left-0 z-10 h-7 bg-panel px-0 text-[11px] font-semibold text-mute">選手</TableHead>
            <TableHead className="h-7 text-center text-[11px] font-semibold text-mute">K / D / A</TableHead>
            <TableHead className="h-7 text-center text-[11px] font-semibold text-mute">ソウル</TableHead>
            <TableHead className="h-7 text-center text-[11px] font-semibold text-mute">ダメージ</TableHead>
            <TableHead className="h-7 text-center text-[11px] font-semibold text-mute">回復</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {team.players.map((p) => (
            <PlayerLine key={p[0]} p={p} best={best} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function PlayerLine({ p, best }: { p: PlayerRow; best: Best }) {
  const [name, hero, k, d, a, souls, dmg, heal] = p
  const cell = "bg-cell px-1.5 py-1.5 text-center num"
  const hi = "bg-hi font-bold text-win"
  return (
    <TableRow className="border-0 hover:bg-transparent [&:hover>td]:brightness-[.97] dark:[&:hover>td]:brightness-110">
      <TableCell className="sticky left-0 z-10 bg-panel px-0 py-1">
        <span className="flex min-w-0 items-center gap-2">
          <HeroIcon hero={hero} />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-semibold text-link">{name}</span>
            <span className="block truncate text-[11px] text-mute">{hero}</span>
          </span>
        </span>
      </TableCell>
      <TableCell className={cell}>
        <span className={cn(k === best.k && "font-bold text-win")}>{k}</span>
        <span className="text-mute"> / </span>
        <span className={cn(d === best.d && "font-bold text-lose")}>{d}</span>
        <span className="text-mute"> / </span>
        {a}
      </TableCell>
      <TableCell className={cell}>{fmt(souls)}</TableCell>
      <TableCell className={cn(cell, dmg === best.dmg && hi)}>{fmt(dmg)}</TableCell>
      <TableCell className={cn(cell, heal === best.heal && hi)}>{fmt(heal)}</TableCell>
    </TableRow>
  )
}
