## 2024-07-22 - Information Disclosure in Analytics API
**Vulnerability:** The analytics tracker logged full error stack traces which were subsequently exposed via a public `/api/analytics` endpoint.
**Learning:** Even internal logging mechanisms can lead to information disclosure if the aggregated logs are exposed publicly or without authentication.
**Prevention:** Never include sensitive information like stack traces or environment variables in analytics events that might be visible to unauthorized users.
