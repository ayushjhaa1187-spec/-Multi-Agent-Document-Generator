# Architecture

Understanding the system design of the Multi-Agent Document Generator.

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                   │
│  - React Components (page.tsx)                         │
│  - Modern CSS Animations (globals.css)                 │
│  - Real-time Chat Interface                           │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ↓ (HTTP POST)
┌─────────────────────────────────────────────────────────┐
│               API Layer (Next.js Routes)               │
├─────────────────────────────────────────────────────────┤
│ POST /api/chat          → Multi-Agent Orchestration    │
│ GET /api/metrics        → Performance Monitoring        │
│ GET /api/analytics      → Event Tracking                │
└───────────┬─────────────────────┬───────────────────────┘
            │                     │
            ↓                     ↓
┌──────────────────────┐  ┌──────────────────────────┐
│  AI Layer            │  │  Data Layer              │
│ ┌──────────────────┐ │  │ ┌────────────────────┐   │
│ │ BRD Planner      │ │  │ │ PostgreSQL         │   │
│ │ (gpt-4o)         │ │  │ │ (Prisma ORM)       │   │
│ └──────────────────┘ │  │ └────────────────────┘   │
│ ┌──────────────────┐ │  │ ┌────────────────────┐   │
│ │ Requirement      │ │  │ │ Cache Manager      │   │
│ │ Writer (gpt-4o)  │ │  │ │ (Redis/In-Memory)  │   │
│ └──────────────────┘ │  │ └────────────────────┘   │
└──────────────────────┘  └──────────────────────────┘
```

## Core Components

### 1. Frontend Layer

**Location**: `app/`

**Components**:
- `page.tsx` - Main chat interface
- `layout.tsx` - App layout and structure
- `globals.css` - Global styling and animations

**Features**:
- Real-time message streaming
- Glass-morphism design
- Advanced CSS animations
- Responsive layout for mobile/desktop

### 2. API Layer

**Location**: `app/api/`

**Endpoints**:

#### Chat Route (`/api/chat`)
- **File**: `app/api/chat/route.ts`
- **Purpose**: Multi-agent orchestration
- **Flow**:
  1. Validate input (messages, projectName)
  2. Check database connection
  3. Run BRD Planner Agent
  4. Detect clarification needs
  5. Run Requirement Writer Agent
  6. Save to database
  7. Stream response to client

#### Metrics Route (`/api/metrics`)
- **File**: `app/api/metrics/route.ts`
- **Purpose**: Performance monitoring
- **Tracks**: Response times, health status

#### Analytics Route (`/api/analytics`)
- **File**: `app/api/analytics/route.ts`
- **Purpose**: Event tracking and analytics
- **Tracks**: User sessions, API calls, errors

### 3. AI Agent Layer

**Location**: `lib/agents/`

#### BRD Planner Agent
- **File**: `lib/agents/brd-planner.ts`
- **Model**: GPT-4o
- **Responsibility**:
  - Analyze user input for clarity
  - Generate follow-up questions if needed
  - Validate requirements structure

#### Requirement Writer Agent
- **File**: `lib/agents/requirement-writer.ts`
- **Model**: GPT-4o
- **Responsibility**:
  - Expand outline into complete BRD
  - Format functional requirements
  - Define non-functional requirements
  - Create user personas and metrics

### 4. Data Layer

**Location**: `lib/`, `prisma/`

#### Database (PostgreSQL)
- **File**: `prisma/schema.prisma`
- **Tables**:
  - `Project`: Store project metadata
  - `BRD`: Store generated documents with versions

#### Cache Manager
- **File**: `lib/cache.ts`
- **Type**: Redis-ready with in-memory fallback
- **Features**: TTL expiration, automatic cleanup

#### Performance Monitor
- **File**: `lib/performance.ts`
- **Tracks**: API response times, metrics

#### Analytics Tracker
- **File**: `lib/analytics.ts`
- **Tracks**: Events, sessions, user actions

## Data Flow

### BRD Generation Flow

```
User Input
    ↓
[Validation]
    ├── Check messages array
    ├── Validate projectName (3-100 chars)
    └── Check message content (non-empty)
    ↓
