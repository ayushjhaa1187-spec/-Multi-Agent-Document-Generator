# API Reference

Complete documentation of all available API endpoints.

## Base URL

```
Development:  http://localhost:3000/api
Production:   https://yourdomain.com/api
```

---

## Chat API

### POST /api/chat

Generate BRD documents through multi-agent orchestration.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "I want to build a taxi booking application"
    }
  ],
  "projectName": "TaxiApp Platform",
  "stage": "clarify" | "generate"
}
```

**Parameters:**
- `messages` (array, required): Chat message history
  - `role` (string): "user" or "assistant"
  - `content` (string): Message text (non-empty)
- `projectName` (string, required): Project name (3-100 characters)
- `stage` (string): "clarify" or "generate" (auto-detected by system)

**Response:**
- Status: 200
- Content-Type: application/json
- Body: Server-sent event stream with generated content

**Error Responses:**
- `400`: Invalid messages format or projectName
- `503`: Database or AI service unavailable
- `500`: Internal server error

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Build a fitness app"}],
    "projectName": "FitnessPro"
  }'
```

---

## Metrics API

### GET /api/metrics

Get real-time API performance metrics.

**Response:**
```json
{
  "average_response_time_ms": 245,
  "threshold_ms": 500,
  "is_healthy": true,
  "metrics_count": 42,
  "last_10_metrics": [
    {
      "endpoint": "/api/chat",
      "duration": 235,
      "timestamp": "2024-02-19T10:30:00Z",
      "status": 200
    }
  ]
}
```

**Status Codes:**
- `200`: Success - metrics retrieved

**Example Request:**
```bash
curl http://localhost:3000/api/metrics
```

**Monitoring:**
- Track average response times
- Identify performance regressions
- Check system health status
- Monitor individual request durations

---

## Analytics API

### GET /api/analytics

Get session and event analytics.

**Response:**
```json
{
  "session": {
    "sessionId": "session_1707302400000_abc123def",
    "startTime": "2024-02-19T10:00:00Z",
    "endTime": "2024-02-19T10:15:00Z",
    "totalEvents": 25,
    "metrics": {
      "totalEvents": 25,
      "eventsByType": {
        "api_request": 12,
        "user_action": 8,
        "error": 2,
        "page_view": 3
      },
      "errorRate": 8,
      "averageResponseTime": 245
    }
  },
  "recentEvents": [
    {
      "event": "api_request",
      "timestamp": "2024-02-19T10:14:55Z",
      "properties": {
        "endpoint": "/api/chat",
        "duration": 235,
        "status": 200
      }
    }
  ]
}
```

**Status Codes:**
- `200`: Success - analytics retrieved

**Example Request:**
```bash
curl http://localhost:3000/api/analytics
```

**Tracked Events:**
- `api_request`: API endpoint calls with duration and status
- `user_action`: User interactions (BRD generation, form submissions)
- `error`: Error occurrences with context
- `page_view`: Page navigation
- `session_start`: Session initialization
- `session_end`: Session termination

---

## Error Handling

### Standard Error Response

```json
{
  "error": "Error Code",
  "message": "User-friendly error description"
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| Invalid messages format | 400 | Messages array is empty or malformed |
| Invalid project name | 400 | Project name missing or too short |
| Database connection failed | 503 | Cannot connect to database |
| AI Service Error | 503 | OpenAI or AI service unavailable |
| Internal server error | 500 | Unexpected server error |

---

## Rate Limiting

Default configuration:
- **Requests per minute**: 60
- **Configurable via**: `RATE_LIMIT_REQUESTS_PER_MINUTE` env variable

---

## Authentication

Currently, the API is public. For production deployments, consider:
- Adding API key authentication
- Implementing JWT tokens
- Using Vercel authentication
- Adding rate limiting per user

---

## Response Times

**Performance Targets:**
- `/api/chat`: < 5 seconds (streaming)
- `/api/metrics`: < 100ms
- `/api/analytics`: < 100ms

**Monitoring:**
- Use `/api/metrics` to check response times
- Alerts trigger if average exceeds 500ms
- Check logs for specific slow requests

---

## Best Practices

1. **Always include projectName** - Required for database persistence
2. **Handle streaming responses** - `/api/chat` returns streamed data
3. **Validate messages** - Ensure non-empty, valid format
4. **Check metrics regularly** - Monitor `/api/metrics` for health
5. **Implement retry logic** - For network failures and 503 errors

---

## Usage Examples

### JavaScript/TypeScript

```typescript
const messages = [
  { role: 'user', content: 'Build a project management tool' }
];

const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages,
    projectName: 'ProjectManagementApp'
  })
});

// Handle streaming response
const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader!.read();
  if (done) break;
  console.log(decoder.decode(value));
}
```

### Python

```python
import requests
import json

url = 'http://localhost:3000/api/chat'
payload = {
    'messages': [{'role': 'user', 'content': 'Build a mobile app'}],
    'projectName': 'MobileApp'
}

response = requests.post(url, json=payload, stream=True)

for chunk in response.iter_lines():
    if chunk:
        print(json.loads(chunk))
```

---

## Support

For API issues or questions:
- Check this documentation
- Review example code
- Open a GitHub issue
- Check the `/api/metrics` for diagnostics
