# Implementation Guide - Multi-Agent BRD Generation System

## Quick Start

1. **Create Next.js App Structure:**
   ```
   mkdir -p app/api/chat lib/agents
   ```

2. **Create the following files:**

### 1. app/layout.tsx
```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BRD Generator',
  description: 'AI-powered Business Requirement Document generation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  );
}
```

### 2. lib/prisma.ts
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 3. lib/agents/brd-planner.ts
```typescript
export const BRD_PLANNER_SYSTEM_PROMPT = `You are a Senior Business Analyst Agent called the BRD Planner Agent.

Your responsibilities:
- Transform raw user ideas into a clear BRD OUTLINE.
- Decide whether to ask clarifying questions or generate the outline.
- Keep content business-oriented and implementation-agnostic.

STRUCTURE YOUR BRD OUTLINE:
1. Executive Summary
2. Business Objectives (SMART)
3. Scope and Out of Scope
4. Key Stakeholders and User Personas
5. High-Level Features
6. Assumptions and Constraints
7. Risks and Dependencies
8. Success Metrics / KPIs

FOLLOW-UP QUESTION RULES:
- If input is vague (e.g., "I want a taxi app"), ask 3-5 targeted follow-up questions.
- If input is moderately detailed, ask 2-3 additional questions.
- If input is detailed with clear scope, proceed to generate the BRD outline.

QUESTION THEMES:
- Scope & users
- Core features & workflows
- Integrations & data
- Constraints (budget, timeline, compliance)
- Success criteria

OUTPUT RULES:
- When asking questions: output ONLY numbered questions.
- When generating outline: use clean Markdown headings (##, ###) and bullet points.
- Keep language professional, concise, and unambiguous.`;
```

### 4. lib/agents/requirement-writer.ts
```typescript
export const REQUIREMENT_WRITER_SYSTEM_PROMPT = `You are a Requirement Writer Agent working with a Senior Business Analyst.

Your responsibilities:
- Take a BRD outline and clarified notes and expand into a full BRD.
- Convert business needs into precise requirement statements.

STRUCTURE YOUR OUTPUT:
1. Executive Summary
2. Business Objectives
3. Detailed Scope
4. Functional Requirements
5. Non-Functional Requirements
6. User Personas & User Stories
7. Assumptions & Constraints
8. Risks & Mitigations
9. Success Metrics

REQUIREMENT STANDARDS:
- Functional Requirements: "The system shall ..." statements.
- Non-Functional Requirements: performance, security, availability, usability, scalability.
- User Personas: role, goals, pain points.
- User Stories: "As a [user type], I want [goal] so that [business value]."

LANGUAGE & FORMAT:
- Professional, clear, concise language.
- Markdown headings and bullet lists.
- State assumptions explicitly if information is missing.`;
```

### 5. app/api/chat/route.ts
```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { prisma } from '@/lib/prisma';
import { BRD_PLANNER_SYSTEM_PROMPT } from '@/lib/agents/brd-planner';
import { REQUIREMENT_WRITER_SYSTEM_PROMPT } from '@/lib/agents/requirement-writer';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, projectName, stage } = await req.json();

  // Stage 1: BRD Planner Agent
  const plannerResult = streamText({
    model: openai('gpt-4o'),
    system: BRD_PLANNER_SYSTEM_PROMPT,
    messages,
  });

  const plannerText = await (await plannerResult).text;

  // Check if clarification needed (questions only)
  const needsClarification = stage !== 'generate' &&
    /\?\s*$/.test(plannerText.trim().split('\n').slice(-1)[0] || '');

  if (needsClarification) {
    return plannerResult.toDataStreamResponse();
  }

  // Stage 2: Requirement Writer Agent
  const writerResult = streamText({
    model: openai('gpt-4o'),
    system: REQUIREMENT_WRITER_SYSTEM_PROMPT,
    messages: [
      ...messages,
      { role: 'assistant', content: plannerText },
    ],
    onFinish: async ({ text }) => {
      // Save to database
      const project = await prisma.project.upsert({
        where: { name: projectName || 'Untitled Project' },
        create: { name: projectName || 'Untitled Project' },
        update: {},
      });

      const maxVersion = await prisma.bRD.findFirst({
        where: { projectId: project.id },
        orderBy: { version: 'desc' },
        select: { version: true },
      });

      await prisma.bRD.create({
        data: {
          projectId: project.id,
          version: (maxVersion?.version || 0) + 1,
          content: { raw: text },
          rawInput: messages[messages.length - 1]?.content || '',
          status: 'draft',
        },
      });
    },
  });

  return writerResult.toDataStreamResponse();
}
```

### 6. app/page.tsx
```typescript
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [projectName, setProjectName] = useState('');
  const [stage, setStage] = useState<'clarify' | 'generate'>('clarify');
  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    api: '/api/chat',
    body: { projectName, stage },
  });

  const lastAssistantMessage = messages
    .filter(m => m.role === 'assistant')
    .at(-1);
  const onlyQuestions = lastAssistantMessage &&
    lastAssistantMessage.content.split('\n').every(line => line.trim().endsWith('?'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-blue-400">BRD Generator</h1>
        <p className="text-slate-400 mb-6">AI-powered Business Requirement Document</p>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Project name (optional)"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500"
          />
        </div>

        <div className="bg-slate-800 rounded-lg h-96 overflow-y-auto p-4 mb-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded ${msg.role === 'user' ? 'bg-blue-900 ml-12' : 'bg-slate-700 mr-12'}`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Describe your project or answer the questions..."
            className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
          >
            Send
          </button>
        </form>

        {onlyQuestions && stage === 'clarify' && (
          <button
            onClick={() => setStage('generate')}
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded text-white font-medium"
          >
            Generate BRD from My Answers
          </button>
        )}
      </div>
    </div>
  );
}
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Prisma:**
   ```bash
   npm run db:push
   ```

3. **Configure environment variables** in `.env.local`

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Key Features Implemented

✅ Multi-agent architecture (Planner + Writer)
✅ Intelligent clarification questions
✅ Two-stage BRD generation
✅ Real-time streaming responses
✅ PostgreSQL persistence with Prisma
✅ Version control for BRD documents
✅ Clean, professional React UI
✅ TypeScript type safety

## Testing the System

1. **Test vague input:** "I want a taxi app"
   - Expected: Agent asks 5 clarifying questions

2. **Test detailed input:** "Internal task management tool for employees..."
   - Expected: Generates complete BRD directly

3. **Verify database:** Check that BRDs are saved with versions
