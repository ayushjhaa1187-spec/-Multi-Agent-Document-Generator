
/**
 * Rate limiting utility for API routes
 * Implements a simple in-memory Token Bucket / Fixed Window algorithm
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Run cleanup every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
    // Unref the interval so it doesn't prevent the process from exiting (crucial for tests)
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Check if a request is allowed for the given IP
   * @param ip - The IP address to check
   * @param limit - Max requests allowed in the window
   * @param windowMs - Time window in milliseconds
   * @returns true if allowed, false if limit exceeded
   */
  check(ip: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const entry = this.limits.get(ip);

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      this.limits.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });
      return true;
    }

    if (entry.count < limit) {
      // Within limit
      entry.count++;
      return true;
    }

    // Limit exceeded
    return false;
  }

  /**
   * Remove expired entries to prevent memory leaks
   */
  private cleanup() {
    const now = Date.now();
    for (const [ip, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(ip);
      }
    }
  }

  /**
   * Manually stop the cleanup interval (useful for testing teardown if needed)
   */
  stop() {
      clearInterval(this.cleanupInterval);
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();
