
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private readonly cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Cleanup every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
    // Unref to avoid holding the process open
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Check if a key has exceeded the rate limit.
   * @param key Unique identifier (e.g., IP address)
   * @param limit Max requests allowed in the window
   * @param windowMs Time window in milliseconds
   * @returns { success: boolean; remaining: number; reset: number }
   */
  check(key: string, limit: number, windowMs: number): { success: boolean; remaining: number; reset: number } {
    const now = Date.now();
    let entry = this.limits.get(key);

    if (!entry || now > entry.resetTime) {
      entry = {
        count: 0,
        resetTime: now + windowMs,
      };
      this.limits.set(key, entry);
    }

    if (entry.count >= limit) {
      return { success: false, remaining: 0, reset: entry.resetTime };
    }

    entry.count += 1;
    return { success: true, remaining: limit - entry.count, reset: entry.resetTime };
  }

  /**
   * Get the client IP address from the request headers.
   * Handles x-forwarded-for and fallback.
   */
  getIp(req: Request): string {
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim();
    }
    return 'unknown';
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();
