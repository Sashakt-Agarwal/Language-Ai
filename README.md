# EzyLanguage (Render deployment)

A Grammarly-style grammar correction & translation app powered by the Groq API,
built to deploy as a Node web service on Render — your Groq API key stays on
the server and is never exposed to visitors.

## Project structure

```
server.js          → Express server: serves the app + proxies Groq requests
public/index.html  → the app itself (frontend)
package.json        → dependencies (Express)
```

## Deploying on Render

1. **Push this folder to a GitHub repo**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<your-username>/ezylanguage.git
   git push -u origin main
   ```

2. **Create a new Web Service on Render**
   - Go to https://dashboard.render.com → New → Web Service
   - Connect your GitHub repo
   - Render should auto-detect Node. If not, set:
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Add your Groq API key as an environment variable**
   - In the Render service → Environment tab
   - Add: `GROQ_API_KEY` = `your_actual_groq_key`
   - Get a free key at https://console.groq.com
   - Render will redeploy automatically after saving

4. **Done** — your live URL (e.g. `ezylanguage.onrender.com`) will work for
   every visitor without asking them for an API key, and the key is never
   sent to the browser.

## Updating your key later

If you ever need to rotate your key (e.g. after revoking a leaked one), just
update the `GROQ_API_KEY` value in Render → Environment — no code changes,
no redeploy from your side needed (Render restarts the service automatically
when an env var changes).

## Local testing

```bash
npm install
GROQ_API_KEY=your_key_here npm start
```
Then open http://localhost:3000
