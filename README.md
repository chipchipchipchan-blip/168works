# 168works

React / TypeScript / Vite で作成した、1ページの個人ポートフォリオです。GitHub Pages向けの設定と公開ワークフローを用意しています。公開・更新の手順と注意点は [GitHub Pages公開ガイド](DEPLOY_GITHUB_PAGES.md) を参照してください。

## パソコンで見る方法

1. Node.js の LTS 版をインストールします（https://nodejs.org/ja）。すでに入っていれば不要です。
2. VS Code でこの `D:\portfolio` フォルダを開きます。
3. 「ターミナル」→「新しいターミナル」で、次を1行ずつ実行します。

```powershell
npm.cmd install
npm.cmd run dev
```

表示された Local のURL（通常 `http://127.0.0.1:5173/168works/`）をブラウザで開きます。終了するときはターミナルで `Ctrl + C` を押します。スマートフォン幅はブラウザの開発者ツールのデバイス表示で確認できます。このサーバーはパソコン内だけで動き、インターネットには公開されません。

## 文章・作品・連絡先の変更

`src/data.ts` に変更する内容をまとめています。

- `profile`：サイト名、名前、紹介文、ツール。`photo` は空欄のとき仮イラストを表示します。
- `works`：作品一覧。配列の中の `{ ... }` をコピーして追加します。`id` は重複しない名前にしてください。
- `contacts`：メールやSNS。`url` が空欄ならボタンは押せません。メールは `mailto:自分のメールアドレス`、SNSは `https://...` を指定します。

画像は `public/images` に保存し、`image: '/images/sample.jpg'` や `photo: '/images/profile.jpg'` と書きます。仮画像はオリジナルのHTML/CSS/SVGです。猫には顔を描いていません。外部フォント・素材は使っていません。

現在の作品一覧は完成作品「推し活アプリ」1件です。画像・作品詳細は準備中で、詳細には編集用の仮テキストを明記しています。自己紹介・プロフィールのツールも編集用の仮データです。作品の項目や追加方法は [WORKS_GUIDE.md](WORKS_GUIDE.md) を参照してください。

## ビルド確認

```powershell
npm.cmd run build
npm.cmd run preview
```

ビルドは TypeScript の確認後、`dist` に表示用のファイルを作ります。`preview` はその結果をローカルで確認します。

## 実装内容

レスポンシブ表示、URLを持つ作品詳細ページ、スクロール表示、ボタンの色変化、動きを減らす設定への対応を実装しています。作品詳細では見出しにフォーカスが移り、一覧へ戻るリンクとブラウザの戻る操作を利用できます。

お問い合わせフォーム、メール送信、CMS、アクセス解析、公開作業は対象外です。作品のデモ画面は仮素材であり、別のアプリとして動くものではありません。

## 今回の確認結果

- 一時フォルダの Node.js 22.14.0 で依存パッケージをインストール済みです。システム全体へのNode.jsのインストールは行っていません。
- `npm run build` が成功し、TypeScriptチェックと本番用ファイルの生成が完了しました。
- 開発サーバーを起動し、トップページとReactモジュールがHTTP 200で返ることを確認しました。確認用サーバーは終了しています。
- 今回の公開準備では、ブラウザのPC幅（1440px）・スマートフォン幅（390px）で、ナビゲーション、作品詳細の直接アクセス・再読み込み、画像読み込み、拡大・切り替えを確認しました。実際のスマートフォン端末とキーボード操作全般は未確認です。

このパソコンですぐに起動したい場合は、VS CodeのPowerShellターミナルで、今回準備した一時環境を使う次のコマンドも利用できます。

```powershell
$env:PATH = "$env:TEMP/portfolio-runtime/node-v22.14.0-win-x64;" + $env:PATH
npm.cmd run dev
```

一時フォルダが削除された場合は、最初の手順に沿ってNode.jsをインストールしてください。

## 光と影のデザインを編集する

- `src/LightStudy.tsx`：HOMEとAbout共通の画像パス、小さな黄色い線画の花、Aboutの背景。
- `src/HomeScene.tsx`：HOMEの窓辺と白猫・黒猫。文章や作品データとは別のファイルです。
- `src/home.css`：HOMEの基本構図と猫のしっぽの動き。
- `src/editorial.css`：HOME・Works・Aboutの仕上げ調整。影の濃さは写真の `opacity`、余白は `padding` や `gap` で調整できます。
- `public/images/botanical-light-original.png`：内蔵画像生成ツールで作成したオリジナルの写真風素材。生成条件は同じフォルダの `ASSET-NOTES.md` に記録しています。

Aboutは植物の影の画像と指定SVGのお花を表示します。`profile.photo` を設定した場合の画像差し替え機能は維持しています。現在のWorksと作品詳細の見た目は `src/projects.css` で管理し、過去の仮作品カードは表示しません。
