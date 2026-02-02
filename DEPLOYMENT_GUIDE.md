# Deployment Guide - Multi-Agent BRD Generator

## Overview

This guide covers deploying the Multi-Agent BRD Generator to Vercel, the recommended hosting platform for Next.js applications.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- OpenAI API key
- PostgreSQL database (Vercel Postgres or external)
- Node.js 18+ installed locally

## Local Development Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd -Multi-Agent-Document-Generator
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://user:password@localhost:5432/brd_generator
NODE_ENV=development
```

### 3. Setup Database

#### Option A: Local PostgreSQL

```bash
# Create local database
creatdb brd_generator

# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://localhost/brd_generator"

# Push schema
npm run db:push
```

#### Option B: Docker PostgreSQL

```bash
docker run --name postgres-brd \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=brd_generator \
  -p 5432:5432 \
  -d postgres:15
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Deployment to Vercel

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Initial commit: Multi-Agent BRD Generator"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Configure Environment Variables

In the Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...
NODE_ENV=production
```

### Step 4: Setup Vercel Postgres (Recommended)

Instead of external database:

1. In Vercel dashboard, go to **Storage** → **Create Database** → **Postgres**
2. Choose region close to users
3. Vercel automatically creates DATABASE_URL env var
4. Skip step 3 for DATABASE_URL

### Step 5: Deploy

1. Click **Deploy** button
2. Vercel automatically runs:
   - `npm install`
   - `npm run build`
   - Database migrations via `npm run db:push`

### Step 6: Verify Deployment

```bash
# Check deployment status
vercel --prod

# Test API endpoint
curl https://your-project.vercel.app/api/chat
```

## Database Setup on Vercel

### Using Vercel Postgres

1. **Create Database**
   - Dashboard → Storage → Create Database → Postgres
   - DATABASE_URL auto-populated

2. **Run Migrations**
   ```bash
   # In Vercel console or locally
   npm run db:push
   ```

3. **Verify Connection**
   ```bash
   npm run db:studio
   ```

### Using External PostgreSQL

If using external provider (AWS RDS, DigitalOcean, etc.):

```
DATABASE_URL=postgresql://user:password@host:5432/database
```

## Environment Variables Checklist

- [ ] OPENAI_API_KEY (from OpenAI dashboard)
- [ ] DATABASE_URL (from Vercel Postgres or external)
- [ ] NODE_ENV=production
- [ ] NEXT_PUBLIC_API_URL=https://your-project.vercel.app (optional)

## Troubleshooting

### Build Failures

**Error**: "Cannot find module @prisma/client"

```bash
# Solution: Rebuild Prisma client
npm install @prisma/client
npx prisma generate
```

**Error**: "OPENAI_API_KEY not found"

- Verify env var in Vercel dashboard
- Redeploy after adding env var
- Wait 1-2 minutes for changes to propagate

### Runtime Errors

**Error**: "connect ENOTFOUND database"

- Check DATABASE_URL is correct
- Verify database is running/accessible
- Check firewall/security group allows Vercel IPs

**Error**: "API rate limit exceeded"

- Check OpenAI API quota
- Implement request throttling
- Upgrade OpenAI plan if needed

## Production Best Practices

### 1. Environment Security

- Never commit `.env.local` to git
- Use Vercel's secure env var management
- Rotate API keys regularly
- Use separate API keys for dev/prod

### 2. Database

- Enable automated backups (Vercel Postgres)
- Set up database monitoring
- Configure max connections (usually 25-100)
- Implement query timeouts

### 3. Performance

- Enable compression in next.config.js
- Optimize images
- Cache API responses
- Monitor Vercel Analytics

### 4. Monitoring

```bash
# View logs
vercel logs

# Monitor real-time
vercel --prod --logs
```

## Scaling Considerations

### Current Limits (Free Tier)

- Vercel: 100GB bandwidth/month
- Postgres: 256MB storage
- API: 10 requests/min (recommended)

### Upgrade Path

1. **Pro Tier** ($20/month)
   - 1TB bandwidth
   - Team collaboration
   - Custom domains

2. **Enterprise**
   - Dedicated support
   - Unlimited bandwidth
   - Custom SLAs

## Custom Domain Setup

1. In Vercel dashboard → **Domains**
2. Add your domain (e.g., brd-generator.com)
3. Update DNS records (Vercel provides instructions)
4. Enable SSL/TLS (automatic with Vercel)

## CI/CD Pipeline

Vercel automatically:

- Deploys on push to main
- Creates preview deployments for PRs
- Runs type checking
- Validates environment variables

### Adding Custom Checks

Create `.vercelignore`:

```
node_modules
.env.local
.git
README.md
```

## Rollback & Recovery

### Rollback to Previous Deployment

1. Dashboard → **Deployments**
2. Find previous version
3. Click **...** → **Promote to Production**

### Database Backup & Restore

For Vercel Postgres:

1. Dashboard → **Storage** → **Postgres**
2. Click **...** → **Backups**
3. Restore from backup if needed

## Monitoring & Analytics

### Vercel Analytics

```bash
# View Web Vitals
vercel env ls

# Check deployment status
vercel inspect <deployment-id>
```

### Application Monitoring

Consider integrating:

- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Datadog**: Infrastructure monitoring
- **New Relic**: APM

## Cost Estimation

| Service | Free Tier | Pro Tier |
|---------|-----------|----------|
| Vercel | $0 | $20/mo |
| Vercel Postgres | $15/mo (included in Pro) | Included |
| OpenAI API | Pay as you go | Pay as you go |
| Domain | - | $12-15/yr |

**Estimated Monthly Cost**:
- Startup: $30-50 (Postgres + minimal API usage)
- Scaling: $100-500 (higher usage + Pro tier)

## Support & Resources

- [Vercel Docs](https://vercel.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deployment)
- [Next.js Production Checklist](https://nextjs.org/learn/production/production)
- [OpenAI API Documentation](https://platform.openai.com/docs)
