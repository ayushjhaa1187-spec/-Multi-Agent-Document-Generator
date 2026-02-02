# Complete Source Code - Multi-Agent BRD Generator

## ✅ Files Already Created
- ✅ lib/prisma.ts
- ✅ lib/agents/brd-planner.ts
- ✅ prisma/schema.prisma
- ✅ package.json
- ✅ tsconfig.json
- ✅ next.config.js
- ✅ .gitignore
- ✅ .env.example

## 📝 Remaining Files to Create

Copy each file below exactly as shown into your local repository.

---

### lib/agents/requirement-writer.ts

```typescript
export const REQUIREMENT_WRITER_SYSTEM_PROMPT = `You are a Requirement Writer Agent working with a Senior Business Analyst.

Your responsibilities:
- Take a BRD outline and clarified notes and expand them into a full Business Requirement Document.
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
- Functional Requirements: Write as \"The system shall ...\" statements.
- Non-Functional Requirements: Cover performance, security, availability, usability, and scalability.
- User Personas: Include role, goals, and key pain points.
- User Stories: Format as \"As a [user type], I want [goal] so that [business value].\"\n
LANGUAGE & FORMAT:
- Use professional, clear, and concise language.
- Use Markdown headings and bullet lists for readability.
- If information is missing, state assumptions explicitly in an \"Assumptions\" section.
`;
```

---

### app/api/chat/route.ts

```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { prisma } from '@/lib/prisma';
import { BRD_PLANNER_SYSTEM_PROMPT } from '@/lib/agents/brd-planner';
import { REQUIREMENT_WRITER_SYSTEM_PROMPT } from '@/lib/agents/requirement-writer';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, projectName, stage } = await req.json();

    // Stage 1: BRD Planner Agent
    const plannerResult = await streamText({
      model: openai('gpt-4o'),
      system: BRD_PLANNER_SYSTEM_PROMPT,
      messages,
    });

    const plannerText = await plannerResult.text;

    // Check if clarification needed (simple heuristic: questions only)
    const needsClarification =
      stage !== 'generate' &&
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
        try {
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
        } catch (error) {
          console.error('Database save error:', error);
        }
      },
    });

    return writerResult.toDataStreamResponse();
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

---

### app/layout.tsx

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BRD Generator - AI-Powered Business Requirements',
  description: 'Generate professional Business Requirement Documents using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang=\"en\">
      <body className=\"bg-slate-950 text-white antialiased\">{children}</body>
    </html>
  );
}
```

---

### app/page.tsx

```typescript
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [projectName, setProjectName] = useState('');
  const [stage, setStage] = useState<'clarify' | 'generate'>('clarify');
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: { projectName, stage },
  });

  const lastAssistantMessage = messages
    .filter((m) => m.role === 'assistant')
    .at(-1);
  const onlyQuestions =
    lastAssistantMessage &&
    lastAssistantMessage.content.split('\n').every((line) => line.trim().endsWith('?'));

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8\">
      <div className=\"max-w-4xl mx-auto\">
        <div className=\"mb-8\">
          <h1 className=\"text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent\">
            BRD Generator
          </h1>
          <p className=\"text-slate-400 text-lg\">AI-powered Business Requirement Document generation</p>
        </div>

        <div className=\"space-y-4 mb-6\">
          <input
            type=\"text\"
            placeholder=\"Project name (optional)\"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className=\"w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500\"
          />
        </div>

        <div className=\"bg-slate-800 rounded-lg h-[32rem] overflow-y-auto p-6 mb-4 space-y-4 border border-slate-700\">
          {messages.length === 0 && (
            <div className=\"text-slate-500 text-center py-16\">
              <p className=\"text-lg mb-2\">Start by describing your project</p>
              <p className=\"text-sm\">Example: \"I want to build a taxi booking app for Delhi\"</p>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-900/50 ml-12 border border-blue-800'
                  : 'bg-slate-700/50 mr-12 border border-slate-600'
              }`}
            >
              <div className=\"text-xs text-slate-400 mb-2 font-semibold uppercase\">
                {msg.role === 'user' ? 'You' : 'AI Agent'}
              </div>
              <div className=\"whitespace-pre-wrap\">{msg.content}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className=\"flex gap-2 mb-4\">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder=\"Describe your project or answer the questions...\"
            className=\"flex-1 p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500\"
          />
          <button
            type=\"submit\"
            className=\"px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors\"
          >
            Send
          </button>
        </form>

        {onlyQuestions && stage === 'clarify' && (
          <button
            onClick={() => setStage('generate')}
            className=\"w-full py-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition-colors\"
          >
            ✅ Generate BRD from My Answers
          </button>
        )}
      </div>
    </div>
  );
}
```

---

### app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
```

---

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

### postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## 🚀 Final Setup Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Setup Database:**
   ```bash
   npm run db:push
   ```

3. **Create `.env.local`:**
   ```
   OPENAI_API_KEY=your_api_key_here
   DATABASE_URL=postgresql://user:password@localhost:5432/brd_generator
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Open http://localhost:3000**

Your complete BRD Generation system is now ready to deploy! 🎉
