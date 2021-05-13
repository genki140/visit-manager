module.exports = {


  //--------------------- ビルド時に決定される設定-----------------------
  env: {
    // ここに書いたものはサーバークライアント両方から参照可能
    SITE_URL: process.env.SITE_URL,
    SITE_PORT: process.env.SITE_PORT,
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
  },
  // 本システムはログインシステムのためcookieで言語切り替えでも良さそうだが、勉強のためサブパス言語切り替えで実装(本来SEOで有利)
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en', // デバッグも兼ねてjaアクセス時サブパスが着くようにして開発（最終的には余計なサブパス付けたくないので消す）
  },
  async rewrites() {
    const result = [
      {
        source: '/api/:path',
        // ここは常にlocalhostでいいみたい。(サーバーサイドのlocalhostってことかな。httpsにする必要もないかも)
        destination: process.env.API_URL + ':' + process.env.API_PORT + '/api/:path', // Proxy to Backend
        // destination: process.env.SITE_URL + ':' + process.env.API_PORT + '/api/:path', // Proxy to Backend
      },
      {
        source: '/graphql',
        // ここは常にlocalhostでいいみたい。(サーバーサイドのlocalhostってことかな。httpsにする必要もないかも)
        destination: process.env.API_URL + ':' + process.env.API_PORT + '/' + 'graphql', // Proxy to Backend
        // destination: process.env.SITE_URL + ':' + process.env.API_PORT + '/' + 'graphql', // Proxy to Backend
      },
    ];
    return result;
  },

  //---------------------実行時に決定される設定---------------------
  publicRuntimeConfig: {
    PUBLIC_RUNTIME_SITE_URL: process.env.SITE_URL,
  },
};

// 環境変数周りのメモ
// https://qiita.com/taroodr/items/f8a9eca4db06916d9ed7