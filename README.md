# 訪問管理システム

※ 開発中のためまだ実用できません。

## デプロイ

Docker イメージを使用して Google Cloud Platform に展開する方法は次の通り。

1. GCP で VM インスタンスを生成

   - ブートディスク: Container Optimized OS

   - HTTP と HTTPS トラフィックを許可

   - IP を固定し、ドメインを割り当てる

2. SSH 接続後、以下のコマンドで docker-compose を実行

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

   ※ 現状はまだ外部からドメインの指定はできないが、最終的には docker-compose up の時にパラメータ等で指定できるようにしたい。
   dc up 時に外部から渡す値は隣に.env ファイルを置いておけば手軽に更新可能。

### バージョンアップ

SSL 設定と DB 値は永続化されているため、以下の方法でコンテナ破棄、イメージ削除、再生成で可能。

```
curl 'https://raw.githubusercontent.com/genki140/visit-manager/master/production/docker-compose.yml' > docker-compose.yml
dc down
rmi genki140@visit-manager-frontend
rmi genki140@visit-manager-backend
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

  .env.development.local に GOOGLE_MAP_API_KEY=<API キー> を追加

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

GitHub にプッシュした段階で、以下の Docker Image が生成される
genki140/visit-manager-frontend
genki140/visit-manager-backend

./production/docker-compose.yml の内容で GCP でイメージ作成

https://qiita.com/tentatsu/items/f7b2ee674c03813f5461

docker run docker/compose:1.22.0 version

$ echo alias dc="'"'docker run --rm \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v "$PWD:/$PWD" \
 -w="/$PWD" \
    docker/compose:1.22.0'"'" >> ~/.bashrc
$ source ~/.bashrc

curl 'https://raw.githubusercontent.com/genki140/visit-manager/master/production/docker-compose.yml' > docker-compose.yml

docker build ./backend -t visit-manager-backend
docker build ./frontend -t visit-manager-frontend
docker-compose -f ./production/docker-compose.yml up -d

```

docker で SSL
https://qiita.com/kuboon/items/f424b84c718619460c6f
https://qiita.com/muk-ai/items/413ae83b0a241495dd34


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


```
