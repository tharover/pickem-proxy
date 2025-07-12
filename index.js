const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const appScriptUrl = 'https://script.google.com/macros/s/AKfycbwPMF0tBSsCmm19z3pEN2yiXc1oXINfsu1-a-JYJ8-L9qn4w_0RDrNzWW7fNCZaelH-/exec';
const appScriptTestUrl = 'https://script.google.com/macros/s/AKfycbyVdx3sircXk2_N4qSWoDg-jMWvkL1ub0bMjTb__jM/dev';

const app = express();

app.use('/api', createProxyMiddleware({
  target: appScriptTestUrl,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

module.exports = app;