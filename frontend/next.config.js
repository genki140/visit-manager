module.exports = {
  async rewrites() {
    const result = [
      {
        source: '/api/:path',
        destination: process.env.SITE_URL + ':' + process.env.API_PORT + '/api/:path', // Proxy to Backend
      },
      {
        source: '/graphql',
        destination: process.env.SITE_URL + ':' + process.env.API_PORT + '/' + 'graphql', // Proxy to Backend
      },
    ];
    return result;
  },
  env: {
    // ここに書いたものはサーバークライアント両方から参照可能
    SITE_URL: process.env.SITE_URL,
    SITE_PORT: process.env.SITE_PORT,
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
  },
};
