# Nishi-Yura Portfolio

西本ゆらの個人ポートフォリオサイト。<https://nishi-yura.github.io/>

HTML / CSS / JavaScript のみで作られた静的サイトです（ビルド不要・GitHub Pages で配信）。
レスポンシブ対応（スマホ・タブレット・PC）、`prefers-reduced-motion` に対応しています。

## ファイル構成

```
.
├── index.html              # WORKS（作品一覧）
├── about.html              # ABOUT（プロフィール・イベント参加歴）
├── contact.html            # CONTACT
├── project-revati.html     # 作品: REVATI
├── project-studio.html     # 作品: REVATI Studio
├── project-coaching.html   # 作品: 【NG×REV】OW2 Coaching
├── 404.html                # 存在しないURLのページ
├── css/style.css           # 全ページ共通のスタイル
├── js/main.js              # ヘッダー・フェードイン・ページ遷移・カーソル
├── images/                 # 画像・favicon・OGP・apple-touch-icon
├── sitemap.xml / robots.txt
├── _config.yml / .nojekyll # GitHub Pages 設定（Jekyll を無効化）
└── README.md
```

## 編集方法

ファイルをテキストエディタ（VS Code など）で開いて編集し、ブラウザで更新（F5）すると反映されます。
公開は `main` ブランチへ push するだけです。

### テキストの変更

対象のHTMLを開き、文章を書き換えて保存します。

### 実績の数字（stats）

`about.html` と各作品ページの概要には、次の形式で数字を表示しています。

```html
<div class="stats">
    <div class="stats__item"><span class="stats__num">約60<small>名</small></span><span class="stats__label">メンバー数</span></div>
</div>
```

### 画像の差し替え

1. `images/` に画像を置きます（目安: 横1920px以内。JPEG/PNGは圧縮してから）。
2. `<img src="images/xxx.jpg" alt="説明" width="1920" height="1080">` のように、`alt` と実寸の `width` / `height` を必ず指定します。
3. SNSシェア用の画像は `images/ogp.jpg`（横長 約1.9:1）です。

### 作品（Project）の追加

1. 既存の作品ページ（例: `project-studio.html`）をコピーして `project-xxx.html` を作ります。
2. 次を書き換えます。
   - `<head>` 内の `<title>`、`description`、`canonical`、`og:*`、`twitter:*`
   - ヒーロー画像、タイトル、カテゴリ、リンク
   - `01. 概要` 以降の本文
3. `index.html` の `.projects-grid` にある `<a class="project-card ...">` ブロックをコピーし、リンク先・画像・タイトル・カテゴリを変更します。
4. 「NEXT WORK」リンク（各作品ページ末尾の `.work-nav`）の巡回順を更新します。
5. `sitemap.xml` に新しいURLを追加します。

### 共通部分を変更するとき

ヘッダー・フッターは各HTMLに直接書かれています。ナビゲーションなどを変更する場合は全HTMLを同じように編集してください。

## 補足

- 配色・余白・フォントは `css/style.css` にまとまっています。
- 文字コードは UTF-8（BOMなし）です。
