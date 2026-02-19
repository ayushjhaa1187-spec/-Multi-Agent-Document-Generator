# Performance Monitoring & Optimization

Guide to monitoring and optimizing the Multi-Agent Document Generator.

## Performance Metrics

### Key Metrics to Track

| Metric | Target | Endpoint |
|--------|--------|----------|
| API Response Time | < 500ms | `/api/metrics` |
| Page Load Time | < 3s | Browser DevTools |
| Database Query Time | < 100ms | Check logs |
| Build Time | < 5s | `npm run build` |
| Test Execution | < 10s | `npm test` |

### Real-time Monitoring

**Check API Performance:**
```bash
curl http://localhost:3000/api/metrics
```

**Response:**
```json
{
  "average_response_time_ms": 245,
  "threshold_ms": 500,
  "is_healthy": true,
  "metrics_count": 42,
  "last_10_metrics": [...]
}
```

**Check Analytics:**
```bash
curl http://localhost:3000/api/analytics
```

## Performance Optimization

### 1. Database Optimization

**Add Indexes:**
```prisma
model Project {
  id    String  @id
  name  String  @unique  // Index for lookups

  @@index([createdAt])   // Sort queries
}
```

**Optimize Queries:**
```prisma
// Bad: Fetches all BRDs then filters
const brds = await prisma.bRD.findMany();
const latest = brds.filter(b => b.projectId === id);

// Good: Filter at database level
const latest = await prisma.bRD.findMany({
  where: { projectId: id },
  orderBy: { createdAt: 'desc' },
  take: 1
});
```

### 2. Caching Strategy

**Use Cache Manager:**
```typescript
import { cacheManager } from '@/lib/cache';

// Cache frequently accessed data
const key = cacheManager.generateEmbeddingKey(projectName, content);
const cached = await cacheManager.get(key);

if (!cached) {
  const result = await generateEmbedding(content);
  await cacheManager.set(key, result, 3600000); // 1 hour TTL
}
```

### 3. API Response Optimization

**Stream Long Responses:**
```typescript
// Use toDataStreamResponse() for large content
return result.toDataStreamResponse();

// Don't buffer entire response in memory
// Good for large BRD documents
```

**Minimize Request Size:**
```typescript
// Compress JSON responses
return new Response(
  JSON.stringify(data),
  { headers: { 'Content-Encoding': 'gzip' } }
);
```

### 4. Frontend Optimization

**Code Splitting:**
```typescript
import dynamic from 'next/dynamic';

const ChatComponent = dynamic(
  () => import('@/components/Chat'),
  { loading: () => <p>Loading...</p> }
);
```

**Static Generation:**
```typescript
// Identify static pages and pre-render
export async function generateStaticParams() {
  return [];
}
```

**Image Optimization:**
```typescript
import Image from 'next/image';

<Image
  src="/banner.png"
  alt="Banner"
  width={1200}
  height={600}
  priority
/>
```

### 5. Build Optimization

```javascript
// next.config.js
{
  compress: true,           // Gzip compression
  poweredByHeader: false,   // Remove header
  swcMinify: true,          // Minification
}
```

## Monitoring in Production

### Vercel Analytics

1. Go to Vercel Dashboard
2. Select your project
3. Analytics → Monitor performance

### Key Metrics to Monitor

- **Page Load Metrics** (Core Web Vitals)
  - LCP (Largest Contentful Paint) - Target: < 2.5s
  - FID (First Input Delay) - Target: < 100ms
  - CLS (Cumulative Layout Shift) - Target: < 0.1

- **API Metrics**
  - Response time distribution
  - Error rates by endpoint
  - Request volume over time

### Set Up Alerts

```typescript
// Monitor via analytics endpoint
export async function checkHealth() {
  const response = await fetch('/api/analytics');
  const data = await response.json();

  if (data.metrics.errorRate > 5) {
    // Alert: High error rate
    alertTeam('High error rate detected');
  }
}
```

## Load Testing

### Basic Load Test with Apache Bench

```bash
# Test 100 requests with 10 concurrent
ab -n 100 -c 10 http://localhost:3000/api/metrics
```

### Test with Artillery

```bash
npm install -g artillery

# Create test file
cat > load-test.yml << EOF
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Chat API"
    flow:
      - post:
          url: "/api/chat"
          json:
            messages: [{"role": "user", "content": "test"}]
            projectName: "TestProject"
EOF

# Run test
artillery run load-test.yml
```

## Common Performance Issues

### Issue: Slow Database Queries

**Diagnosis:**
```sql
-- Check slow query log
SELECT * FROM pg_stat_statements ORDER BY mean_exec_time DESC;
```

**Solutions:**
- Add missing indexes
- Optimize JOIN operations
- Use connection pooling
- Archive old data

### Issue: High Memory Usage

**Diagnosis:**
```bash
# Monitor with Node statistics
node --expose-gc app.js

# Check memory usage
node --expose-gc -e "
  setInterval(() => {
    global.gc();
    console.log(process.memoryUsage());
  }, 5000)
"
```

**Solutions:**
- Limit in-memory cache size
- Implement streaming responses
- Remove memory leaks in event listeners
- Use Redis for distributed cache

### Issue: Slow Frontend Load

**Diagnosis:**
```javascript
// Check performance in browser console
performance.getEntriesByType('navigation');
performance.getEntriesByType('resource');
```

**Solutions:**
- Enable CSS/JS minification
- Implement code splitting
- Optimize images
- Use CDN for static assets

## Benchmarking

### CPU Performance

```bash
# Profile CPU usage
node --prof app.js
node --prof-process isolate-*.log > profile.txt
```

### Memory Profiling

```bash
# Heap snapshot
node --inspect app.js
# Then open chrome://inspect
```

## Optimization Checklist

- [ ] Database indexed for common queries
- [ ] API responses < 500ms on average
- [ ] Caching enabled for embeddings
- [ ] Build succeeds in < 5 seconds
- [ ] No memory leaks in production
- [ ] CDN configured for static assets
- [ ] Compression enabled for responses
- [ ] Code splitting implemented
- [ ] Images optimized
- [ ] Regular performance monitoring in place

## Performance Best Practices

1. **Monitor First** - Know your baseline
2. **Optimize Database** - Most queries are DB-bound
3. **Use Caching** - Avoid recalculating expensive operations
4. **Stream Large Responses** - Don't buffer everything
5. **Minimize Bundle Size** - Tree-shake unused code
6. **Lazy Load** - Load components on demand
7. **Compress Assets** - Gzip/Brotli compression
8. **CDN for Static** - Serve static content globally

## Tools for Performance

| Tool | Purpose | URL |
|------|---------|-----|
| Vercel Analytics | Production monitoring | vercel.com dashboard |
| Lighthouse | Page performance audit | Chrome DevTools |
| Apache Bench | Load testing | httpd.apache.org |
| Artillery | Stress testing | artillery.io |
| pgBadger | PostgreSQL logs | pgbadger.darold.net |
| Clinic.js | Node.js profiling | clinicjs.org |

---

Remember: You can't optimize what you don't measure. Monitor first, optimize second!
