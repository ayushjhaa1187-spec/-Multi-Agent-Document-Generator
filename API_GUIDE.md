# API Guide - Multi-Agent BRD Generator

## Overview

The BRD Generator API provides a streaming endpoint for generating Business Requirement Documents using AI agents. The system uses a two-stage process with intelligent clarification.

## Endpoints

### POST /api/chat

Main endpoint for generating and interacting with BRD generation.

#### Request

```javascript
POST /api/chat
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "I want to build a taxi booking app for Delhi"
    }
  ],
  "projectName": "Delhi Taxi Booking",
  "stage": "clarify"
}
```

#### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messages` | Array | Yes | Array of message objects with `role` ("user"/"assistant") and `content` (string) |
| `projectName` | String | No | Name of the project (defaults to "Untitled Project") |
| `stage` | String | No | Generation stage: "clarify" (default) or "generate" |

#### Response

The API returns a **Server-Sent Events (SSE)** stream with chunked text content.

```
event: data
data: The system will

data:  support multiple

data:  user roles

event: end
```

#### Behavior

**Stage 1: Clarification (when stage="clarify")**
- Agent analyzes user input for vagueness
- If input is unclear, returns 3-5 targeted follow-up questions
- Questions grouped by theme (scope, users, features, constraints, success)
- Ends with question marks

**Stage 2: Generation (when stage="generate" OR input is detailed)**
- BRD Planner Agent creates structured outline
- Requirement Writer Agent expands to full BRD
- Saves to database with version tracking
- Returns complete professional document

## Usage Examples

### Example 1: Vague Input (Clarification)

**Request:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "I want a taxi app"}],
    "projectName": "Taxi App",
    "stage": "clarify"
  }'
```

**Response (streaming):**
```
To better understand your project, I have the following questions:

SCOPE & USERS:
1. Will this app serve riders only, or both riders and drivers?
2. What geographic region will the app cover initially?

PLATFORMS:
3. Should the app be available on web, iOS, Android, or all three?

CORE FEATURES:
4. What are the top 3 must-have features for v1 launch?

BUSINESS GOAL:
5. Is the primary goal new revenue generation, cost reduction, or customer experience?
```

### Example 2: Detailed Input (Direct Generation)

**Request:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Internal task management tool for 50-100 employees. Features: create tasks, assign to teams, set deadlines, track progress, generate reports. Must integrate with Slack and email. Timeline: 3 months. Budget: $50k. Success metric: 80% adoption in 6 months."
      }
    ],
    "projectName": "Internal Task Manager",
    "stage": "clarify"
  }'
```

**Response (streaming):**
```
# Internal Task Manager - Business Requirement Document

## Executive Summary
Internal task management platform designed for 50-100 employees with workflow automation, team collaboration, and reporting capabilities.

## Business Objectives
1. Enable efficient task tracking and assignment across teams
2. Integrate with existing communication tools (Slack, email)
3. Achieve 80% user adoption within 6 months
4. Reduce project management overhead by 40%

## Functional Requirements

The system shall:
- Allow users to create, edit, and delete tasks
- Support task assignment to individuals and teams
- Enable deadline setting with calendar integration
- Track task status through workflow states (New, In Progress, Complete)
- Send notifications via Slack and email
- Generate progress reports by team and project
- Support file attachments to tasks
...
```

### Example 3: Answering Clarification Questions

**Request (after receiving clarification questions):**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "I want a taxi app"},
      {"role": "assistant", "content": "To better understand...\n1. Will this app serve riders...\n5. Is the primary goal..."},
      {"role": "user", "content": "Both riders and drivers. Delhi NCR region. Web and mobile. Booking, live tracking, payments, driver rating. New revenue generation and driver employment."},
      {"role": "user", "content": "Ready to generate BRD"}
    ],
    "projectName": "Delhi Taxi Network",
    "stage": "generate"
  }'
```

**Response:**
Full BRD with Executive Summary, Business Objectives, Scope, Functional Requirements, Non-Functional Requirements, User Personas, Assumptions, Risks, and Success Metrics.

## Implementation Details

### Frontend Integration (useChat Hook)

```typescript
import { useChat } from '@ai-sdk/react';

const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: '/api/chat',
  body: { projectName: 'My Project', stage: 'clarify' }
});
```

### Processing Logic

1. **Input received** → BRD Planner Agent evaluates
2. **If vague** → Return clarification questions
3. **If answered or detailed** → Both agents execute
4. **Output** → Stream response to client, save to DB

### Database Persistence

On successful BRD generation, data is saved:

```typescript
await prisma.project.upsert({
  where: { name: projectName },
  create: { name: projectName },
  update: {},
});

await prisma.bRD.create({
  data: {
    projectId: project.id,
    version: nextVersion,
    content: { raw: generatedText },
    rawInput: userInput,
    status: 'draft',
  },
});
```

## Error Handling

### Common Errors

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Missing messages | Request body incomplete |
| 401 | Unauthorized | Missing/invalid API key |
| 429 | Rate limited | Too many requests |
| 500 | Internal error | Server-side issue |

### Response Format

```json
{
  "error": "Missing required field: messages",
  "code": "INVALID_REQUEST"
}
```

## Best Practices

1. **Always provide context**: More details = better BRD
2. **Answer follow-up questions fully**: 3-5 sentences per question
3. **Verify project name**: Helps with versioning and retrieval
4. **Check response stream**: Always handle streaming properly
5. **Save responses**: Export BRD as markdown or PDF for sharing

## Rate Limiting

- **Default**: 10 requests per minute per IP
- **Enterprise**: Custom limits available
- **Rate limit headers**:
  ```
  X-RateLimit-Limit: 10
  X-RateLimit-Remaining: 8
  X-RateLimit-Reset: 1704067200
  ```

## Authentication (Future)

Currently, the API is open. Future versions will include:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{...}'
```
