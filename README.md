# 訪問管理システム

※ 開発中のためまだ実用できません。

## デプロイ

Docker イメージを使用して Google Cloud Platform に展開する方法は次の通り。

1. GCP で VM インスタンスを生成

   - ブートディスク: Container Optimized OS

   - HTTP と HTTPS トラフィックを許可

   - IP を固定し、ドメインを割り当てる

2. SSH 接続後、以下のコマンドで docker-compose を実行

   環境依存設定を.env ファイルを作成して記入。(production/.env 参照)

   ```
   > docker run docker/compose:1.22.0 version

   > echo alias dc="'"'docker run --rm \
     -v /var/run/docker.sock:/var/run/docker.sock \
     -v "$PWD:/$PWD" \
     -w="/$PWD" \
     docker/compose:1.22.0'"'" >> ~/.bashrc

   > source ~/.bashrc

   > curl 'https://raw.githubusercontent.com/genki140/visit-manager/master/production/docker-compose.yml' > docker-compose.yml

   > dc up -d --build
   ```

### バージョンアップ

SSL 設定と DB 値は永続化されているため、以下の方法でコンテナ破棄、イメージ削除、再生成で完了。

```
curl 'https://raw.githubusercontent.com/genki140/visit-manager/master/production/docker-compose.yml' > docker-compose.yml
dc down
docker rmi genki140/visit-manager-frontend
docker rmi genki140/visit-manager-backend
dc up -d --build
```

## 開発環境構築

- git clone で取得したフォルダを vscode で開き、remote development 拡張機能をインストールし、remote container で開く。

- 以下の様に実行してソースファイルを取得し、パッケージのインストール

  ```
  > init
  > cd frontend
  > npm ci
  > cd ../backend
  > npm ci
  ```

- 開発環境用パラメータを入れる

  backend の .env.local に GOOGLE_MAP_API_KEY=<API キー> を追加

- デバッグタブから「Debug All」を実行。

## DB 構造変更等

コードファースト開発のため、バックエンドのモデル、サービス、リゾルバ―を書き換える。

```
npx nest g mo entities/name
npx nest g s entities/name (service が必要なら)
npx nest g r entities/name (resolver が必要なら)
(.model.ts も作成)
```

今のところ、サーバー側で自動的に DB マイグレーションが走る。

フロントエンドで gql を記述後 npm run gen で graphql 用のタイプを自動生成。

## 実装概要

### バックエンド

Nest.js 上の Graphql で実装(/graphql)。ログインはコントローラで実装(/login)。

DB は typeORM でコードファースト実装。

- 本番環境の SSL は docker で 構築

  https://qiita.com/kuboon/items/f424b84c718619460c6f

  https://qiita.com/muk-ai/items/413ae83b0a241495dd34

### フロントエンド

Next.js で実装し、Nest.js の API へはプロキシで接続。ユーザーから見たエンドポイントは単一となる。

### ポート管理

- フロントエンド：3000
- バックエンド：4000
- phpMyAdmin：8000
- フロントエンドデバッグ：9228
- バックエンドデバッグ：9239
