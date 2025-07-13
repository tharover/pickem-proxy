export default async function handler(req, res) {
    console.log('Starting proxy handler v2');
    const appScriptDeploymentId = 'AKfycbzhsj_DMdeED3a33e1gWI6tGuCcouqZJAm4pjSjVU3_14ivLzUkXrGHwyA7NNciSXvg';
    const appScriptBase = `https://script.google.com/macros/s/${appScriptDeploymentId}/exec`;
    const query = req.url.split('?')[1] || '';
    const targetUrl = `${appScriptBase}?${query}`;

    console.log('Checking request method:', req.method);
    if (req.method === 'OPTIONS') {
        console.log('Handling preflight request');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-vercel-protection-bypass');
        console.log('Sending 200 OK for preflight request');
        return res.status(200).end();
    }

    console.log('Processing request for target URL:', targetUrl);
    try {
        const headers = {
            'Content-Type': 'text/plain',
        };

        // Forward the Vercel bypass header if present
        const bypassHeader = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
        console.log('Bypass header value:', bypassHeader);
        if (bypassHeader) {
            headers['x-vercel-protection-bypass'] = bypassHeader;
            console.log('Forwarding bypass header');
        }

        console.log('Fetching target URL:', targetUrl);
        const response = await fetch(appScriptUrl, {
            method: req.method,
            headers,
            body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
        });

        const data = await response.text();

        console.log('Response data:', data);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(data);
    } catch (err) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: 'Proxy failed', details: err.message });
    }
}