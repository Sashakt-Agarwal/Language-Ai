const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve the frontend (index.html, and any future static assets) from /public
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint: the frontend calls this, and THIS server calls Groq
// using the secret key from Render's environment variables.
app.post('/api/groq', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing GROQ_API_KEY. Set it in Render → Environment.' });
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
});

app.listen(PORT, () => {
  console.log(`EzyLanguage server running on port ${PORT}`);
});
