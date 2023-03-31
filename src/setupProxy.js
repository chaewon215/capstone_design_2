const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/test',
    createProxyMiddleware({
      target: 'http://localhost:3001', // the server URL you want to proxy to
      changeOrigin: true,
    })
  );
};