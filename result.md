# Multi-Agent BRD Generator

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.0-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.0.0-1B222D?logo=prisma)
![License](https://img.shields.io/badge/license-MIT-green.svg)

AI-powered Business Requirement Document generation using a multi-agent architecture. Generate production-ready BRDs from raw ideas via a real-time, two-agent workflow.

---

## 📸 Demo

> *(Placeholder for UI screenshot or GIF demo)*
>
> *Above: The chat interface with dual agents actively clarifying requirements and generating a final BRD.*

---

## ✨ Features

- **Dual-Agent Architecture:** A *Planner* agent asks clarifying questions, and a *Requirement Writer* agent drafts the full BRD.
- **Real-Time Streaming:** Responsive Next.js chat interface with live streaming powered by the Vercel AI SDK.
- **Robust Persistence:** Store project context, documents, and histories securely via PostgreSQL and Prisma ORM.
- **Built-in Observability:** Dedicated `/api/metrics` and `/api/analytics` endpoints for health monitoring and usage tracking.
- **Modern Tech Stack:** Bleeding-edge Next.js 15 (App Router), React 19, and Tailwind CSS.
- **External Caching (Optional):** Redis support for performance optimization and rate limiting.

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI & Styling:** React 19, Tailwind CSS
- **Language:** TypeScript
- **Database ORM:** Prisma
- **AI Integration:** Vercel AI SDK (`@ai-sdk/openai`, `@ai-sdk/anthropic`)
- **Database Layer:** PostgreSQL
- **Testing:** Native Node.js test runner (`node:test`) with `tsx`

---

## 📂 Project Structure

```text
.
├── app/                  # Next.js App Router: UI components, layouts, pages
│   └── api/              # API endpoints (chat, metrics, analytics)
├── backend/              # Separate backend service directory (Python/agents)
├── docs/                 # Extended architectural and deployment guides
├── lib/                  # Core logic, cache, analytics, and env configurations
│   └── agents/           # AI Agent implementations (Planner, Writer)
├── prisma/               # Database definitions and migrations
│   └── schema.prisma     # Prisma schema (Project, BRD, etc.)
├── public/               # Static frontend assets
└── package.json          # Project metadata, scripts, and dependencies
```

---

## ⚙️ Prerequisites

Before getting started, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **pnpm** (Package manager required for this repository)
- **PostgreSQL** (Local or cloud database instance)
- **OpenAI API Key** (Required for the LLM agents)

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd multi-agent-brd-generator
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   *Edit `.env.local` to include your `OPENAI_API_KEY` and PostgreSQL `DATABASE_URL`.*

4. **Initialize the database:**
   ```bash
   pnpm run db:push
   ```

5. **Start the development server:**
   ```bash
   pnpm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

---

## 💻 Usage

Once running, navigate to the web interface to interact with the BRD generator UI. You can also interact with the core logic directly via the backend API.

### API Example: Chat Completion

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "I want to build a ride-sharing app"}],
    "projectName": "RideShare Platform",
    "stage": "clarify"
  }'
```

**Expected Output:** A text stream (`text/event-stream`) representing the AI planner asking clarifying follow-up questions or drafting the BRD.

---

## 🔐 Environment Variables

| Variable | Description | Required | Example |
|---|---|:---:|---|
| `OPENAI_API_KEY` | OpenAI API key for LLM generation | **Yes** | `sk-...` |
| `DATABASE_URL` | PostgreSQL connection string | **Yes** | `postgresql://user:password@localhost:5432/brd_generator` |
| `NEXT_PUBLIC_APP_URL` | Base URL of the deployed app | No | `http://localhost:3000` |
| `ANTHROPIC_API_KEY` | Optional Anthropic API key (fallback routing) | No | `sk-ant-...` |
| `REDIS_URL` | Redis URL for caching & rate-limiting | No | `redis://localhost:6379` |
| `NODE_ENV` | Environment context | No | `development` |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Toggle internal tracking | No | `true` |
| `SESSION_SECRET` | Secret key for secure cookies | No | `super-secret-key` |
| `RATE_LIMIT_REQUESTS_PER_MINUTE` | Rate limit threshold | No | `60` |
| `LOG_LEVEL` | Application logging verbosity | No | `info` |

---

## 📚 API Reference

### `POST /api/chat`
Orchestrates the two-agent workflow for project clarification and BRD generation.

**Parameters (JSON Body):**
- **`messages`** *(Array)*: The array of chat history objects (max 50 messages).
- **`projectName`** *(String)*: Name of the target project (max 100 characters).
- **`stage`** *(String)*: Workflow step, must be `"clarify"` or `"generate"`.

### `GET /api/metrics`
Returns system performance, health metrics, and database connectivity status.

### `GET /api/analytics`
Returns sanitized event tracking and session data.

---

## 🛠 Configuration

- **Next.js (`next.config.js`)**: Framework-level configurations and routing options.
- **Tailwind CSS (`tailwind.config.ts`)**: Custom design system themes and stylings.
- **Database Schema (`prisma/schema.prisma`)**: Define data models here. Run `pnpm run db:push` to sync local schema or `pnpm run db:migrate` for production deployments.

---

## 🤝 Contributing

We welcome contributions! To ensure a stable build:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add NewFeature'`).
4. **Important:** Run tests before submitting. (Use `pnpm run lint` and `pnpm test`).
5. Push to your branch (`git push origin feature/NewFeature`).
6. Open a Pull Request.

*(Note: Security issues should be documented internally in `.jules/sentinel.md` per our guidelines. Do not expose vulnerability details in public pull requests.)*

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

## 🙏 Acknowledgements

- Powered by [Next.js](https://nextjs.org/) and [React](https://react.dev/).
- AI interactions facilitated by the [Vercel AI SDK](https://sdk.vercel.ai/).
- PostgreSQL ORM by [Prisma](https://www.prisma.io/).
