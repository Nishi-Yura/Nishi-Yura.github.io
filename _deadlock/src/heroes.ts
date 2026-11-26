// ヒーロー名 → アイコン画像（deadlock-api の画像バケット）
// 新しいヒーローが出たら、statlocker.gg/heroes の画像の URL を見て追加する。
const BASE = "https://assets-bucket.deadlock-api.com/assets-api-res/images/heroes/"

const FILES: Record<string, string> = {
  Abrams: "bull_mm.webp",
  Apollo: "fencer_mm.webp",
  Baba: "baba_mm.webp",
  Bebop: "bebop_mm.webp",
  Billy: "punkgoat_mm.webp",
  Calico: "nano_mm.webp",
  "Deadman Danny": "deadpack_mm.webp",
  Doorman: "doorman_mm.webp",
  "The Doorman": "doorman_mm.webp",
  Drifter: "drifter_mm.webp",
  Dynamo: "sumo_mm.webp",
  Graves: "necro_mm.webp",
  "Grey Talon": "archer_mm.webp",
  Haze: "haze_mm.webp",
  Holliday: "astro_card.png",
  Infernus: "inferno_mm.webp",
  Ivy: "tengu_mm.webp",
  Kelvin: "kelvin_mm.webp",
  "Lady Geist": "spectre_mm.webp",
  Lash: "lash_mm.webp",
  McGinnis: "engineer_mm.webp",
  Mina: "vampirebat_mm.webp",
  Mirage: "mirage_mm.webp",
  "Mo & Krill": "digger_mm.webp",
  "Nurse Harrow": "nurse_mm.webp",
  Paige: "bookworm_mm.webp",
  Paradox: "chrono_card.png",
  Pocket: "synth_card.png",
  "Rat King": "ratking_mm.webp",
  Rem: "familiar_mm.webp",
  Seven: "gigawatt_mm.webp",
  Shiv: "shiv_mm.webp",
  Silver: "werewolf_mm.webp",
  Sinclair: "magician_card.png",
  Solomon: "chessmaster_mm.webp",
  Venator: "priest_mm.webp",
  Victor: "frank_mm.webp",
  Vindicta: "hornet_mm.webp",
  Violet: "artist_mm.webp",
  Viscous: "viscous_mm.webp",
  Vyper: "kali_card.png",
  Warden: "warden_mm.webp",
  Wraith: "wraith_mm.webp",
  Yamato: "yamato_mm.webp",
}

export function heroImage(name: string): string | undefined {
  const f = FILES[name]
  return f ? BASE + f : undefined
}

export function heroInitials(name: string): string {
  const caps = name.replace(/[^A-Z]/g, "")
  return (caps.length >= 2 ? caps.slice(0, 2) : name.slice(0, 2)).toUpperCase()
}
