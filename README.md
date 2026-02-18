# Multi-Agent BRD Generation System

## Project Overview

A sophisticated Business Requirement Document (BRD) generation system powered by multiple AI agents. This system uses advanced prompt engineering and multi-agent orchestration to transform raw ideas and meeting notes into professional, structured BRDs.

## Key Features

- **Multi-Agent Architecture**: BRD Planner Agent + Requirement Writer Agent
- **Intelligent Clarification**: Automatically asks targeted follow-up questions for vague requirements
- **Structured Output**: Generates professional BRDs with Executive Summary, Functional/Non-Functional Requirements, User Personas, and Success Metrics
- **Version Control**: Track BRD iterations and drafts in PostgreSQL
- **Real-time Streaming**: Stream generated content to users with WebSocket support
- **Full-stack**: Next.js frontend, Vercel AI SDK, Prisma ORM, PostgreSQL database

## Tech Stack

- **Frontend**: Next.js 15+ with TypeScript, Tailwind CSS
- **AI**: Vercel AI SDK with OpenAI/Anthropic models
- **Database**: PostgreSQL with Prisma ORM
- **Hosting**: Vercel (serverless deployment)
- **Architecture**: Multi-agent pattern with orchestration

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Multi-agent orchestration API
│   ├── page.tsx                   # Main chat interface
│   └── layout.tsx                 # App layout
├── lib/
│   ├── prisma.ts                  # Prisma client instance
│   └── agents/
│       ├── brd-planner.ts         # BRD Planner Agent
│       └── requirement-writer.ts  # Requirement Writer Agent
├── prisma/
│   └── schema.prisma              # Database schema
├── .env.local                     # Environment variables
└── package.json
```

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd -Multi-Agent-Document-Generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```

Update `.env.local` with:
```
OPENAI_API_KEY=your_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/brd_generator
```

### 4. Set up database
```bash
npm run db:push
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Two-Stage BRD Generation

1. **Stage 1: Clarification (BRD Planner Agent)**
   - Evaluates user input for vagueness
   - Asks 3-5 targeted follow-up questions if needed
   - Analyzes responses to build a structured outline

2. **Stage 2: Full Document Generation (Requirement Writer Agent)**
   - Expands the outline into complete BRD sections
   - Writes "The system shall..." functional requirements
   - Defines non-functional requirements (performance, security, scalability)
   - Creates user personas and success metrics

### Agent System Prompts

Each agent has a specific role with detailed instructions:

- **BRD Planner**: Structure validation, follow-up question logic
- **Requirement Writer**: Detailed expansion, formatting, requirement standards

## API Routes

### POST /api/chat

Request body:
```json
{
  "messages": [{"role": "user", "content": "I want a taxi app"}],
  "projectName": "Taxi Booking Platform",
  "stage": "clarify" | "generate"
}
```

Response: Streaming text (uses AI SDK's `toDataStreamResponse()`)

## Database Schema

```prisma
model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  documents   BRD[]
}

model BRD {
  id          String   @id @default(cuid())
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id])
  version     Int      @default(1)
  content     Json
  rawInput    String
  generatedBy String   @default("gpt-4o")
  status      String   @default("draft")
  createdAt   DateTime @default(now())
}
```

## Development Guide

### Testing the Workflow

1. **Vague Input Test**:
   - Input: "I want a taxi app"
   - Expected: Agent asks 5 clarifying questions

2. **Detailed Input Test**:
   - Input: Full requirements with scope, users, features
   - Expected: Generates complete BRD directly

3. **Database Persistence**:
   - Check that BRDs are saved with correct version numbers

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `API_SECRET_KEY` | Secret key for API authentication (Server-side) | Yes |
| `NEXT_PUBLIC_API_KEY` | API Key for client-side requests (Must match API_SECRET_KEY) | Yes |

## Future Enhancements

- [ ] BRD Reviewer Agent for validation
- [ ] Export to PDF/Word
- [ ] Collaboration features (real-time editing)
- [ ] Requirement templates library
- [ ] Integration with JIRA/Azure DevOps
- [ ] Fine-tuned model for BRD generation
- [ ] Cost tracking for AI API calls

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

## Acknowledgments

- Built with [Vercel AI SDK](https://ai-sdk.dev/)
- Inspired by [n8n Multi-agent BRD Workflow](https://n8n.io/workflows/7486-generate-business-requirement-documents-with-multi-agent-gpt-and-google-workspace/)
- Uses [Prisma](https://www.prisma.io/) for database management
