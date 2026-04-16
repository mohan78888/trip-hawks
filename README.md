# Tour Help Desk - Complete Setup & Deployment Guide

## 🛠️ Fixed Bugs Summary

### Frontend Fixes:
1. **`onContactClick is not defined`** — Added default empty function fallbacks to all Footer props
2. **Tailwind CDN warning** — Already using `@tailwindcss/vite` plugin (correct for production)
3. **Clerk dev keys warning** — Need to add production keys in `.env` (see below)
4. **Vite proxy config** — Fixed to always use `localhost:5000` in dev (was using env var)
5. **Footer props** — All props now have default `() => {}` values to prevent crashes
6. **Flight service API URL** — Fixed URL construction logic for production

### Backend Fixes:
1. **Error handler order** — Moved 404 handler before global error handler (correct Express order)
2. **`getProfile`** — Fixed to support both Clerk auth AND JWT auth
3. **MONGO_URI guard** — Added check to avoid crash if env var missing
4. **CORS** — Added `.vercel.app` support alongside `.netlify.app`
5. **Unused variables** — Fixed `req` → `_req` in health route handlers

### Slow Network / Font Warning:
- This is a **browser-level warning** about slow internet. Not a code bug.
- Fonts load from Google Fonts CDN — if internet is slow, browser uses fallback font temporarily.
- No code fix needed. This goes away on good network.

---

## 🚀 Local Development Setup

### 1. Frontend Setup
\`\`\`bash
cd frontend
cp .env.example .env
# Edit .env and add your VITE_CLERK_PUBLISHABLE_KEY
npm install
npm run dev
# Runs on http://localhost:3000
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
cp .env.example .env.local
# Edit .env.local and fill all values
npm install
npm run dev
# Runs on http://localhost:5000
\`\`\`

---

## 🌐 Production Deployment

### Step 1: Deploy Backend on Render (Free)
1. Go to https://render.com and create account
2. New → Web Service → Connect your GitHub repo
3. Set Root Directory: `backend`
4. Build Command: `npm install && npm run build`
5. Start Command: `npm run start`
6. Add these Environment Variables:
   - `MONGO_URI` → Your MongoDB Atlas connection string
   - `JWT_SECRET` → Any random 32+ character string
   - `CLERK_SECRET_KEY` → From Clerk Dashboard (production)
   - `CLERK_WEBHOOK_SECRET` → From Clerk Dashboard → Webhooks
   - `GEMINI_API_KEY` → From Google AI Studio
   - `FRONTEND_URL` → Your Netlify URL (set after frontend deploy)
7. Click Deploy. Note the URL (e.g. `https://trip-hawks-backend.onrender.com`)

### Step 2: Deploy Frontend on Netlify
1. Go to https://netlify.com
2. New site → Import from Git
3. Set Base Directory: `frontend`
4. Build Command: `npm run build`
5. Publish Directory: `frontend/dist`
6. Add Environment Variables:
   - `VITE_CLERK_PUBLISHABLE_KEY` → Clerk production publishable key (`pk_live_...`)
   - `VITE_API_URL` → Your Render backend URL (e.g. `https://trip-hawks-backend.onrender.com`)
7. Deploy!

### Step 3: Update CORS
After Netlify deploys, go back to Render → Environment Variables:
- Set `FRONTEND_URL` = `https://your-site.netlify.app`
- Redeploy backend

### Step 4: Setup Clerk Production
1. In Clerk Dashboard, go to your production instance
2. Update allowed URLs to include your Netlify domain
3. Setup Clerk Webhook pointing to: `https://your-backend.onrender.com/api/webhooks/clerk`

---

## 📋 Environment Variables Checklist

### Frontend (.env)
- [ ] `VITE_CLERK_PUBLISHABLE_KEY` — From Clerk Dashboard
- [ ] `VITE_API_URL` — Backend URL (only for production)

### Backend (.env.local)
- [ ] `MONGO_URI` — MongoDB Atlas connection string
- [ ] `JWT_SECRET` — Random secret key
- [ ] `CLERK_SECRET_KEY` — From Clerk Dashboard
- [ ] `CLERK_WEBHOOK_SECRET` — From Clerk Webhooks
- [ ] `GEMINI_API_KEY` — From Google AI Studio
- [ ] `FRONTEND_URL` — Your frontend domain (for CORS)
