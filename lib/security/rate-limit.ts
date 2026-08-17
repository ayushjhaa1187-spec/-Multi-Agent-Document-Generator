// In-memory rate limiting map for basic security enhancement
const rateLimits = new Map<string, { count: number; timestamp: number }>();

export function isRateLimited(identifier: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  // Prevent memory leaks from unbounded map growth (e.g. via IP spoofing)
  if (rateLimits.size > 10000) {
    rateLimits.clear();
  }

  const userLimit = rateLimits.get(identifier);

  if (!userLimit) {
    rateLimits.set(identifier, { count: 1, timestamp: now });
    return false;
  }

  // If outside the time window, reset
  if (now - userLimit.timestamp > windowMs) {
    rateLimits.set(identifier, { count: 1, timestamp: now });
    return false;
  }

  // Inside the window, check the count
  if (userLimit.count >= limit) {
    return true; // Rate limited
  }

  // Inside the window, increment count
  userLimit.count += 1;
  return false;
}
