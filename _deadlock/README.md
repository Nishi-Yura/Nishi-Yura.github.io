# Deadlock レポートの作り方

`https://nishi-yura.github.io/deadlock-report/`（目次）と `/deadlock-report/N/`（各レポート）を作るためのフォルダです。
先頭が `_` なので、GitHub Pages（Jekyll）はこのフォルダを公開しません。ビルドした結果だけがサイト直下にコピーされます。

デザインの決まりは [design/DESIGN.md](design/DESIGN.md)。見た目を変えるときは、先にそちらを直してください。

---

## 1. 仕組み

```
_deadlock/
  reports/1.json            ← レポートの中身（ここだけ書けばページになる）
  public/deadlock-report/1/img/   ← そのレポートで使う画像（配信のドラフト画面など）
  src/                      ← 画面の部品（React + shadcn/ui + Magic UI）
  scripts/                  ← ビルド用のスクリプト
  design/                   ← DESIGN.md、参考サイトのスクショ、比較した3案
```

`npm run build` を実行すると：
1. `reports/*.json` を全部読んで、目次とレポートのページを作る
2. `../deadlock-report/`（中に `1/`、`2/` …）と `../deadlock-assets/` をサイト直下に書き出す（他のページには触らない）

あとは `git add` → `commit` → `push` で公開されます（反映まで1分ほど）。

旧 URL の `/deadlock-report-1/` は、`/deadlock-report/1/` へ転送するだけのページとしてサイト直下に残しています。

---

## 2. 新しいレポートを作る手順

### 準備（初回だけ）
学校のネットワークでは npm にプロキシが必要です（`HTTPS_PROXY` が設定されていれば自動で使われます）。

```powershell
cd "$env:USERPROFILE\OneDrive\デスクトップ\github\Nishi-Yura.github.io\_deadlock"
npm install
```

### ① ひな形を作る
```powershell
npm run new
```
`reports/N.json` と `public/deadlock-report/N/img/` ができます（N は自動で次の番号）。

### ② 材料を集める
| 欲しいもの | 取る場所 |
|---|---|
| 大会名・日付・シリーズのスコア・試合の流れ | EDL.GG の大会ニュースとシリーズのページ |
| 各マップのマッチ ID | EDL.GG のシリーズのページ |
| スコアボード（K/D/A・ソウル・ダメージ・回復）、試合時間 | マッチ ID から Deadlock API（api.deadlock-api.com）のマッチ情報 |
| ピック順・BAN | 配信アーカイブ（YouTube）のドラフト画面。スクショを `img/` に保存 |

### ③ `reports/N.json` を埋める
`reports/1.json` が完成例です。項目の意味は `src/types.ts` に書いてあります。

- **`headline`**：このレポートで一番言いたいことを1文で。目次にもそのまま出ます。
- **`maps[].teams[0]`**：先行ピックのチームを先に書く。`picks` はピック順。
- **`players`**：`[選手名, ヒーロー, キル, デス, アシスト, ソウル, ダメージ, 回復]` の順。
- **ヒーロー名**は `src/heroes.ts` にある綴りで書く（アイコンがそこから出ます）。新ヒーローが増えたら `src/heroes.ts` に1行足す。
- キル数・シリーズのキル合計・ヒーロー別の勝敗・BAN の集計は**自動で計算**されます。手で書かない。
- **`takeaways`**：3〜5個。「何が起きたか」の事実と、自分の試合で何をするかをセットで。

### ④ 確認する
```powershell
npm run dev
```
表示された URL の `/deadlock-report/N/` を開いて確認します。スマホ幅（375px）でも見る。

### ⑤ 公開する
```powershell
npm run build
cd ..
git add _deadlock deadlock-report deadlock-assets
git commit -m "Add Deadlock report N"
git push
```

---

## 3. 書き方の決まり（前回「AI っぽい」と判断したものを避ける）

- 「このページに載せていないこと」のような予防線の節は作らない。
- 各セクションに言い訳の注意書きを付けない。サンプルが少ないなど本当に必要なことだけ `heroNote` に1回書く。
- 色の凡例で説明しない。勝ちは緑、負けは赤、で読めるようにする。
- 数字を盛らない。データにないことは書かない。
- 当たり前のことは書かない（例：「BAN は使われると困るヒーローを消す手」）。そのレポートのデータからしか言えないことだけを持ち帰りにする。言えることがなければ数を減らす。

## 4. 使っている部品

- **shadcn/ui**：Tabs（マップ切り替え）、Table（スコアボード）、Tooltip（ヒーロー名）、Separator。色と角丸は `src/index.css` で DESIGN.md の値に作り直してある。
- **Magic UI**：NumberTicker（シリーズのスコア）、BlurFade（パネルの出現）。`src/components/magicui/` にソースをそのまま置いている。端末で「視差効果を減らす」が有効なら動かない。
- フォント：Barlow Semi Condensed（数字・チーム名）、IBM Plex Sans JP（本文）。Inter は使わない。
