/**
 * Simple in-memory rate limiter.
 * Uses a fixed window approach to limit requests by IP or identifier.
 */
export class RateLimiter {
  private requests: Map<string, { count: number; expiresAt: number }> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Run cleanup every 5 minutes to prevent memory leaks from old IPs
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);

    // Ensure this interval doesn't prevent the process from exiting
    // (Important for tests and scripts)
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Checks if a request is allowed.
   * @param key Unique identifier (e.g., IP address)
   * @param limit Max requests allowed within the window
   * @param windowMs Time window in milliseconds
   * @returns boolean true if allowed, false if limit exceeded
   */
  public check(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const record = this.requests.get(key);

    // If no record exists or the window has expired, start a new window
    if (!record || now > record.expiresAt) {
      this.requests.set(key, {
        count: 1,
        expiresAt: now + windowMs,
      });
      return true;
    }

    // If limit exceeded, return false
    if (record.count >= limit) {
      return false;
    }

    // Increment count and allow
    record.count++;
    return true;
  }

  /**
   * Removes expired entries from the map.
   */
  private cleanup() {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now > record.expiresAt) {
        this.requests.delete(key);
      }
    }
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();