[Database Check]
    ├── Verify DB connection
    └── Get/Create project
    ↓
[BRD Planner Agent]
    ├── Analyze input clarity
    ├── Detect clarification needs
    └── Output (questions or outline)
    ↓
[Decision Point]
    ├─── If needs clarification → Return questions
    └─── If sufficient → Continue
    ↓
[Requirement Writer Agent]
    ├── Expand outline
    ├── Generate requirements
    └── Format BRD document
    ↓
[Database Save]
    ├── Save BRD to database
    ├── Track version number
    └── Set status to 'draft'
    ↓
[Stream Response]
    └── Send document to client
```

## Request/Response Cycle

```
Client Request
    ↓
[Performance Tracking] (Start)
    ↓
[Analytics Tracking] (Log request)
    ↓
[Process Request]
    ├── Validate input
    ├── Execute agents
    ├── Persist data
    └── Generate response
    ↓
[Performance Tracking] (End)
    ├── Calculate duration
    └── Store metrics
    ↓
[Analytics Tracking] (Log completion)
    ↓
Client Response
```

## Security & Performance

### Security Measures
- Input validation on all endpoints
- Environment variables for secrets
- Prisma parameterized queries (SQL injection protection)
- Security headers (CSP, X-Frame-Options, etc.)

### Performance Optimizations
- Response time monitoring (<500ms target)
- Caching system with TTL
- Database connection pooling
- Stream responses (no buffering)
- CDN for static assets

## Scaling Considerations

### Current Architecture
- Single instance suitable for ~100 concurrent users
- In-memory caching (volatile)
- All processing in-request

### For Scaling
- Implement Redis for distributed caching
- Add queue system for long tasks
- Implement rate limiting per user
- Add authentication and authorization
- Separate slow queries with indexing
- Implement connection pooling

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 15+ | UI framework |
| Styling | Tailwind CSS | Component styling |
| UI Effects | CSS Animations | Visual enhancements |
| Backend | Node.js | Runtime |
| AI | OpenAI GPT-4o | Language model |
| Database | PostgreSQL | Data persistence |
| ORM | Prisma | Database abstraction |
| Caching | Redis (optional) | Performance optimization |
| Deployment | Vercel | Serverless hosting |

## Module Dependencies

```
app/page.tsx
    ├── lib/analytics.ts (tracking)
    ├── ai/react (chat hook)
    └── app/api/chat (POST requests)

app/api/chat/route.ts
    ├── lib/prisma.ts (database)
    ├── lib/agents/ (AI logic)
    ├── lib/performance.ts (monitoring)
    ├── lib/analytics.ts (tracking)
    ├── lib/cache.ts (caching)
    └── @ai-sdk/openai (Model access)

lib/cache.ts
    └── (no dependencies)

lib/analytics.ts
    └── (no dependencies)

lib/performance.ts
    └── (no dependencies)
```

## File Structure

```
Multi-Agent-Document-Generator/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   ├── route.ts          [API handler]
│   │   │   └── route.test.ts     [Tests]
│   │   ├── metrics/
│   │   │   └── route.ts          [Metrics endpoint]
│   │   └── analytics/
│   │       └── route.ts          [Analytics endpoint]
│   ├── page.tsx                   [Main UI]
│   ├── layout.tsx                 [App layout]
│   └── globals.css                [Global styles]
│
├── lib/
│   ├── agents/
│   │   ├── brd-planner.ts        [Planner agent]
│   │   └── requirement-writer.ts [Writer agent]
│   ├── cache.ts                  [Cache manager]
│   ├── analytics.ts              [Event tracking]
│   ├── performance.ts            [Metrics]
│   ├── prisma.ts                 [DB client]
│   └── env.ts                    [Environment]
│
├── prisma/
│   └── schema.prisma             [Database schema]
│
├── public/                        [Static assets]
├── docs/                          [Documentation]
├── next.config.js                [Next.js config]
├── vercel.json                   [Vercel config]
└── package.json                  [Dependencies]
```

---

For more details, see:
- [API Reference](./API.md) - Endpoint documentation
- [Development Guide](./DEVELOPMENT.md) - Development workflow
- [Performance Guide](./PERFORMANCE.md) - Optimization strategies
