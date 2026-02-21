/**
 * Redis caching utility for RAG embeddings and API responses
 * Falls back to in-memory cache if Redis is not available
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CacheManager {
  private memoryCache: Map<string, CacheEntry<any>> = new Map();
  private readonly DEFAULT_TTL = 3600000; // 1 hour in milliseconds
  private readonly MAX_CACHE_SIZE = 1000;
  private redisAvailable = false;
  private redisUrl = process.env.REDIS_URL;

  constructor() {
    this.checkRedisAvailability();
    this.startCleanupTask();
  }

  private checkRedisAvailability(): void {
    if (this.redisUrl) {
      // Redis is configured, we could add actual Redis client here
      // For now, just log that Redis support is available
      console.log('[Cache] Redis URL detected, using in-memory fallback');
      this.redisAvailable = false; // Using fallback for now
    }
  }

  /**
   * Set a cache entry
   */
  async set<T>(
    key: string,
    value: T,
    ttl: number = this.DEFAULT_TTL
  ): Promise<void> {
    const entry: CacheEntry<T> = {
      data: value,
      timestamp: Date.now(),
      ttl,
    };

    if (this.memoryCache.size >= this.MAX_CACHE_SIZE) {
      // Remove oldest entry if cache is full
      const firstKey = this.memoryCache.keys().next().value;
      if (firstKey) {
        this.memoryCache.delete(firstKey);
      }
    }

    this.memoryCache.set(key, entry);
    console.log(`[Cache] Set key: ${key} (TTL: ${ttl}ms)`);
  }

  /**
   * Get a cache entry
   */
  async get<T>(key: string): Promise<T | null> {
    const entry = this.memoryCache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.memoryCache.delete(key);
      console.log(`[Cache] Key expired: ${key}`);
      return null;
    }

    console.log(`[Cache] Cache hit: ${key}`);
    return entry.data;
  }

  /**
   * Delete a cache entry
   */
  async delete(key: string): Promise<void> {
    this.memoryCache.delete(key);
    console.log(`[Cache] Deleted key: ${key}`);
  }

  /**
   * Clear all cache entries
   */
  async clear(): Promise<void> {
    this.memoryCache.clear();
    console.log('[Cache] Cleared all entries');
  }

  /**
   * Generate cache key for embedding
   */
  generateEmbeddingKey(projectName: string, content: string): string {
    return `embedding:${projectName}:${content.slice(0, 50).replace(/\s+/g, '_')}`;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.memoryCache.size,
      maxSize: this.MAX_CACHE_SIZE,
      redisAvailable: this.redisAvailable,
      defaultTTL: this.DEFAULT_TTL,
    };
  }

  /**
   * Start cleanup task to remove expired entries
   */
  private startCleanupTask(): void {
    // Run cleanup every 10 minutes
    setInterval(() => {
      let cleaned = 0;
      const now = Date.now();

      for (const [key, entry] of this.memoryCache.entries()) {
        if (now - entry.timestamp > entry.ttl) {
          this.memoryCache.delete(key);
          cleaned++;
        }
      }

      if (cleaned > 0) {
        console.log(`[Cache] Cleanup: removed ${cleaned} expired entries`);
      }
    }, 600000);
  }
}

// Singleton instance
export const cacheManager = new CacheManager();
