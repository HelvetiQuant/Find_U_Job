# 🚀 Production Deployment Guide

## 📋 Prerequisites

1. **Railway Account** with token configured
2. **GitHub Repository** with code pushed
3. **Environment Variables** properly set

## 🛠️ Deployment Steps

### 1. Railway Setup

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login with your token
railway login --token $RAILWAY_TOKEN
```

### 2. Create Railway Project

```bash
# Create new project
railway new

# Link to your GitHub repository
railway up
```

### 3. Configure Environment Variables

In Railway dashboard, set these variables:

```bash
# Production Configuration
PORT=8000
ENVIRONMENT=production

# Database (Railway provides PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:port/dbname

# AI Configuration
OLLAMA_API_URL=https://your-ai-service.com/api
OLLAMA_MODEL=mistral

# GitHub (optional)
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_username
```

### 4. Database Setup

For production, replace SQLite with PostgreSQL:

```python
# In production, use Railway's PostgreSQL
DATABASE_URL=postgresql://user:pass@host:port/dbname
```

### 5. AI Service Production Options

#### Option A: Railway + Ollama
- Deploy Ollama as separate Railway service
- Update `OLLAMA_API_URL` to point to your Ollama service

#### Option B: External AI Service
- Use OpenAI, Anthropic, or other API
- Modify `local_ai()` function to use external API

#### Option C: Railway Build with Ollama
- Include Ollama in your Railway build
- Requires larger deployment size

### 6. Deploy

```bash
# Push to trigger deployment
git push origin main

# Or deploy manually
railway up
```

## 🔧 Configuration Files

### `railway.json`
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### `requirements.txt`
Contains all production dependencies.

## 🏥 Health Checks

- `GET /` - Basic health check
- `GET /health` - Detailed system status
- `GET /docs` - API documentation

## 📊 Monitoring

1. **Railway Logs**: Monitor application logs
2. **Health Checks**: Set up uptime monitoring
3. **Database**: Monitor PostgreSQL performance
4. **AI Service**: Monitor Ollama/external API response times

## 🔄 CI/CD Pipeline

Automatic deployment on git push:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Railway
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: railway-app/railway-action@v1
        with:
          api-token: ${{ secrets.RAILWAY_TOKEN }}
```

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Errors**
   - Check `DATABASE_URL` format
   - Verify PostgreSQL is running

2. **AI Service Timeouts**
   - Increase timeout in `local_ai()` function
   - Consider external AI service for production

3. **Memory Issues**
   - Railway has memory limits
   - Optimize AI model usage

4. **Port Binding**
   - Use `0.0.0.0` instead of `localhost`
   - Ensure `$PORT` environment variable is used

## 📈 Scaling

1. **Vertical Scaling**: Increase Railway plan resources
2. **Horizontal Scaling**: Add more Railway instances
3. **Database Scaling**: Use managed PostgreSQL
4. **AI Scaling**: Consider dedicated AI service

## 🔒 Security

1. **Environment Variables**: Never commit secrets
2. **API Security**: Add authentication endpoints
3. **Database Security**: Use connection pooling
4. **HTTPS**: Railway provides automatic SSL

## 💰 Cost Optimization

1. **Railway Plan**: Start with free tier, scale as needed
2. **AI Service**: Monitor API usage and costs
3. **Database**: Optimize queries and connections
4. **Monitoring**: Set up alerts for unusual activity
