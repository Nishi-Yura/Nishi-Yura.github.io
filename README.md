# Nishi-Yura Portfolio

西本ゆらの個人ポートフォリオサイト。<https://nishi-yura.github.io/>

HTML / CSS / JavaScript の静的サイトで、GitHub Pages 標準の Jekyll で配信しています。
ヘッダー・フッター・`<head>` などの共通部分は `_layouts` / `_includes` に 1 か所だけ書き、各ページは本文だけを持ちます。
レスポンシブ対応（スマホ・タブレット・PC）、`prefers-reduced-motion` に対応し、JS が無効でも本文が読めます。

## ファイル構成

```
.
├── index.html              # ABOUT（トップページ。プロフィール・イベント参加歴）
├── works.html              # WORKS（作品一覧）
├── contact.html            # CONTACT
├── project-revati.html     # 作品: REVATI
├── project-studio.html     # 作品: REVATI Studio
├── project-coaching.html   # 作品: 【NG×REV】OW2 Coaching
├── 404.html                # 存在しないURLのページ
├── _layouts/default.html   # 全ページ共通の骨組み（<head>・ヘッダー・フッター・OGP）
├── _includes/header.html   # ヘッダー（ナビゲーション）
├── _includes/footer.html   # フッター
├── css/style.css           # 全ページ共通のスタイル
├── js/main.js              # ヘッダー・フェードイン・ページ遷移・カーソル
├── images/                 # 画像・favicon・OGP・apple-touch-icon
├── sitemap.xml / robots.txt
├── _config.yml             # Jekyll 設定（サイト名・URL・プラグイン）
├── Gemfile                 # ローカルで Jekyll を動かす場合のみ使用
└── README.md
```

## 編集方法

公開は `main` ブランチへ push するだけです。GitHub Pages が Jekyll で自動ビルドします（反映まで 1〜2 分）。

### ページの書き方

各ページはファイル先頭の front matter（`---` で囲んだ部分）で設定を書き、その下に本文の HTML を書きます。

```html
---
layout: default
title: WORKS | 西本ゆら          # <title> と OGP のタイトル
description: ページの説明文        # meta description と OGP の説明
og_image: /images/ogp-revati.jpg  # SNS シェア画像（省略時は /images/ogp.jpg）
og_type: website                  # 省略時は article
body_class: page-contact          # ページ固有の CSS が必要なときだけ
noindex: true                     # 検索に載せたくないページだけ
---
<section class="section">
    ...本文...
</section>
```

リンクや画像のパスは `/works.html`、`/images/xxx.jpg` のようにスラッシュ始まりで書きます。

### ローカルでの確認

Jekyll がテンプレートを組み立てるため、HTML ファイルをブラウザで直接開いても共通部分は表示されません。
確認方法は次のどちらかです。

- Ruby がある場合: `bundle install` のあと `bundle exec jekyll serve` を実行し、<http://127.0.0.1:4000/> を開きます。
- Ruby がない場合: push 後に公開 URL で確認します。

### 実績の数字（stats）

各作品ページの概要には、次の形式で数字を表示しています。

```html
<div class="stats">
    <div class="stats__item"><span class="stats__num">約60<small>名</small></span><span class="stats__label">メンバー数</span></div>
</div>
```

### 画像の差し替え

1. `images/` に画像を置きます（目安: 横1920px以内。JPEG/PNGは圧縮してから）。
2. `<img src="/images/xxx.jpg" alt="説明" width="1920" height="1080">` のように、`alt` と実寸の `width` / `height` を必ず指定します。
3. SNS シェア用の画像は 1200×630px の JPEG を推奨します。サイト全体は `images/ogp.jpg`、作品ページは `images/ogp-xxx.jpg` を `og_image` で指定します。

### 作品（Project）の追加

1. 既存の作品ページ（例: `project-studio.html`）をコピーして `project-xxx.html` を作ります。
2. front matter の `title`・`description`・`og_image` と、ヒーロー画像・タイトル・カテゴリ・リンク・本文を書き換えます。
3. `works.html` の `.projects-grid` にある `<a class="project-card ...">` ブロックをコピーし、リンク先・画像・タイトル・カテゴリを変更します。
4. 「NEXT WORK」リンク（各作品ページ末尾の `.work-nav`）の巡回順を更新します。
5. `sitemap.xml` に新しい URL を追加します。

### 共通部分を変更するとき

- ナビゲーションの項目: `_includes/header.html`
- フッター: `_includes/footer.html`
- `<head>` の中身（フォント・OGP・favicon）: `_layouts/default.html`

## 補足

- 配色・余白・フォントは `css/style.css` にまとまっています。
- 旧 URL の `/about.html` はトップページへリダイレクトします（`index.html` の `redirect_from`）。
- 文字コードは UTF-8（BOMなし）です。
