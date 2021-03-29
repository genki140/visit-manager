module.exports = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: 'http://localhost:3004/login', // Proxy to Backend
      },
      {
        source: '/graphql',
        destination: 'http://localhost:3004/graphql', // Proxy to Backend
      },
    ];
  },
};
