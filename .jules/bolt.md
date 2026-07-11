## 2025-02-12 - Remove redundant Prisma health check

**Learning:** Explicitly checking database health with `SELECT 1` via Prisma on every API request adds unnecessary latency (10-50ms+). Prisma inherently manages connection pooling and reconnects automatically.
**Action:** Do not use `SELECT 1` for routine endpoint validations in a serverless function connecting via Prisma. Let actual queries fail and handle those failures gracefully.
