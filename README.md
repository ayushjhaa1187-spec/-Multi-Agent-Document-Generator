# Multi-Agent BRD Generator

Generate production-ready Business Requirement Documents from raw ideas using a two-agent workflow (Planner + Requirement Writer) with real-time streaming, persistence, and built-in observability.

## Highlights
- Dual agents: planner asks clarifying questions; writer drafts full BRDs.
- Real-time chat UI with streaming responses.
- PostgreSQL persistence via Prisma; optional Redis cache.
- Metrics and analytics endpoints for health and usage.
- Next.js 15 + TypeScript + Tailwind; deploys cleanly to Vercel.

## Quickstart (local)
Prereqs: Node 18+, PostgreSQL, optional Redis.
```bash
npm install
cp .env.example .env.local   # add your secrets below
npm run db:push              # create schema
npm run dev
```
Essential env vars:
- `OPENAI_API_KEY` (required)
- `DATABASE_URL` (required, Postgres)
- `NEXT_PUBLIC_APP_URL` (recommended)
- `REDIS_URL` (optional, enables external cache)

## Scripts
- `npm run dev` – start Next.js dev server
- `npm run build` / `npm start` – production build & serve
- `npm run lint` – lint with ESLint
- `npm test` – API route tests (node --test + tsx)
- `npm run db:push` – sync Prisma schema
- `npm run db:migrate` – interactive migration dev
- `npm run db:studio` – open Prisma Studio

## API Surface
- `POST /api/chat` – orchestrates planner + writer; streams BRD text
- `GET /api/metrics` – response-time + health metrics
- `GET /api/analytics` – session and event tracking

Request example:
```json
{
  "messages": [{"role": "user", "content": "I want a taxi app"}],
  "projectName": "Taxi Booking Platform",
  "stage": "clarify" | "generate"
}
```

## Architecture (high level)
Frontend (`app/`) → API routes (`app/api/*`) → Agents (`lib/agents/*`) → Data layer (PostgreSQL via Prisma, optional Redis cache) → Observability (`/api/metrics`, `/api/analytics`).

## Data Model (Prisma excerpt)
```prisma
model Project { id String @id @default(cuid()); name String; description String?; createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; documents BRD[] }
model BRD { id String @id @default(cuid()); projectId String; project Project @relation(fields: [projectId], references: [id]); version Int @default(1); content Json; rawInput String; generatedBy String @default("gpt-4o"); status String @default("draft"); createdAt DateTime @default(now()) }
```

## Project Layout
```
app/            # Next.js pages, layout, and chat UI
app/api/        # chat, metrics, analytics routes
lib/            # prisma client, cache, analytics, agents
prisma/         # schema.prisma
public/         # static assets
docs/           # extended guides (getting started, api, architecture, deployment, testing)
```

## Testing
```bash
npm test
```

## Deployment (Vercel)
1) Set env vars in Vercel dashboard. 2) `npm run build` locally to verify. 3) Push to `main`; Vercel auto-deploys. 4) Run `npm run db:migrate` against the production database.

## Roadmap (short)
- BRD reviewer/validator agent
- Export to PDF/Word
- JIRA/Azure DevOps integration

## Support & License
MIT License. For help, open a GitHub issue.
