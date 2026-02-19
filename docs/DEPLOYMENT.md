# Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account (https://vercel.com)
- Git repository connected to Vercel
- Environment variables configured

### Environment Variables Required

Set these in Vercel Project Settings → Environment Variables:

1. **OpenAI Configuration**
   - `OPENAI_API_KEY`: Your OpenAI API key

2. **Database**
   - `DATABASE_URL`: PostgreSQL connection string (use Vercel Postgres)

3. **Optional - Redis** (for production performance)
   - `REDIS_URL`: Redis connection string

4. **Application**
   - `NEXT_PUBLIC_APP_URL`: Your deployed app URL (e.g., https://yourapp.vercel.app)
   - `NODE_ENV`: Set to `production`

### Deployment Steps

1. **Connect Repository to Vercel**
   ```bash
   # Push to main branch
   git push origin main
   ```

2. **Configure in Vercel Dashboard**
   - Import from Git
   - Select Next.js framework
   - Add environment variables
   - Deploy

3. **Database Setup**
   - Create Vercel Postgres database
   - Copy connection string to `DATABASE_URL`
   - Run migrations:
     ```bash
     npm run db:push
     ```

4. **Monitor Deployment**
   - Check Vercel dashboard for build status
   - View logs in Vercel console
   - Test application at deployment URL

### Performance Optimization

#### CDN & Caching
- Static assets are cached for 1 year (immutable)
- API routes use no-cache headers
- Vercel automatically serves static files via CDN

#### Analytics & Monitoring
- Visit `/api/analytics` to view performance metrics
- Visit `/api/metrics` for API response time metrics

### Troubleshooting

**Build Fails**
```bash
# Check build locally
npm run build

# Verify environment variables are set
# Check .env.example for required variables
```

**Database Connection Issues**
```bash
# Test database connection
npm run db:push

# View Vercel Postgres dashboard
# Verify DATABASE_URL in environment
```

**Performance Issues**
- Check `/api/metrics` for response times
- Monitor database query performance
- Consider enabling Redis for caching

### Custom Domain

1. Purchase domain or use existing one
2. Add domain in Vercel Project Settings
3. Update DNS records with Vercel nameservers
4. Configure SSL certificate (automatic)

### Security

The following headers are automatically set:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Monitoring & Maintenance

**Regular Checks**
- Monitor API response times: `/api/metrics`
- Check analytics: `/api/analytics`
- Review Vercel analytics dashboard
- Monitor database usage

**Performance Targets**
- API response time: < 500ms
- Page load time: < 3s
- Core Web Vitals: All green

### Rollback

If deployment has issues:
1. Vercel Dashboard → Deployments
2. Select previous stable deployment
3. Click "Promote to Production"

### Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- API Documentation: See README.md
