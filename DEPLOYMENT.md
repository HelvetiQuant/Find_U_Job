# Deployment Guide - Free Tier Options

## 🚀 Recommended: Render.com (Free Tier)

**Pros:**
- ✅ True free tier (no credit card required)
- ✅ 512MB RAM, 0.1 CPU
- ✅ Automatic HTTPS
- ✅ PostgreSQL free addon available
- ✅ Simple GitHub integration

**Cons:**
- ⚠️ Sleeps after 15 min inactivity (30s cold start)
- ⚠️ Limited to 100GB bandwidth/month

### Deploy on Render:
1. Fork/clone `HelvetiQuant/Find_U_Job` to your GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn src.api.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
5. Click **Create Web Service**

---

## 🐳 Alternative: Fly.io

**Pros:**
- ✅ $5/mese crediti gratuiti (sufficiente per small app)
- ✅ 3 VMs always free (shared-cpu-1x)
- ✅ 3GB persistent storage
- ✅ Edge deployment (Switzerland: ZRH region available)

**Cons:**
- ⚠️ Requires credit card (no charges under $5)
- ⚠️ Slightly more complex CLI setup

### Deploy on Fly.io:
```bash
# Install Fly CLI
iwr https://fly.io/install.ps1 -useb | iex

# Login
fly auth login

# Launch app
fly launch --name find-u-job-api --region zrh

# Deploy
fly deploy
```

---

## ⚡ Alternative: Koyeb (Serverless)

**Pros:**
- ✅ Generous free tier (1GB RAM, 1 vCPU)
- ✅ Serverless - pay only for usage
- ✅ Native Docker support
- ✅ Global edge network

**Cons:**
- ⚠️ Cold starts (like all serverless)
- ⚠️ Newer platform (less mature)

### Deploy on Koyeb:
1. Go to [app.koyeb.com](https://app.koyeb.com)
2. **Create App** → **GitHub**
3. Select repo: `HelvetiQuant/Find_U_Job`
4. **Builder**: Dockerfile
5. **Port**: 8000
6. Deploy!

---

## 🆚 Comparison Table

| Platform | Free RAM | Free CPU | Always On | Cold Start | Credit Card |
|----------|----------|----------|-----------|------------|-------------|
| **Render** | 512MB | 0.1 | ❌ (15min) | ~30s | ❌ No |
| **Fly.io** | 256MB | Shared | ✅ (3 VMs) | ~5s | ✅ Required |
| **Koyeb** | 1GB | 1 vCPU | ❌ Serverless | ~2s | ❌ No |
| **Heroku** | 512MB | 1x | ❌ (30min) | ~10s | ❌ No (Eco dynos) |

---

## 🔗 Frontend + Backend Integration

### Vercel (Frontend) + Render (Backend)

1. **Deploy Backend** on Render → Get URL: `https://find-u-job-api.onrender.com`
2. **Update Frontend** `.env`:
   ```env
   VITE_API_URL=https://find-u-job-api.onrender.com
   ```
3. **Deploy Frontend** on Vercel

---

## 📝 Environment Variables

Create `.env` file for each platform:

```env
# Database (if needed)
DATABASE_URL=postgresql://...

# Security
SECRET_KEY=your-secret-key-here

# API Keys (for job APIs)
ADZUNA_APP_ID=your-app-id
ADZUNA_API_KEY=your-api-key

# AI Services (optional)
OPENAI_API_KEY=sk-...
LM_STUDIO_URL=http://localhost:1234
```

---

## 📊 Monitoring (Free)

- **UptimeRobot**: Free uptime monitoring (5min checks)
- **Sentry**: Free error tracking (5k errors/month)
- **LogRocket**: Free session replay (1k sessions/month)

---

**Recommendation**: Start with **Render** (true free tier, no CC required), then migrate to **Fly.io** when you need always-on service.
