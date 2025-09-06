export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  currentSize: number;
  totalRequests: number;
  averageResponseTime: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}
