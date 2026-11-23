# tunemage

Frame Shiftをベースにした音楽ポートフォリオです。Astroで静的に生成し、作品や出演情報はPages CMSから編集します。

## ローカルで確認

Node.js 24 LTSを推奨します。リポジトリ直下で実行してください。

```sh
npm ci
npm run dev
```

表示先は通常 `http://localhost:4321/` です。`npm run check` で型とコンテンツを確認し、`npm run build` で `dist/` に出力します。`npm run preview` で生成したサイトを確認できます。

## ローカル開発の運用

この `tunemage-site` リポジトリを唯一の開発元とします。通常の改修は `master` で既存ファイルを更新し、動作確認後に変更をコミットします。日付付きフォルダやZIPを改修ごとに作成する必要はありません。

## GitHub Pagesで公開

1. コミット対象と既存履歴を確認します。公開リポジトリでは、削除したファイルの過去版やコミットのメールアドレスも閲覧できます。
2. GitHubで空の公開リポジトリ `tunemage-site` を作成します。README、.gitignore、ライセンスの自動生成は選択せず、ローカルの `master` を初回pushします。

```sh
git status --short
git remote add origin https://github.com/<OWNER>/tunemage-site.git
git push -u origin master
```

3. GitHub上でデフォルトブランチが `master` であることを確認し、**Settings → Pages → Build and deployment → Source** で **GitHub Actions** を選びます。
4. **Actions → Deploy to GitHub Pages → Run workflow** で `master` を選んで実行します。初回push直後はPagesが有効になる前にワークフローが起動することがあります。Pagesを設定した後に実行してください。
5. **Settings → Pages** またはデプロイ結果から公開URLを開き、各ページ・画像・リンクを確認します。通常は `https://<OWNER>.github.io/tunemage-site/` です。Astroの `site`・`base` はActionsが公開設定から取得するため、所有者名のハードコードは不要です。以後は `master` へのpushで更新されます。

ライブ情報は日本時間の開催日で区分します。日本時間の午前0時17分に日次ビルドを予定し、開催日は終日「出演予定」に含みます。GitHub Actionsの実行状況により反映時刻は前後します。[AstroのGitHub Pages公開ガイド](https://docs.astro.build/en/guides/deploy/github/)

## Pages CMSで編集

1. Pages CMSにGitHubアカウントでログインします。対象リポジトリの所有者または組織にPages CMSのGitHub Appをインストールし、対象リポジトリへのアクセスを許可してください。[Pages CMSログイン](https://app.pagescms.org/) · [公式セットアップガイド](https://pagescms.org/docs/quick-start/)
2. 対象リポジトリの `master` を開きます。ルートにある `.pages.yml` が読み込まれます。
3. **サイト基本情報**からプロフィール、メインビジュアル、活動紹介、配信・SNSリンク、問い合わせ先を編集します。問い合わせ先はメールアドレスかHTTPSのURLを入力します。
4. **楽曲 → 追加**から曲名、半角英小文字のスラッグ、公開日、ジャケットなどを入力します。楽曲概要は一覧と個別ページに表示されます。詳細説明、歌詞、Style、追加プロンプトは個別の保存欄です。「トップの代表作品に表示」をオンにすると、表示順が小さいものから最大6曲が並びます。同じ表示順なら新しい公開日が先です。スラッグは曲ごとに一意とし、公開後の変更はURLも変わる点に留意してください。
5. **ライブ → 追加**から開催日、イベント名、会場、告知画像、説明、必要に応じて外部リンクを入力します。ファイル名は新規作成時のみ編集でき、同じ名前がある場合は末尾を調整できます。
6. 画像は画像欄からアップロード・選択し、代替テキストも入力します。保存すると公開ブランチにコミットされます。反映状況はGitHubの **Actions** で確認できます。

Spotify・YouTube・SunoのURLは任意です。YouTubeの視聴URLや短縮URLから動画を埋め込み、動画URLを取得できない曲ではジャケットをメインに表示します。詳細説明・歌詞・プロンプトは保存用です。公開GitHubリポジトリでは元データと変更履歴を閲覧できるため、プロンプト欄には公開できる内容だけを保存してください。

サンプルの楽曲とライブはCMSで置き換えるか削除できます。プロフィール画像とリンクも差し替え、公開用データが揃ったら各「サンプル表示」をオフにしてください。

## 別のGitHubアカウントへ複製

1. 元リポジトリをGitHubの **Settings → General → Template repository** でテンプレートにし、新しい所有者が **Use this template** から作成します。変更履歴ごと引き継ぐ場合はGitで複製し、新しいリポジトリへpushします。
2. 新しい所有者が、新しいリポジトリでGitHub PagesとPages CMSを接続します。GitHub Pagesの公開手順とPages CMSの接続手順は上記と同じです。
3. CMSでサイト基本情報、画像、楽曲、ライブを差し替えます。配色を調整する場合は `src/styles/global.css` のライト・ダーク両方の色変数を編集します。

## データとクレジット

プロフィールは `content/site.yml`、楽曲とライブは `content/music/` と `content/live/` のMarkdown、アップロード画像は `public/media/` に保存します。楽曲の歌詞とプロンプトはYAMLフロントマター、制作背景はMarkdown本文です。ライブは1件1ファイルで保持しています。

ベースは Ema Suriano の [Astro Frame Shift](https://github.com/EmaSuriano/astro-frame-shift)（上流コミット `0288413ac97acd3d2ec8b6fec9d7c6ea70fbb9bb`）です。テーマの著作権表示とMITライセンスは [LICENSE.md](LICENSE.md) に同梱しています。初期画像は生成したサンプル素材です。
