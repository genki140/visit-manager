# Nest & Next サンプルプロジェクト

## 使い方

- git clone で取得したフォルダを vscode で開き、remote development 拡張機能をインストールし、remote container で開く。

- init を実行しソースファイルを取得

- npm ci を実行

- デバッグタブから「Debug All」を実行。

## DB 構造変更等

コードファースト開発のため、バックエンドのモデル、サービス、リゾルバ―を書き換える。
npx nest g mo entities/name
npx nest g s entities/name (service が必要なら)
npx nest g r entities/name (resolver が必要なら)
(.model.ts も作成)

今のところ、サーバー側で自動的に DB マイグレーションが走る。

クライアントは npm run gen で graphql 用のタイプを自動生成可能。

## 構造の概要

### API

Nest.js 上の Graphql で実装(/graphql)。ログインはコントローラで実装(/login)。

### DB

typeORM でコードファースト実装。

### クライアント

Next.js で実装し、Nest.js の API へはプロキシで接続。つまりクライアントは複数の https へアクセスする必要がなく、運用が楽。

###

### ポート管理

- フロントエンド：3000
- バックエンド：4000
- phpMyAdmin：8000
- フロントエンドデバッグ：9228
- バックエンドデバッグ：9239

## やりたいことなど

- モデル構造をサーバーとクライアントで共有（同一ファイルを参照できるのが理想）

## デプロイ

### フロントエンドとバックエンドの docker を作成する。

```
docker build ./backend -t my-nest-js-app
docker build ./frontend -t my-next-js-app
docker-compose -f ./production/docker-compose.yml up -d
```

## GCP で開発＆そのまま運用

Docker コンテナで動かすのであれば本来は GKE でクラスタ組むのが正解かも知れないが、そこまでする必要を感じないので GCE 上で Docker を使って開発＆運用できるようにしたい。(ubuntu でテスト)

https://qiita.com/gorohash/items/608da9050b32db581802

SSH の設定は gcloud コマンドが簡単

https://qiita.com/masaaania/items/7a83c5e44e351b4a3a2c

Docker をインストール

https://qiita.com/tkyonezu/items/0f6da57eb2d823d2611d

docker-compose をインストール

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-ja

git からソースコードのダウンロード

（そのあと vscode から、Linux(GCP:Ubuntu)上の docker にどうやって入る？）
