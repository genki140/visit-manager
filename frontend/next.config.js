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
};
