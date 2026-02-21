# BRD Agent — Complete System Design & Development Workflow

**Team Wesolve_foru | HackFest 2.0 | GDG Cloud New Delhi**

A multi-agent AI system that transforms scattered emails, meeting transcripts, and chat logs into structured Business Requirements Documents (BRDs) — processing 500K+ Enron emails and 279 AMI transcripts with 92%+ accuracy and <3s latency.[1]

***

## Frontend Screen Layouts

The frontend consists of **6 core screens** built with Next.js 14 and Vercel AI SDK for real-time streaming. Each screen maps to a distinct user workflow.[1]

### Screen 1 — Landing / Login

```
┌─────────────────────────────────────────────────────────────────┐
│  🔷 BRD AGENT                              [Login] [Sign Up]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│         Transform Scattered Communications                      │
│         Into Structured Requirements                            │
│                                                                 │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│    │  500K+   │  │   279    │  │   92%    │  │   <3s    │     │
│    │  Emails  │  │Transcripts│ │ Accuracy │  │ Latency  │     │
│    └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
│                                                                 │
│              [ Get Started → ]  [ View Demo ]                   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  OAuth Login:  [Google]  [GitHub]  [Email/Password]     │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Components:** Hero section with impact stats, OAuth buttons (Google/GitHub), email/password fallback, "View Demo" for instant demo mode.

***

### Screen 2 — Dashboard (Main Hub)

```
┌─────────────────────────────────────────────────────────────────┐
│  🔷 BRD AGENT    [Dashboard] [Upload] [BRDs] [Metrics] [⚙️]   │
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                      │
│ SIDEBAR  │   📊 DASHBOARD OVERVIEW                              │
│          │                                                      │
│ ┌──────┐ │   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐     │
│ │ 🏠   │ │   │ Total  │ │ Active │ │ Avg    │ │ Docs   │     │
│ │Home  │ │   │ BRDs   │ │ Jobs   │ │Accuracy│ │Processed│    │
│ │      │ │   │  24    │ │   3    │ │ 92.4%  │ │ 150K   │     │
│ │ 📤   │ │   └────────┘ └────────┘ └────────┘ └────────┘     │
│ │Upload│ │                                                      │
│ │      │ │   RECENT BRDs                                        │
│ │ 📄   │ │   ┌────────────────────────────────────────────┐    │
│ │BRDs  │ │   │ Project Alpha  │ 92% │ Complete │ View →   │    │
│ │      │ │   │ Sprint Q4      │ 89% │ Complete │ View →   │    │
│ │ 📈   │ │   │ Migration Plan │ --% │ Running  │ Watch →  │    │
│ │Metrics││   └────────────────────────────────────────────┘    │
│ │      │ │                                                      │
│ │ ⚙️   │ │   ACTIVE PIPELINE STATUS                             │
│ │Config│ │   ┌────────────────────────────────────────────┐    │
│ │      │ │   │ ██████████░░░░░ 67% — Entity Extraction    │    │
│ └──────┘ │   └────────────────────────────────────────────┘    │
└──────────┴──────────────────────────────────────────────────────┘
```

**Components:** Sidebar navigation, 4 stat cards (Total BRDs, Active Jobs, Avg Accuracy, Docs Processed), recent BRDs list with status badges, live pipeline progress bar.

***

### Screen 3 — Data Upload & Ingestion

```
┌─────────────────────────────────────────────────────────────────┐
│  🔷 BRD AGENT    [Dashboard] [Upload] [BRDs] [Metrics] [⚙️]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   📤 UPLOAD DATA SOURCES                                        │
│                                                                 │
│   ┌─────────────────────┐  ┌─────────────────────┐             │
│   │   📧 EMAILS         │  │   🎙️ TRANSCRIPTS    │             │
│   │  Drop CSV/JSON here │  │  Drop TXT/JSON here │             │
│   │  or [Browse Files]  │  │  or [Browse Files]  │             │
│   │                     │  │                     │             │
│   │  Supported:         │  │  Supported:         │             │
│   │  • Enron CSV format │  │  • AMI transcript   │             │
│   │  • Gmail export     │  │  • Outlook .pst     │  │  • Teams transcript │             │
│   └─────────────────────┘  └─────────────────────┘             │
│                                                                 │
│   ┌─────────────────────┐   Dataset Selector:                   │
│   │   💬 CHAT LOGS       │   (●) Use uploaded data              │
│   │  Drop files here    │   ( ) Use Enron + AMI demo dataset   │
│   └─────────────────────┘                                      │
│                                                                 │
│   UPLOAD QUEUE                                                  │
│   ┌─────────────────────────────────────────────────────┐      │
│   │ emails_q4.csv      │ 2.3MB │ ████████████ 100% ✅  │      │
│   │ standup_notes.txt   │ 340KB │ ██████░░░░░░  55% ⏳  │      │
│   └─────────────────────────────────────────────────────┘      │
│                                                                 │
│              [ Start Processing Pipeline → ]                    │
└─────────────────────────────────────────────────────────────────┘
```

**Components:** 3 drag-and-drop zones (Emails, Transcripts, Chat Logs), format validators, demo dataset toggle, upload queue with real-time progress, "Start Pipeline" trigger button.

***

### Screen 4 — Live BRD Generation (Streaming)

```
┌─────────────────────────────────────────────────────────────────┐
│  🔷 BRD AGENT    [Dashboard] [Upload] [BRDs] [Metrics] [⚙️]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   📄 BRD: Project Alpha — LIVE GENERATION                       │
│   Status: ● Streaming    Latency: 2.1s    Accuracy: 92.3%     │
│                                                                 │
│   ┌── PIPELINE PROGRESS ──────────────────────────────────┐    │
│   │ [✅ Ingest]→[✅ Filter]→[🔄 Extract]→[⏳ Gen]→[⏳ Val] │    │
│   └───────────────────────────────────────────────────────┘    │
│                                                                 │
│   ┌── BRD DOCUMENT (Live Stream) ─────────────────────────┐   │
│   │                                                       │    │
│   │  1. PROJECT OVERVIEW                                  │    │
│   │     Name: Project Alpha                               │    │
│   │     Objective: Migrate legacy CRM to cloud...        │    │
│   │                                                       │    │
│   │  2. STAKEHOLDERS                                      │    │
│   │     ┌──────────┬───────────┬──────────────┐          │    │
│   │     │ Name     │ Role      │ Extracted From│          │    │
│   │     │ J. Smith │ PM        │ Email #4521   │          │    │
│   │     │ A. Lee   │ Tech Lead │ Meeting #12   │          │    │
│   │     └──────────┴───────────┴──────────────┘          │    │
│   │                                                       │    │
│   │  3. FUNCTIONAL REQUIREMENTS                           │    │
│   │     FR-001: User authentication via SSO...  ▌        │    │
│   │     (streaming cursor)                                │    │
│   │                                                       │    │
│   │  4. NON-FUNCTIONAL REQUIREMENTS  (pending...)        │    │
│   │  5. SUCCESS METRICS              (pending...)        │    │
│   └───────────────────────────────────────────────────────┘    │
│                                                                 │
│   [⬇️ Export PDF] [⬇️ Export DOCX] [🔗 Share Link] [✏️ Edit]    │
└─────────────────────────────────────────────────────────────────┘
```

**Components:** Live status bar (streaming indicator, latency, accuracy), 5-phase pipeline stepper, BRD document viewer with streaming cursor (Vercel AI SDK), stakeholder table auto-populated from entities, export/share action bar.

***

### Screen 5 — Validation & Metrics Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  🔷 BRD AGENT    [Dashboard] [Upload] [BRDs] [Metrics] [⚙️]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   📈 VALIDATION & ACCURACY METRICS                              │
│                                                                 │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│   │ Overall    │ │ Precision  │ │ Recall     │ │ F1 Score   │ │
│   │  92.4%     │ │  94.1%     │ │  90.8%     │ │  92.4%     │ │
│   └────────────┘ └────────────┘ └────────────┘ └────────────┘ │
│                                                                 │
│   ┌── ACCURACY OVER TIME (Line Chart) ─────────────────────┐  │
│   │  95%|         ·  ·                                      │  │
│   │  90%|    ·  ·        ·  ·  ·                            │  │
│   │  85%|  ·                                                │  │
│   │     └──────────────────────────────────────────         │  │
│   │      BRD1  BRD2  BRD3  BRD4  BRD5  BRD6                │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌── NOISE FILTERING STATS ───────────────────────────────┐  │
│   │  Input: 500,000 emails  │  Output: 100,000 relevant    │  │
│   │  ████████████████████░░░░░░░░░░░░░░░░░░░░  80% removed │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌── PER-BRD COMPARISON ──────────────────────────────────┐  │
│   │ BRD Name    │ Accuracy │ Ground Truth │ Latency │ Reqs │  │
│   │ Project A   │  92.3%   │ AMI Match    │  2.1s   │  45  │  │
│   │ Project B   │  93.1%   │ AMI Match    │  1.8s   │  38  │  │
│   └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Components:** 4 metric cards (Accuracy, Precision, Recall, F1), accuracy-over-time line chart, noise filtering progress bar, per-BRD comparison table with ground truth validation status.

***

### Screen 6 — Settings & Configuration

```
┌─────────────────────────────────────────────────────────────────┐
│  🔷 BRD AGENT    [Dashboard] [Upload] [BRDs] [Metrics] [⚙️]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ⚙️ CONFIGURATION                                              │
│                                                                 │
│   AI Model Settings                                             │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ Model:           [GPT-4 ▼]                              │  │
│   │ Temperature:     [0.3 ━━━○━━━━━━━━━]                    │  │
│   │ Max Tokens:      [4096]                                 │  │
│   │ Noise Threshold: [0.2 ━━━━━○━━━━━━] (0-1 relevance)    │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   Export Preferences                                            │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ Default Format:  (●) PDF  ( ) DOCX  ( ) Markdown       │  │
│   │ Include Metadata: [✅]    Include Sources: [✅]          │  │
│   │ Auto-validate:    [✅]                                   │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   API Keys                                                      │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ OpenAI API Key:  [sk-•••••••••••••]  [Update]          │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│              [ Save Settings ]  [ Reset Defaults ]              │
└─────────────────────────────────────────────────────────────────┘
```

**Components:** Model selector dropdown, temperature/threshold sliders, export format radio buttons, metadata toggle checkboxes, API key management (masked input).

***

## Frontend Navigation Flowchart

```
                          ┌──────────┐
                          │  LANDING │
                          │   PAGE   │
                          └────┬─────┘
                               │
                         [Login/Signup]
                               │
                          ┌────▼─────┐
                     ┌────│DASHBOARD │────┐
                     │    └────┬─────┘    │
                     │         │          │
              ┌──────▼──┐ ┌───▼───┐ ┌────▼─────┐
              │  UPLOAD  │ │ BRDs  │ │ SETTINGS │
              │  DATA    │ │ LIST  │ │          │
              └────┬─────┘ └───┬───┘ └──────────┘
                   │           │
          [Start Pipeline]  [View BRD]
                   │           │
              ┌────▼───────────▼────┐
              │  LIVE BRD GENERATION │
              │  (Streaming View)    │
              └────────┬─────────────┘
                       │
                 [View Metrics]
                       │
              ┌────────▼─────────┐
              │   VALIDATION &   │
              │   METRICS        │
              └──────────────────┘
