import { LRUCache } from "lru-cache";
import { User, CacheStats } from "../types";

class CacheService {
  private cache: LRUCache<string, User>;
  private stats: {
    hits: number;
    misses: number;
    totalRequests: number;
    totalResponseTime: number;
  };

  constructor() {
    this.cache = new LRUCache<string, User>({
      max: 100,
      ttl: 60000,
    });

    this.stats = {
      hits: 0,
      misses: 0,
      totalRequests: 0,
      totalResponseTime: 0,
    };

    setInterval(() => {
      this.cache.purgeStale();
    }, 30000);
  }

  get(key: string): User | undefined {
    this.stats.totalRequests++;
    const value = this.cache.get(key);

    if (value) {
      this.stats.hits++;
    } else {
      this.stats.misses++;
    }

    return value;
  }

  set(key: string, value: User): void {
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): CacheStats {
    return {
      hits: this.stats.hits,
      misses: this.stats.misses,
      currentSize: this.cache.size,
      totalRequests: this.stats.totalRequests,
      averageResponseTime:
        this.stats.totalRequests > 0
          ? this.stats.totalResponseTime / this.stats.totalRequests
          : 0,
    };
  }

  addResponseTime(time: number): void {
    this.stats.totalResponseTime += time;
  }
}

export default new CacheService();
