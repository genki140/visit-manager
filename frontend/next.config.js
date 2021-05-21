const path = require('path');

let config = {
  //--------------------- ビルド時に決定される設定-----------------------
  env: {
    // ここに書いたものはサーバークライアント両方から参照可能
    // SITE_URL: process.env.SITE_URL,
    SITE_PORT: process.env.SITE_PORT,
    // GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
  },
  // 本システムはログインシステムのためcookieで言語切り替えでも良さそうだが、勉強のためサブパス言語切り替えで実装(本来SEOで有利)
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en', // デバッグも兼ねてjaアクセス時サブパスが着くようにして開発（最終的には余計なサブパス付けたくないので消す）
  },
  async redirects() {
    // ドキュメント内の言語フォルダにアクセスさせない
    return [
      {
        source: '/:locale/system/documents/en/:path*',
        destination: '/en/system/documents/:path*',
        permanent: false,
        locale: false,
      },
      {
        source: '/:locale/system/documents/ja/:path*',
        destination: '/ja/system/documents/:path*',
        permanent: false,
        locale: false,
      },
    ];
  },
  async rewrites() {
    const result = [
      {
        source: '/system/api/:path',
        destination: process.env.API_URL + ':' + process.env.API_PORT + '/api/:path', // Proxy to Backend
      },
      // {
      //   source: '/system/graphql',
      //   destination: process.env.API_URL + ':' + process.env.API_PORT + '/' + 'graphql', // Proxy to Backend
      // },
      {
        // /ja/system/documents で日本語ドキュメントにアクセスできるよう設定
        source: '/:locale/system/documents/:path*',
        destination: '/:locale/system/documents/:locale/:path*',
        locale: false,
      },
      {
        source: '/system/phpmyadmin/:path*',
        destination: 'http://phpmyadmin/:path*', // Proxy to phpmyadmin
      },
    ];
    return result;
  },

  pwa: {
    dest: '.next', // swの出力ディレクトリ
    disable: process.env.NODE_ENV !== 'production',
  },

  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

// この部分utilに移したい
const next_mdx =
  (pluginOptions = {}) =>
  (nextConfig = {}) => {
    const extension = pluginOptions.extension || /\.mdx$/;

    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        config.module.rules.push({
          test: extension,
          use: [
            options.defaultLoaders.babel,
            {
              loader: require.resolve('@mdx-js/loader'),
              options: pluginOptions.options,
            },
            path.join(__dirname, './src/utils/fm-loader'),
          ],
        });

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    });
  };

// MDX
const withMDX = next_mdx({
  extension: /\.mdx?$/,
});
config = withMDX(config);

// PWA
const withPWA = require('next-pwa');
config = withPWA(config);

module.exports = config;
