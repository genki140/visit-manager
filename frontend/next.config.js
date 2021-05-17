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
  async rewrites() {
    const result = [
      {
        source: '/system/api/:path',
        // ここは常にlocalhostでいいみたい。(サーバーサイドのlocalhostってことかな。httpsにする必要もないかも)
        destination: process.env.API_URL + ':' + process.env.API_PORT + '/api/:path', // Proxy to Backend
        // destination: process.env.SITE_URL + ':' + process.env.API_PORT + '/api/:path', // Proxy to Backend
      },
      {
        source: '/system/graphql',
        // ここは常にlocalhostでいいみたい。(サーバーサイドのlocalhostってことかな。httpsにする必要もないかも)
        destination: process.env.API_URL + ':' + process.env.API_PORT + '/' + 'graphql', // Proxy to Backend
        // destination: process.env.SITE_URL + ':' + process.env.API_PORT + '/' + 'graphql', // Proxy to Backend
      },
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

  //---------------------実行時に決定される設定---------------------
  // publicRuntimeConfig: {
  //   GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
  // },

  pwa: {
    dest: '.next', // swの出力ディレクトリ
    disable: process.env.NODE_ENV === 'development',
    // runtimeCaching: []
  },

  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

// const withMdxEnhanced = require('next-mdx-enhanced');

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

const withMDX = next_mdx({
  extension: /\.mdx?$/,
});
config = withMDX(config);

const withPWA = require('next-pwa');
config = withPWA(config);

module.exports = config;

// https://www.npmjs.com/package/next-mdx-enhanced
// const withMdxEnhanced = require('next-mdx-enhanced');

// 不採用になった方法など
// https://mdxjs.com/getting-started/next
// https://qiita.com/IKEA_dless/items/a6fb1a4e5eeab7263a06

// module.exports = withMdxEnhanced({
//   layoutPath: 'src/components/layouts',
//   defaultLayout: true,
//   fileExtensions: ['mdx', 'md'],
//   // remarkPlugins: [],
//   // rehypePlugins: [],
//   // usesSrc: false,
//   // extendFrontMatter: {
//   //   process: (mdxContent, frontMatter) => {},
//   //   phase: 'prebuild|loader|both',
//   // },
//   // reExportDataFetching: false,
// })(

// 環境変数周りのメモ
// https://qiita.com/taroodr/items/f8a9eca4db06916d9ed7
