import { useState, type ReactNode } from "react"
import { useReducedMotion } from "motion/react"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { heroImage, heroInitials } from "@/heroes"
import { cn } from "@/lib/utils"

/** サイト共通の上部バー */
export function SiteBar() {
  return (
    <header className="bg-ink text-panel">
      <nav className="mx-auto flex max-w-[760px] items-center gap-5 px-4 text-[12px]">
        <a href="/deadlock-report/" className="py-3.5 font-bold text-panel hover:no-underline hover:underline-offset-4 hover:[text-decoration-line:underline]">Deadlock レポート</a>
      </nav>
    </header>
  )
}

export function SiteFoot() {
  return (
    <footer className="mx-auto max-w-[760px] px-4 pt-2 pb-10 text-[11px] text-mute">
      <a href="/deadlock-report/" className="inline-block py-3">レポート一覧</a>
    </footer>
  )
}

/** 白いパネル。角丸・影・枠線なし（DESIGN.md） */
export function Panel({ className, children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <section className={cn("bg-panel", className)}>{children}</section>
    </Reveal>
  )
}

/** Magic UI BlurFade。動きを減らす設定のときは何もしない */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{children}</>
  return (
    <BlurFade inView inViewMargin="-20px" duration={0.3} offset={6} blur="2px" delay={delay}>
      {children}
    </BlurFade>
  )
}

/** Magic UI NumberTicker。動きを減らす設定のときは数字をそのまま出す */
export function Score({ value, className }: { value: number; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce || value === 0) return <span className={cn("tabular-nums", className)}>{value}</span>
  return <NumberTicker value={value} className={cn("tracking-normal text-inherit dark:text-inherit", className)} />
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("lab px-4 pt-3.5", className)}>{children}</h2>
}

/** ヒーローのアイコン。読み込めないときは頭文字 */
export function HeroIcon({ hero, size = 26, dim = false }: { hero: string; size?: number; dim?: boolean }) {
  const src = heroImage(hero)
  const [failed, setFailed] = useState(false)
  return (
    <Tooltip>
      <TooltipTrigger
        render={<span />}
        className={cn(
          "inline-grid shrink-0 place-items-center overflow-hidden bg-[#3a3a3a] text-[10px] font-bold text-white",
          dim && "opacity-45 grayscale"
        )}
        style={{ width: size, height: size }}
        aria-label={hero}
      >
        {src && !failed ? (
          <img src={src} alt="" width={size} height={size} loading="lazy" onError={() => setFailed(true)} className="size-full object-cover" />
        ) : (
          heroInitials(hero)
        )}
      </TooltipTrigger>
      <TooltipContent>{hero}</TooltipContent>
    </Tooltip>
  )
}
