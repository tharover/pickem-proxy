const { createProxyMiddleware } = require('http-proxy-middleware');

const appScriptUrl = 'https://script.google.com/macros/s/AKfycbwPMF0tBSsCmm19z3pEN2yiXc1oXINfsu1-a-JYJ8-L9qn4w_0RDrNzWW7fNCZaelH-/exec';
const appScriptTestUrl = 'https://script.google.com/macros/s/AKfycbyVdx3sircXk2_N4qSWoDg-jMWvkL1ub0bMjTb__jM/dev';

// Handle preflight OPTIONS request
if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 200;
    return res.end();
}

// Add CORS headers to actual response
res.setHeader('Access-Control-Allow-Origin', '*');

const proxy = createProxyMiddleware({
    target: appScriptUrl,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
});

module.exports = (req, res) => {
    proxy(req, res);
};