```

***

## Backend System Architecture

### High-Level Architecture

```
                            ┌──────────────┐
                            │   CLIENT     │
                            │  (Browser)   │
                            │  Next.js 14  │
                            └──────┬───────┘
                                   │
                          HTTPS / WebSocket
                                   │
                            ┌──────▼───────┐
                            │   VERCEL     │
                            │  Edge/SSR    │
                            │  Next.js API │
                            └──────┬───────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
             ┌──────▼──────┐ ┌────▼────┐  ┌──────▼──────┐
             │  Auth Layer │ │ REST    │  │ WebSocket  │
             │  (NextAuth  │ │ Routes  │  │  Server    │
             │   / OAuth)  │ │ /api/*  │  │ (Streaming)│
             └──────┬──────┘ └────┬────┘  └──────┬──────┘
                    │             │              │
                    └──────┬──────┴──────────────┘
                           │
                    ┌──────▼──────────┐
                    │   FASTAPI       │
                    │   (Python)      │
                    │   Gateway       │
                    └──────┬──────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
   ┌──────▼──────┐  ┌─────▼──────┐  ┌──────▼──────┐
   │ INGESTION   │  │   AGENT    │  │ VALIDATION  │
   │ SERVICE     │  │  PIPELINE  │  │  SERVICE    │
   │             │  │            │  │             │
   │ • CSV Parse │  │ • Planner  │  │ • AMI GT    │
   │ • Transcript│  │   Agent    │  │   Compare   │
   │   Parse     │  │ • Writer   │  │ • Accuracy  │
   │ • Metadata  │  │   Agent    │  │   Scoring   │
   │ • Chunking  │  │   Calls    │  │ • F1/Prec/  │
   └──────┬──────┘  └─────┬──────┘  └──────┬──────┘
          │               │                │
          │        ┌──────▼──────┐         │
          │        │  NOISE      │         │
          │        │  FILTER     │         │
          │        │ Score 0→1   │         │
          │        │ Cutoff: 0.2 │         │
          │        └──────┬──────┘         │
          │               │                │
          └───────┬───────┴────────┬───────┘
                  │                │
           ┌──────▼──────┐  ┌─────▼───────┐
           │ PostgreSQL  │  │   Redis     │
           │  (Prisma)   │  │   Cache     │
           │             │  │             │
           │ • Users     │  │ • Sessions  │
           │ • BRDs      │  │ • Job Queue │
           │ • Documents │  │ • Stream    │
           │ • Metrics   │  │   Buffer    │
           │ • Audit Log │  │             │
           └─────────────┘  └─────────────┘
```

The backend follows a **microservice-inspired monolith** pattern — a single FastAPI application with cleanly separated service modules, backed by PostgreSQL (Prisma ORM) for persistence and Redis for caching/job queues.[1]

***

### Agent Pipeline Detail

```
  RAW INPUT (Emails + Transcripts + Chat Logs)
       │
       ▼
  ┌─────────────────────┐
  │  1. INGESTION       │   Parse CSV → extract sender, date, subject, body
  │     SERVICE         │   Parse AMI → speaker, timestamp, utterance
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │  2. NOISE FILTER    │   AI relevance scoring (0–1) per document
  │                     │   if score < 0.2 → DISCARD
  │                     │   500K emails → 100K relevant (80% removed)
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │  3. ENTITY          │   NER + NLP pipeline extracts:
  │     EXTRACTION      │   Stakeholders, Decisions, Deadlines,
  │                     │   Dependencies, Risk Flags
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────────────────────────────┐
  │  4. MULTI-AGENT BRD GENERATION              │
  │                                             │
  │   PLANNER AGENT          WRITER AGENT       │
  │   ┌──────────────┐      ┌──────────────┐   │
  │   │ Analyze all  │      │ Generate:    │   │
  │   │ entities     │─────▶│ • Overview   │   │
  │   │ Build context│      │ • Stakehold. │   │
  │   │ graph        │      │ • Func Reqs  │   │
  │   │ Determine    │      │ • Non-Func   │   │
  │   │ BRD struct.  │      │ • Metrics    │   │
  │   └──────────────┘      │              │   │
  │                         │ Stream via   │   │
  │                         │ WebSocket    │   │
  │                         │ (<3s/section)│   │
  │                         └──────┬───────┘   │
  └────────────────────────────────┼───────────┘
                                   │
                                   ▼
  ┌─────────────────────┐
  │  5. VALIDATION      │   Compare output vs AMI Corpus human summaries
  │     ENGINE          │   Calculate: Accuracy, Precision, Recall, F1
  │                     │   Target: 92%+
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │  6. OUTPUT &        │   Save BRD → PostgreSQL
  │     STORAGE         │   Cache → Redis
  │                     │   Stream → Client UI
  │                     │   Generate → PDF/DOCX exports
  └─────────────────────┘
```

Each phase reports its progress back to the frontend via Server-Sent Events (SSE), enabling the pipeline stepper UI on Screen 4 to update in real-time.[1]

***

### Database Schema

```
  ┌──────────────┐     ┌──────────────────┐     ┌───────────────┐
  │    users     │     │     projects     │     │     brds      │
  ├──────────────┤     ├──────────────────┤     ├───────────────┤
  │ id (PK)      │──┐  │ id (PK)          │──┐  │ id (PK)       │
  │ email        │  │  │ name             │  │  │ project_id(FK)│
  │ name         │  │  │ description      │  │  │ title         │
  │ password_hash│  └─▶│ owner_id (FK)    │  └─▶│ status        │
  │ oauth_provider│    │ created_at       │     │ content_json  │
  │ created_at   │     │ updated_at       │     │ accuracy_score│
  └──────────────┘     └──────────────────┘     │ latency_ms    │
                                                │ created_at    │
  ┌──────────────┐     ┌──────────────────┐     └───────────────┘
  │  documents   │     │   entities       │
  ├──────────────┤     ├──────────────────┤     ┌───────────────┐
  │ id (PK)      │     │ id (PK)          │     │  validations  │
  │ project_id   │     │ document_id (FK) │     ├───────────────┤
  │ type (email/ │     │ type (person/    │     │ id (PK)       │
  │  transcript/ │     │  decision/date)  │     │ brd_id (FK)   │
  │  chat)       │     │ value            │     │ accuracy      │
  │ raw_content  │     │ confidence       │     │ precision     │
  │ relevance_   │     │ source_ref       │     │ recall        │
  │  score       │     └──────────────────┘     │ f1_score      │
  │ is_relevant  │                              │ ground_truth_ │
  │ metadata_json│     ┌──────────────────┐     │  ref          │
  └──────────────┘     │   job_queue      │     └───────────────┘
                       ├──────────────────┤
                       │ id (PK)          │
                       │ project_id (FK)  │
                       │ status           │
                       │ current_phase    │
                       │ progress_pct     │
                       │ error_log        │
                       │ started_at       │
                       │ completed_at     │
                       └──────────────────┘
```

**7 tables** cover the full data model: `users`, `projects`, `brds`, `documents`, `entities`, `validations`, and `job_queue`. The `job_queue` table tracks each pipeline run's phase and progress for real-time UI updates.[1]

***

### API Route Map

| Layer | Route | Method | Purpose |
|-------|-------|--------|---------|
| **Next.js** | `/api/auth/[...nextauth]` | ALL | NextAuth OAuth handlers |
| **Next.js** | `/api/projects` | GET/POST | List & create projects |
| **Next.js** | `/api/projects/[id]` | GET/PUT/DELETE | Project CRUD |
| **Next.js** | `/api/upload` | POST | Multipart file upload |
| **Next.js** | `/api/stream/[jobId]` | WS | WebSocket BRD streaming |
| **FastAPI** | `/ingest` | POST | Receive & parse uploaded files |
| **FastAPI** | `/ingest/demo` | POST | Load Enron + AMI demo data |
| **FastAPI** | `/pipeline/start` | POST | Kick off full agent pipeline |
| **FastAPI** | `/pipeline/status/[id]` | GET | Pipeline phase + progress |
| **FastAPI** | `/brd/[id]` | GET | Fetch generated BRD |
| **FastAPI** | `/brd/[id]/stream` | GET (SSE) | Live generation stream |
| **FastAPI** | `/validate/[brd_id]` | POST | Run validation vs ground truth |
| **FastAPI** | `/metrics/[brd_id]` | GET | Fetch accuracy metrics |
| **FastAPI** | `/metrics/overview` | GET | Aggregate dashboard metrics |
| **FastAPI** | `/health` | GET | Health check |

***

## Project File Structure

```
brd-agent/
├── 📁 frontend/ (Next.js 14)
│   ├── 📁 app/
│   │   ├── (auth)/login/page.tsx
│   │   ├── (auth)/signup/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── upload/page.tsx
│   │   ├── brd/page.tsx
│   │   ├── brd/[id]/page.tsx          ← Live BRD stream view
│   │   ├── metrics/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx                   ← Landing page
│   ├── 📁 components/
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── StatCard.tsx
│   │   ├── BrdCard.tsx
│   │   ├── PipelineProgress.tsx
│   │   ├── FileUploader.tsx
│   │   ├── BrdStreamViewer.tsx        ← Vercel AI SDK streaming
│   │   ├── MetricsChart.tsx
│   │   ├── StakeholderTable.tsx
│   │   └── ExportButtons.tsx
│   ├── 📁 lib/
│   │   ├── auth.ts                    ← NextAuth config
│   │   ├── api.ts                     ← FastAPI client wrapper
│   │   ├── prisma.ts
│   │   └── utils.ts
│   ├── 📁 prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── 📁 backend/ (FastAPI + Python)
│   ├── 📁 app/
│   │   ├── main.py                    ← FastAPI entry point
│   │   ├── 📁 routers/
│   │   │   ├── ingest.py
│   │   │   ├── pipeline.py
│   │   │   ├── brd.py
│   │   │   ├── validate.py
│   │   │   └── metrics.py
│   │   ├── 📁 agents/
│   │   │   ├── planner_agent.py
│   │   │   ├── writer_agent.py
│   │   │   └── orchestrator.py
│   │   ├── 📁 services/
│   │   │   ├── ingestion.py
│   │   │   ├── noise_filter.py
│   │   │   ├── entity_extractor.py
│   │   │   ├── validator.py
│   │   │   └── exporter.py
│   │   ├── 📁 models/
│   │   │   ├── schemas.py
│   │   │   └── db.py
│   │   └── 📁 utils/
│   │       ├── openai_client.py
│   │       ├── redis_client.py
│   │       └── config.py
│   ├── 📁 data/
│   │   ├── enron_sample.csv
│   │   └── ami_transcripts/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env
│
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

***

## Development Workflow: From Code to Production

This workflow assumes the frontend and backend are functionally built. The following 5 phases take the application from "code complete" to "demo-ready for judges" — with 100% functionality and zero bugs.

### Phase 1 — Integration Testing

**Goal:** Wire frontend ↔ backend and verify real data flows end-to-end.

```
  ┌─────────────────────────────────────────────┐
  │  Wire Next.js API routes to FastAPI          │
  │  • Proxy /api/* → FastAPI endpoints          │
  │  • Test CORS headers                         │
  │  • Verify auth token passthrough             │
  └──────────────────┬──────────────────────────┘
                     ▼
  ┌─────────────────────────────────────────────┐
  │  Test WebSocket Streaming                    │
  │  • Connect Vercel AI SDK → SSE endpoint      │
  │  • Verify real-time BRD text appears in UI   │
  │  • Test reconnection on drop                 │
  └──────────────────┬──────────────────────────┘
                     ▼
  ┌─────────────────────────────────────────────┐
  │  End-to-End Data Flow Test                   │
  │  • Upload CSV → See pipeline progress →      │
  │    Watch BRD stream → View metrics           │
  └─────────────────────────────────────────────┘

  ✅ GATE: All screens load real data, zero mock data
```

***

### Phase 2 — Functionality Testing (100% Bug-Free)

**Goal:** Systematically verify every feature works perfectly across all screens.

**Auth Testing:**
- Google OAuth login → redirect → dashboard
- GitHub OAuth login → redirect → dashboard
- Email/password signup + login
- Protected routes redirect unauthenticated users
- Session persistence across page refresh
- Logout clears session completely

**Upload Testing:**
- CSV upload (small: 100 rows)
- CSV upload (large: 500K rows) — no crash
- Transcript upload (AMI format)
- Invalid file format → clear error message
- Empty file → handled gracefully
- Progress bar updates in real-time
- Demo dataset loads correctly

**Pipeline Testing:**
- Noise filter removes 80%+ irrelevant docs
- Entity extraction finds stakeholders, decisions, dates
- Pipeline progress updates in real-time
- Pipeline failure → clear error + retry button
- Cancel running pipeline works

**BRD Generation Testing:**
- BRD streams in real-time (<3s per section)
- All 5 BRD sections generated correctly
- Stakeholder table populated from entities
- Functional & non-functional requirements present
- PDF export produces valid file
- DOCX export produces valid file
- Share link generates working URL

**Validation Testing:**
- Accuracy score computed vs AMI ground truth
- Precision, Recall, F1 displayed correctly
- Metrics dashboard loads all charts
- Accuracy ≥ 92% on AMI benchmark

```
  ✅ GATE: Every checkbox above is GREEN
```

***

### Phase 3 — Performance & Edge Case Hardening

**Goal:** Stress test and bulletproof every edge case.

| Target | Threshold |
|--------|-----------|
| Page load time | < 2s (Lighthouse > 90) |
| BRD generation latency | < 3s per section |
| Large file upload | 500K row CSV without crash |
| Concurrent users | 10+ simultaneous jobs |
| WebSocket stability | Connected 30+ minutes |

**Edge cases to handle:**

- Network disconnect mid-stream → auto-reconnect
- OpenAI API rate limit → queue and retry with backoff
- Malformed CSV columns → skip rows + warn user
- Empty email body → skip in pipeline
- Non-English content → graceful fallback
- Browser tab closed → job continues server-side
- Database connection pool exhausted → retry logic

```
  ✅ GATE: All performance targets met, all edge cases handled
```

***

### Phase 4 — Deployment Pipeline

**Goal:** Ship to production with a repeatable deploy process.

```
  ┌────────────────┐
  │ 1. ENV SETUP   │  DATABASE_URL, OPENAI_API_KEY,
  │                │  NEXTAUTH_SECRET, REDIS_URL
  └───────┬────────┘
          ▼
  ┌────────────────┐
  │ 2. DATABASE    │  npx prisma migrate deploy
  │    MIGRATE     │  npx prisma db seed (Enron + AMI demo)
  └───────┬────────┘
          ▼
  ┌────────────────┐
  │ 3. BACKEND     │  FastAPI → Railway / Render
  │    DEPLOY      │  Docker build + deploy
  └───────┬────────┘
          ▼
  ┌────────────────┐
  │ 4. FRONTEND    │  Next.js → Vercel
  │    DEPLOY      │  git  push → auto deploy + preview URLs
  └───────┬────────┘
          ▼
  ┌────────────────┐
  │ 5. SMOKE TEST  │  Login → Upload → Pipeline → BRD →
  │    Metrics → Export — all work on live URL
  └───────┬────────┘
          ▼
  ┌────────────────┐
  │ 6. DEMO READY  │  Pre-load Enron + AMI, have 1 BRD
  │                │  pre-generated for instant demo
  └────────────────┘

  ✅ GATE: Live URL works end-to-end
```

**Quick commands:**
```bash
# Local Development
cd frontend && npm run dev            # Next.js on :3000
cd backend && uvicorn app.main:app    # FastAPI on :8000

# Database
npx prisma migrate dev                # Run migrations
npx prisma studio                     # Visual DB browser
npx prisma db seed                    # Seed demo data

# Deploy
git  push origin main                  # Vercel auto-deploys frontend
railway up                            # Deploy FastAPI backend
```

***

### Phase 5 — Demo Preparation

**Goal:** Be presentation-ready for HackFest 2.0 judges.

- Pre-seed database with Enron emails + AMI transcripts
- Have 1 fully generated BRD ready to show instantly
- Prepare a **live demo flow**: Login → Upload → Watch Pipeline → See BRD Stream → Check Metrics → Export PDF
- Record a **backup video demo** in case live demo fails
- GitHub README with screenshots, architecture diagram, and setup instructions
- Test on 3 different browsers (Chrome, Firefox, Safari)
- Test on mobile viewport for responsive design

```
  🏆 SHIP IT — READY FOR HACKFEST 2.0 JUDGING
```

***

## Tech Stack Summary

| Layer | Technology | Role |
|-------|-----------|------|
| Frontend | Next.js 14 | Full-stack React framework[1] |
| Streaming UI | Vercel AI SDK | Real-time BRD streaming[1] |
| Auth | NextAuth.js | OAuth (Google, GitHub) + credentials |
| ORM | Prisma | Type-safe PostgreSQL access[1] |
| Backend API | FastAPI (Python) | High-performance REST + SSE[1] |
| AI Backbone | OpenAI GPT-4 | Language model for agents[1] |
| Agent 1 | BRD Planner Agent | Context analysis + BRD structure[1] |
| Agent 2 | Requirement Writer | Functional spec generation[1] |
| Database | PostgreSQL | Relational data storage[1] |
| Cache/Queue | Redis | Sessions, job queue, stream buffer |
| Frontend Deploy | Vercel | Auto-deploy from Git[1] |
| Backend Deploy | Railway / Render | Docker container hosting |
| Datasets | Enron (500K emails) + AMI (279 transcripts) | Training & validation data[1] |
