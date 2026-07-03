# EzyLanguage

A Grammarly-style grammar correction & translation app powered by the Groq API.

## Deploying (GitHub + Vercel)

GitHub Pages can only serve static files, so it can't keep an API key secret.
This project uses a tiny serverless function (`api/groq.js`) to hold the key
on the server instead — deploy it on **Vercel**, which connects directly to
your GitHub repo and hosts both the static site and the function for free.

### Steps

1. **Push this folder to a GitHub repo**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<your-username>/ezylanguage.git
   git push -u origin main
   ```

2. **Import the repo on Vercel**
   - Go to https://vercel.com → New Project → Import your GitHub repo
   - Framework preset: "Other" (no build step needed)

3. **Add your Groq API key as an environment variable**
   - In the Vercel project → Settings → Environment Variables
   - Add: `GROQ_API_KEY` = `your_actual_groq_key`
   - Get a free key at https://console.groq.com
   - Redeploy after adding it (Vercel won't pick it up until the next deploy)

4. **Done** — your live URL (e.g. `ezylanguage.vercel.app`) will work for
   every visitor without asking them for an API key. Your key never reaches
   the browser; it's only used inside `api/groq.js` on Vercel's servers.

## Project structure

```
index.html      → the app (frontend)
api/groq.js      → serverless function that calls Groq using your secret key
```

## Local testing

You can also test locally with the Vercel CLI:
```bash
npm i -g vercel
vercel dev
```
This will run the same serverless function locally so you can verify it
before deploying.
