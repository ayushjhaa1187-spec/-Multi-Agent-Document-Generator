## 2026-06-06 - Remove stack traces from API responses
**Vulnerability:** Error stack traces were exposed via the analytics getEvents API.
**Learning:** Returning unsanitized analytics events can leak internal server paths and implementation details through stored stack traces.
**Prevention:** Filter out sensitive properties like 'stack' using object destructuring before returning events to any API endpoint, without destructively mutating the original log object.
