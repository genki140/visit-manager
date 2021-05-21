# 訪問管理システム

※ 開発中のためまだ実用はできません。

## デプロイ

Docker イメージを使用して Google Cloud Platform に展開する方法は次の通り。

1. GCP で VM インスタンスを生成

   - ブートディスク: Container Optimized OS

   - HTTP と HTTPS トラフィックを許可

   - IP を固定し、ドメインを割り当てる

2. SSH 接続後、以下のコマンドで docker-compose を実行

   docker-compose のインストール

   ```
   docker run docker/compose:1.22.0 version

   echo alias dc="'"'docker run --rm \
     -v /var/run/docker.sock:/var/run/docker.sock \
     -v "$PWD:/$PWD" \
     -w="/$PWD" \
     docker/compose:1.22.0'"'" >> ~/.bashrc

   source ~/.bashrc
   ```

   環境依存設定を.env ファイルを作成して記入

   ```
   touch .env
   vi .env
   ```

   .env ファイルの設定内容の例

   ```
   SITE_DOMAIN=www.EXAMPLE.com
   GOOGLE_MAP_API_KEY=EXAMPLE
   VERSION=latest
   ```

   docker-compose の実行

   ```
   curl 'https://raw.githubusercontent.com/genki140/visit-manager/master/production/docker-compose.yml' > docker-compose.yml

   dc up -d --build
   ```

### バージョンアップ

SSL 設定と DB 値は永続化されているため、以下の方法でコンテナ破棄、イメージ削除、再生成で完了。

1. .env ファイルの VERSION を変更

2. docker-comopose でリビルド実行

   ```
   curl 'https://raw.githubusercontent.com/genki140/visit-manager/master/production/docker-compose.yml' > docker-compose.yml

   dc down
   docker rmi genki140/visit-manager-frontend
   docker rmi genki140/visit-manager-backend
   dc up -d --build
   ```

## 開発

### 環境構築

1. git clone で取得したフォルダを vscode で開き、remote development 拡張機能をインストールし、remote container で開く。

2. 以下の様に実行すると最新のソースファイルが取得され、必要なパッケージがインストールされる。

   ```
   > init
   ```

3. 開発環境用パラメータを入れる

   backend の .env.local に GOOGLE_MAP_API_KEY=<API キー> を追加

4. デバッグタブから「Debug All」を実行。

### リリース

コードを GitHub に Push すると自動で backend & frontend のイメージファイルが作成されるため、作成されたのちにデプロイ作業が可能となる。

現在は master が 「latest」、tag(v1.0.0) が「1.0.0」として処理される。

- DockerHub リポジトリ

  https://hub.docker.com/repository/docker/genki140/visit-manager-frontend

  https://hub.docker.com/repository/docker/genki140/visit-manager-backend

### DB 構造変更等

コードファースト開発のため、バックエンドのモデル、サービス、リゾルバ―を書き換える。

```
npx nest g mo entities/name
npx nest g s entities/name (service が必要なら)
npx nest g r entities/name (resolver が必要なら)
(.model.ts も作成)
```

今のところ、サーバー側で自動的に DB マイグレーションが走る。

DB 構造が安定したら migration に移行すべき。

フロントエンドで gql を記述後 npm run gen で graphql 用のタイプを自動生成。

### ポート管理

- フロントエンド：3000
- バックエンド：4000
- phpMyAdmin：8000
- フロントエンドデバッグ：9228
- バックエンドデバッグ：9239

## 実装概要

### バックエンド

Nest.js 上の Graphql で実装(/graphql)。ログインはコントローラで実装(/login)。

DB は typeORM でコードファースト実装。

- 本番環境の SSL は docker で 構築

  https://qiita.com/kuboon/items/f424b84c718619460c6f

  https://qiita.com/muk-ai/items/413ae83b0a241495dd34

### フロントエンド

Next.js で実装し、Nest.js の API へはプロキシで接続。ユーザーから見たエンドポイントは単一となる。
