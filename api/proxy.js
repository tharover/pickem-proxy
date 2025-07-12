export default async function handler(req, res) {
    const { url, method } = req;
    const appScriptUrl = 'https://script.google.com/macros/s/AKfycbwPMF0tBSsCmm19z3pEN2yiXc1oXINfsu1-a-JYJ8-L9qn4w_0RDrNzWW7fNCZaelH-/exec';
    const appScriptTestUrl = 'https://script.google.com/macros/s/AKfycbyVdx3sircXk2_N4qSWoDg-jMWvkL1ub0bMjTb__jM/dev';

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }
    
    try {
        const response = await fetch(appScriptUrl, {
            method,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        const data = await response.text(); // or .json() if you expect JSON

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).send(data);
    } catch (err) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).json({ error: 'Proxy request failed', details: err.message });
    }
}