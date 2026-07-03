// This runs on Vercel's servers, never in the browser.
// The API key lives in an environment variable, not in this file or the frontend.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing GROQ_API_KEY. Set it in Vercel project settings.' });
  }

  const { model, messages, temperature } = req.body || {};
  if (!model || !messages) {
    return res.status(400).json({ error: 'Missing model or messages in request body.' });
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({ model, messages, temperature: temperature ?? 0.2 })
    });

    const data = await groqResponse.json();
    return res.status(groqResponse.status).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Proxy request failed.' });
  }
}
