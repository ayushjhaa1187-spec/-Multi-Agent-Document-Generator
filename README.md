# -Multi-Agent-Document-Generator
> Transforming raw business ideas into structured requirement documents using autonomous agents.

![language](https://img.shields.io/badge/language-TypeScript-blue) ![license](https://img.shields.io/badge/license-MIT-green) ![last commit](https://img.shields.io/github/last-commit/ayushjhaa1187-spec/-Multi-Agent-Document-Generator) ![repo size](https://img.shields.io/github/repo-size/ayushjhaa1187-spec/-Multi-Agent-Document-Generator)

> *"He(1) stared(2) at(3) the(4) disorganized(5) stack(6) of(7) meeting(8) notes,(9) twenty(10) pages(11) of(12) chaotic(13) scribbles.(14) The(15) project(16) draft(17) was(18) due(19) at(20) midnight.(21) He(22) loaded(23) the(24) agents.(25) One(26) click.(27) One(28) stream.(29) The(30) multi-agent(31) brain(32) synthesized(33) every(34) bullet(35) point(36) into(37) a(38) professional(39) BRD.(40)"*

## WHAT THIS DOES
The Multi-Agent BRD Generator is a sophisticated orchestration system that solves the "Requirement Gap" problem in software development. It leverages a dual-agent architecture—a Planner Agent to clarify vagueness and a Writer Agent to expand outlines into complete document sections. By using real-time streaming and structured feedback loops, it automates the creation of Executive Summaries, Functional Requirements, and Success Metrics.

## TECH STACK
| Layer | Technology |
| :--- | :--- |
| Frontend | Next.js 15+ (App Router) |
| AI Orchestration | Vercel AI SDK |
| Models | OpenAI / Anthropic |
| ORM | Prisma |
| Database | PostgreSQL |

## QUICK START
```bash
# 1. Clone
git clone https://github.com/ayushjhaa1187-spec/-Multi-Agent-Document-Generator

# 2. Install
npm install

# 3. Setup Database & Run
npm run db:push
npm run dev
```
Add: "Expected output: Next.js server started and database schema pushed successfully."

## FEATURES TABLE
| Feature | Why it matters |
| :--- | :--- |
| Dual-Agent Architecture | Planner Agent clarifies user vagueness while Writer Agent handles expansion. |
| Intelligent Clarification | Automatically asks 3-5 targeted follow-up questions for underspecified ideas. |
| Structured Outputs | Generates professional-grade BRDs containingpersonas and success metrics. |
| DB Persistence | Built-in PostgreSQL integration to manage document versions and drafts. |
| Real-time Streaming | Watch the agents collaborate and build your document live via WebSockets. |

## HOW IT WORKS
```mermaid
graph TD
    Input[Raw User Idea] --> Planner[BRD Planner Agent]
    Planner --> Questions{Vague?}
    Questions -- Yes --> User((User Clarification))
    User --> Planner
    Questions -- No --> Writer[Requirement Writer Agent]
    Writer --> DB[(PostgreSQL)]
    Writer --> Output[Final Structured BRD]
```
The architecture operates as a two-stage state machine using the Vercel AI SDK. Stage 1 (Clarification) uses the Planner Agent to validate the logical depth of the user's input. If gaps are found, it triggers a dialogue loop to gather more context. Once validated, Stage 2 (Expansion) engages the Writer Agent to transform the validated outline into a formal JSON-mapped document structure.

## PROJECT STRUCTURE
```
-Multi-Agent-Document-Generator/
├── app/          # Core chat interface and API orchestration routes
├── lib/agents/   # System prompts and multi-agent brain logic
├── prisma/       # Database schema and migration management
├── components/   # Reusable UI components for the document viewer
└── next.config.js # Framework optimization and environment routing
```

## CONFIGURATION
```bash
# .env.local
OPENAI_API_KEY=sk-your_key_here
DATABASE_URL="postgresql://user:pass@localhost:5432/brd_gen"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## ROADMAP
| Feature | Status | Priority |
| :--- | :--- | :--- |
| Multi-Agent Core | ✅ Done | High |
| PDF Export | 🔧 In Progress | Medium |
| JIRA Integration | 📋 Planned | Low |

## CONTRIBUTING
We are looking for help with the automated reviewer agent logic.
1. Fork → 2. Branch (`git checkout -b feat/your-improvement`) → 3. PR → 4. Review

## LICENSE + FOOTER
License: MIT
Built by ayushjhaa1187-spec · Give it a ⭐ if it helped you
