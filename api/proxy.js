export default async function handler(req, res) {
    const appScriptUrl = 'https://script.google.com/macros/s/AKfycbzuDD1-ScYRgGFfD8951XU0VtJIu3Rm3BBF0nFYBe0SuWN_jZc9pINjm2YAo8Xh1g/exec';
//?func=doLogin&group=buckeyepickers&password=scarlet2025
    console.log('Checking request method:', req.method);
    if (req.method === 'OPTIONS') {
        console.log('Handling preflight request');
        // Handle preflight request for CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    try {
        const response = await fetch(appScriptUrl);
        const data = await response.text();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(data);
    } catch (err) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: 'Proxy failed', details: err.message });
    }
}
/*
import fetch from 'node-fetch';
export default async function handler(req, res) {
    const { url, method } = req;
    const appScriptUrl = 'https://script.google.com/macros/s/AKfycbwPMF0tBSsCmm19z3pEN2yiXc1oXINfsu1-a-JYJ8-L9qn4w_0RDrNzWW7fNCZaelH-/exec';
    const appScriptTestUrl = 'https://script.google.com/macros/s/AKfycbyVdx3sircXk2_N4qSWoDg-jMWvkL1ub0bMjTb__jM/dev';

    console.log('Checking request method:', method);
    if (req.method === 'OPTIONS') {
        console.log('Handling preflight request');
        // Handle preflight request for CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    try {
        console.log('Proxying to:', appScriptUrl);
        const response = await fetch(appScriptUrl, {
            method,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        console.log('Getting response from:', appScriptUrl);
        const data = await response.json(); // or .json() if you expect JSON

        console.log('Response data:', data);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).send(data);
    } catch (err) {
        console.err('Error during proxy request:', err);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: 'Proxy request failed', details: err.message });
    }
}
    */