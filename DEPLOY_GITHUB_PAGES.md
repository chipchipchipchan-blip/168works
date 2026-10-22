# 168works の GitHub Pages 公開ガイド

168worksのGitHub Pages公開設定と、公開・更新の手順をまとめています。

## 公開範囲と検索について

- GitHub FreeでPagesを使う場合、`168works` リポジトリは **Public（公開）** にします。サイトだけでなく、アップロードしたソース・画像・資料・Gitの履歴も誰でも閲覧できます。
- サイトのURLは `https://＜GitHubユーザー名＞.github.io/168works/` です。共有した相手から別の人にURLが伝わる場合もあります。パスワードや閲覧者制限はありません。
- `index.html` に `noindex, nofollow, noimageindex` を追加しています。HOME、WORKS、ABOUT、CONTACT、作品詳細は同じHTMLを使うため、すべてに適用されます。これらの指示に従わない検索エンジンや、画像URLを直接発見する経路まで完全に防ぐものではありません。
- `noindex` を読み取れるよう、`robots.txt` でクロールを禁止していません。検索エンジンへのサイトマップ送信も不要です。

参考：[GitHub Pagesの利用条件](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、[Googleのnoindexの説明](https://developers.google.com/search/docs/crawling-indexing/block-indexing)。

## 今回準備した設定

| ファイル | 役割 |
| --- | --- |
| `vite.config.ts` | 公開先を `base: '/168works/'` に指定。ViteがビルドするCSS・JavaScriptもこのパスになります。 |
| `src/assetUrl.ts` | `public` 内の画像パスに公開先を付加。外部URLはそのまま使います。 |
| `src/vite-env.d.ts` | Viteの `import.meta.env.BASE_URL` の型定義を読み込みます。 |
| `src/main.tsx`、`src/HomeScene.tsx`、`src/LightStudy.tsx`、`src/Projects.tsx` | プロフィール、HOME、ABOUT、CONTACT、作品カード・詳細・拡大表示の画像に共通のパス処理を適用。 |
| `index.html` | 検索結果への掲載を抑えるmetaタグを追加。 |
| `package.json`、`scripts/prepare-pages.mjs` | ビルド後、画像フォルダの制作メモ（Markdown）と `.gitkeep` を `dist` から除外。元のメモ・画像は保持。 |
| `.github/workflows/deploy.yml` | 手動実行で依存関係のインストール、ビルド、`dist` のPages公開を行う設定。 |
| `README.md`、`WORKS_GUIDE.md` | このガイドへの案内とローカル確認URLを更新。 |

サイトの文章、CSS、画像データ、レイアウトは変更していません。リポジトリ名を変える場合は `base` も変更してください。画像はこれまでどおり `public/images` に置き、`src/data.ts` には `/images/ファイル名.png` の形で指定できます。

## Gitのセーブポイント

公開準備前のセーブポイントは `c357957a7e406d79d884bfbe048c1af8207e0099`（`168works PCデザイン調整完了`、`main`）です。公開用の変更は、このセーブポイントの後に追加コミットします。元の履歴はそのまま残します。

公開準備時は保存済みGitオブジェクトと管理ファイルを読み取りで確認しました。公開作業では、公式配布のGitとGitHub CLIを一時フォルダに展開して使用します。ブラウザ認証はGitHub公式画面で行い、パスワードやトークンをチャットに貼る必要はありません。

## 公開対象の確認

- `.gitignore` は `node_modules`、`dist`、`.env` とその派生ファイル、認証情報、秘密鍵、ローカルのエージェント設定などを除外しています。ただし、すでにコミットされたファイルには後からの除外指定は効きません。
- 現在のソースと保存済みコミットのテキストを確認した範囲では、実際のAPIキー、パスワード、秘密鍵、電話番号、個人のメールアドレスは見つかりませんでした。メールの記載は `hello@example.com` という設定例で、コミットのメールは `local.invalid` の例示用アドレスです。
- サイト内には公開用の名前「とぶとり」と、OSHI WALLETのアプリURLが含まれます。連絡先の3項目は未設定なので、現在の「準備中」のままです。
- OSHI WALLETの4枚の掲載画像は目視で確認し、実名・メール・アカウント識別子は見つかりませんでした。金額、日付、Artist A/B、目標名などの画面情報は含まれます。
- 現在のPNG画像にはEXIF・GPS用のメタデータは見つかりませんでした。一部の生成画像には生成来歴のメタデータが含まれます。画像ファイルは変更していません。
- 生成来歴の署名証明書には認証局の連絡先が含まれる画像があります。これは画像生成サービスの証明書情報で、サイト制作者の個人の連絡先ではありません。
- GitHub Actionsがサイトとしてアップロードするのは `dist` だけです。`src`、`.git`、`backups`、README、制作メモはサイトの配信対象に含めません。ただし、**公開リポジトリには追跡済みの制作メモ・バックアップ画像・ソース・履歴が含まれます**。
- 確認は既存の内容を対象としています。今後、画像やデータを追加したら、住所・連絡先・画面内の情報・画像の位置情報も含めて再確認してください。`VITE_` で始まる環境変数もブラウザに渡るため、秘密情報は設定しないでください。

## パソコン内で確認する

Node.jsが使えるPowerShellで、プロジェクトフォルダを開き、次を1行ずつ実行します。

```powershell
npm.cmd run build
npm.cmd run preview
```

通常は `http://127.0.0.1:4173/168works/` を開きます。終了は `Ctrl + C` です。初めて依存関係を入れる別のパソコンでは、先に `npm.cmd ci` を実行します。`build` や `preview` ではインターネットに公開されません。

このパソコンの一時Node.js環境が必要な場合は、READMEにあるPATH設定を先に実行してください。

確認するリンクは次のとおりです。

| 表示先 | URL末尾 |
| --- | --- |
| HOME | `/168works/#home` |
| WORKS | `/168works/#works` |
| ABOUT | `/168works/#about` |
| CONTACT | `/168works/#contact` |
| OSHI WALLETの詳細 | `/168works/#/works/oshikatsu` |

作品詳細は `#` を使うため、詳細URLを直接開いたり再読み込みしたりしても、GitHub Pages側に追加のルーティング設定は不要です。末尾の `/` を含むURLで共有してください。

## 今回の確認結果

- Node.js 22.14.0で `npm run build` が成功しました。TypeScriptの確認、Viteビルド、制作メモの除外まで完了しています。
- 生成した `dist` をローカルで配信し、EdgeのPC幅（1440px）とスマートフォン幅（390px）で動作を確認しました。
- HOME・WORKS・ABOUT・CONTACTへの移動と、作品詳細から各セクションに戻るリンクが動作しました。
- OSHI WALLETの詳細をURLから直接開き、再読み込み・ブラウザの戻る操作も確認しました。
- トップページの5画像、詳細の4画像、拡大表示の画像が読み込めました。拡大・次画像への切り替えも確認済みです。
- JavaScript・CSS・画像の取得先は `/168works/` 配下になり、確認中に取得エラー・JavaScriptの実行時エラー・横方向のはみ出しはありませんでした。
- ビルド後のHTMLにもnoindexタグが残り、制作メモ・ソースマップ・認証ファイルが `dist` に含まれないことを確認しました。
- 既存のCSS、画像、作品データ、`package-lock.json` は変更していません。GitのHEAD、mainの参照、インデックス、設定ファイルも準備前と一致しています。

これはローカルでの確認結果です。実際のスマートフォン端末、外部アプリ側の動作、GitHub上でのActions実行と公開サイトは未確認です。

## 初回公開と更新の手順

1. GitHubで新規リポジトリを作ります。名前は `168works`、公開範囲は **Public** にします。README・ライセンス・`.gitignore` の自動追加は選ばず、空のリポジトリにします。
2. ローカルの今回の差分を確認し、公開してよい内容だけコミットします。Gitが使える環境で `git status` と `git diff` を確認してください。VS Codeなら、左の「ソース管理」で各ファイルの差分を確認し、今回の変更ファイルの「＋」を押し、メッセージ欄に「GitHub Pagesの公開準備」と書いて「コミット」を押します。過去のセーブポイントはそのまま残せます。
3. GitHubで作ったリポジトリに接続し、`main` をアップロード（push）します。以下の `<ユーザー名>` は自分のGitHubユーザー名に置き換えます。既存の `origin` がある場合はURLを確認し、重複追加しないでください。

   ```powershell
   git remote -v
   git remote add origin https://github.com/<ユーザー名>/168works.git
   git push -u origin main
   ```

   **このアップロードでソース・追跡済み資料・コミット履歴が一般公開されます。** サイトの公開用Actionsはまだ実行されません。
4. リポジトリの **Settings → Pages → Build and deployment → Source** で **GitHub Actions** を選びます。
5. **Actions → Deploy 168works to GitHub Pages → Run workflow** を開き、ブランチ **main** を選んで実行します。これがサイトを公開する操作です。通常、個人用トークンやSecretsの追加は不要です。
6. 完了後、表示されたURLを開き、上の5つのリンクと画像を確認します。URLは `https://<ユーザー名>.github.io/168works/` です。

ワークフローは手動実行だけにしてあります。公開後に更新する場合も、変更をコミットしてpushした後、**Run workflow** を実行してください。pushだけではサイトは更新されません。

設定の参考：[Vite公式のGitHub Pages公開手順](https://vite.dev/guide/static-deploy.html#github-pages)。
