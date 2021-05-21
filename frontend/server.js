// @ts-ignore
const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

// @ts-ignore
const port = 3000;
// @ts-ignore
const dev = process.env.NODE_ENV !== 'production';
const host = '0.0.0.0';
// const API_URL = process.env.API_URL || 'http://localhost:8000/graphql'
const API_URL = process.env.API_URL || '{APIのURL}';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // server.use('/system/graphql', createProxyMiddleware({ target: 'http://backend:4000/graphql', changeOrigin: true, ws: true }));

  // server.use('/graphql', (req, res) => {
  //   return createProxyMiddleware({
  //     target: 'http://localhost:4000/graphql',
  //     changeOrigin: true,
  //   })(req, res);
  // });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, host, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${host}:${port}`);
  });
});

// // server.js
// const { createServer } = require('http');
// const { parse } = require('url');
// const next = require('next');
// const proxy = require('http-proxy-middleware');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.use(
//   '/system/graphql',
//   proxy({
//     target: 'http://backend:4000',
//     changeOrigin: true,
//     ws: true,
//     pathRewrite: {
//       '^/system/graphql': '/graphql',
//     },
//   }),
// );

// app.prepare().then(() => {
//   createServer((req, res) => {
//     // Be sure to pass `true` as the second argument to `url.parse`.
//     // This tells it to parse the query portion of the URL.
//     const parsedUrl = parse(req.url, true);
//     const { pathname, query } = parsedUrl;

//     if (pathname === '/a') {
//       app.render(req, res, '/a', query);
//     } else if (pathname === '/b') {
//       app.render(req, res, '/b', query);
//     } else {
//       handle(req, res, parsedUrl);
//     }
//   }).listen(3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });
// });

// const express = require('express');
// const next = require('next');
// const proxy = require('http-proxy-middleware');

// const port = parseInt(process.env.PORT, 10) || 3000;
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   server.use(
//     '/system/graphql',
//     proxy({
//       target: 'http://backend:4000',
//       changeOrigin: true,
//       ws: true,
//       pathRewrite: {
//         '^/system/graphql': '/graphql',
//       },
//     }),
//   );

//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });

// // HTTPS化

// const { createServer } = require('https');
// const { parse } = require('url');
// const next = require('next');
// const fs = require('fs');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const httpsOptions = {
//   key: fs.readFileSync('./localhost.key'),
//   cert: fs.readFileSync('./localhost.crt'),
// };

// app.prepare().then(() => {
//   createServer(httpsOptions, (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on https://localhost:3000');
//   });
// });
