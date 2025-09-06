# 🚀 User Data API - Advanced Express.js Server

A high-performance Express.js API featuring advanced caching strategies, sophisticated rate limiting, and asynchronous processing capabilities designed to handle high-traffic scenarios with optimal performance.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Package Dependencies](#-package-dependencies)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Testing with Postman](#-testing-with-postman)
- [Performance Testing](#-performance-testing)
- [Common Issues & Solutions](#-common-issues--solutions)
- [Development Notes](#-development-notes)
- [Monitoring](#-monitoring)
- [Contributing](#-contributing)

## ✨ Features

- **Advanced LRU Caching**: Least Recently Used cache with 60-second TTL and automatic cleanup
- **Sophisticated Rate Limiting**: Multi-tier rate limiting (10 req/min + 5 req/10sec burst)
- **Asynchronous Processing**: Queue-based request handling for concurrent operations
- **TypeScript**: Full type safety and enhanced developer experience
- **Performance Optimization**: Response time tracking and cache statistics
- **Error Handling**: Comprehensive error handling with meaningful messages
- **Security**: Helmet.js security headers and CORS protection
- **Monitoring**: Built-in performance metrics and cache analytics

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Caching**: Custom LRU implementation
- **Rate Limiting**: express-rate-limit
- **Security**: Helmet.js, CORS
- **Development**: Nodemon, ts-node

## 🚀 Installation

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd user-data-api

# Install dependencies
npm install

# Run in development mode
npm run dev

# The server will start on http://localhost:3000
```

### Alternative Setup

```bash
# Create project from scratch
mkdir user-data-api && cd user-data-api
npm init -y

# Install production dependencies
npm install express cors helmet compression morgan express-rate-limit

# Install TypeScript and development dependencies
npm install -D typescript @types/node @types/express @types/cors ts-node nodemon @types/morgan

# Initialize TypeScript
npx tsc --init
```

## 📦 Package Dependencies

### Production Dependencies

| Package | Version | Purpose | Why We Need It |
|---------|---------|---------|----------------|
| **express** | ^4.18.x | Web framework | Core HTTP server functionality |
| **cors** | ^2.8.x | Cross-Origin Resource Sharing | Enable API access from different domains |
| **helmet** | ^7.0.x | Security middleware | Adds security headers to protect against common attacks |
| **compression** | ^1.7.x | Response compression | Reduces response size, improves performance |
| **morgan** | ^1.10.x | HTTP request logger | Logs HTTP requests for monitoring and debugging |
| **express-rate-limit** | ^6.10.x | Rate limiting | Prevents abuse and controls API usage |

### Development Dependencies

| Package | Version | Purpose | Why We Need It |
|---------|---------|---------|----------------|
| **typescript** | ^5.2.x | Type checking | Provides static typing and better code quality |
| **@types/node** | ^20.x.x | Node.js type definitions | TypeScript support for Node.js APIs |
| **@types/express** | ^4.17.x | Express type definitions | TypeScript support for Express.js |
| **@types/cors** | ^2.8.x | CORS type definitions | TypeScript support for CORS middleware |
| **@types/morgan** | ^1.9.x | Morgan type definitions | TypeScript support for Morgan logger |
| **ts-node** | ^10.9.x | TypeScript execution | Run TypeScript files directly without compilation |
| **nodemon** | ^3.0.x | File watcher | Automatically restart server on file changes |

## 📁 Project Structure

```
user-data-api/
├── src/
│   ├── app.ts                    # Express application setup
│   ├── server.ts                 # Server entry point
│   ├── controllers/
│   │   └── userController.ts     # Request handlers
│   ├── middleware/
│   │   ├── rateLimiter.ts        # Rate limiting configuration
│   │   └── errorHandler.ts       # Global error handling
│   ├── services/
│   │   ├── cacheService.ts       # LRU cache implementation
│   │   ├── queueService.ts       # Async queue processing
│   │   └── userService.ts        # User business logic
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   └── utils/
│       └── mockData.ts           # Mock user data
├── dist/                         # Compiled JavaScript (generated)
├── node_modules/                 # Dependencies (generated)
├── .env                          # Environment variables (optional)
├── .gitignore                    # Git ignore rules
├── package.json                  # Project configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## ⚙️ Configuration

### TypeScript Configuration

The `tsconfig.json` is configured for:
- ES2020 target compilation
- CommonJS modules
- Strict type checking
- Source maps for debugging

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```
- Uses nodemon for auto-restart on file changes
- TypeScript compilation on-the-fly with ts-node
- Full error stack traces

### Production Build

```bash
npm run build  # Compile TypeScript to JavaScript
npm start      # Run compiled JavaScript
```

### Available Scripts

```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",      # Development with hot reload
    "build": "tsc",                       # Compile TypeScript
    "start": "node dist/server.js",       # Run production build
    "test": "echo \"No tests yet\""       # Placeholder for tests
  }
}
```

## 🔌 API Endpoints

### User Management

#### Get User by ID
```http
GET /users/:id
```
- **Description**: Retrieve user data by ID with caching
- **Parameters**: `id` (number) - User ID
- **Response**: User object with cache status and response time
- **Caching**: First request hits "database" (200ms delay), subsequent requests served from cache

**Example Response:**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "cached": false,
  "responseTime": 205
}
```

#### Create New User
```http
POST /users
```
- **Description**: Create a new user
- **Body**: JSON with `name` and `email`
- **Response**: Created user data

**Example Request:**
```json
{
  "name": "Alice Cooper",
  "email": "alice.cooper@example.com"
}
```

### Cache Management

#### Get Cache Statistics
```http
GET /cache-status
```
- **Description**: View cache performance metrics
- **Response**: Cache hits, misses, size, and average response time

**Example Response:**
```json
{
  "cacheStats": {
    "hits": 15,
    "misses": 5,
    "currentSize": 3,
    "totalRequests": 20,
    "averageResponseTime": 45.2
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Clear Cache
```http
DELETE /cache
```
- **Description**: Clear all cached data
- **Response**: Success confirmation

### Health Check

#### Server Health
```http
GET /health
```
- **Description**: Check if server is running
- **Response**: Server status and timestamp

## 🧪 Testing with Postman

### Import Collection

Create a Postman collection with the following requests:

### Basic Functionality Tests

1. **Health Check**
   - GET `http://localhost:3000/health`
   - Expected: 200 status

2. **Get User (Cache Miss)**
   - GET `http://localhost:3000/users/1`
   - Expected: 200 status, `cached: false`, ~200ms response time

3. **Get User (Cache Hit)**
   - GET `http://localhost:3000/users/1` (repeat immediately)
   - Expected: 200 status, `cached: true`, <10ms response time

4. **Get Non-existent User**
   - GET `http://localhost:3000/users/999`
   - Expected: 404 status, error message

5. **Create User**
   - POST `http://localhost:3000/users`
   - Headers: `Content-Type: application/json`
   - Body: `{"name": "Test User", "email": "test@example.com"}`
   - Expected: 201 status, user data

### Rate Limiting Tests

6. **Standard Rate Limit Test**
   - Send 15 requests rapidly to `/users/1`
   - Expected: First 10 succeed, remaining get 429 status

7. **Burst Limit Test**
   - Send 8 requests in 5 seconds to `/users/2`
   - Expected: First 5 succeed, remaining get 429 status

### Cache Management Tests

8. **Cache Status**
   - GET `http://localhost:3000/cache-status`
   - Expected: Statistics with hit/miss ratios

9. **Clear Cache**
   - DELETE `http://localhost:3000/cache`
   - Expected: Success message, subsequent requests are cache misses

## 🚀 Performance Testing

### Using Artillery (Recommended)

```bash
# Install Artillery
npm install -g artillery

# Create test configuration
cat > artillery.yml << EOF
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
  processor: './artillery-processor.js'

scenarios:
  - name: "Mixed Load Test"
    weight: 70
    requests:
      - get:
          url: "/users/1"
      - get:
          url: "/users/2"
      - get:
          url: "/users/3"
  - name: "Cache Status Check"
    weight: 20
    requests:
      - get:
          url: "/cache-status"
  - name: "User Creation"
    weight: 10
    requests:
      - post:
          url: "/users"
          json:
            name: "Load Test User"
            email: "loadtest@example.com"
EOF

# Run load test
artillery run artillery.yml
```

### Using curl for Quick Tests

```bash
# Test rate limiting
for i in {1..15}; do
  curl -w "Request $i: %{http_code} - %{time_total}s\n" \
       -o /dev/null -s http://localhost:3000/users/1
done

# Test cache performance
echo "First request (cache miss):"
time curl -s http://localhost:3000/users/1 > /dev/null

echo "Second request (cache hit):"
time curl -s http://localhost:3000/users/1 > /dev/null
```

## 🐛 Common Issues & Solutions

### Issue 1: LRU Cache Import Error

**Problem:**
```typescript
Cannot use namespace 'LRU' as a type.
```

**Solution:**
Use custom LRU implementation provided in the codebase instead of external library.

### Issue 2: Express Slow Down Warning

**Problem:**
```
ExpressSlowDownWarning: The behaviour of the 'delayMs' option was changed
```

**Solution:**
Update `rateLimiter.ts`:
```typescript
export const speedLimiter = slowDown({
  windowMs: 10 * 1000,
  delayAfter: 3,
  delayMs: () => 500,  // Function instead of number
  validate: { delayMs: false }  // Disable warning
});
```

### Issue 3: Path-to-RegExp Error

**Problem:**
```
PathError: Missing parameter name at index 1: *
```

**Solution:**
Change catch-all route in `app.ts`:
```typescript
// Wrong:
app.use('*', (req, res) => { ... });

// Correct:
app.use((req, res) => { ... });
```

### Issue 4: TypeScript Compilation Errors

**Problem:**
```
Cannot find module '@types/...'
```

**Solution:**
Install missing type definitions:
```bash
npm install -D @types/node @types/express @types/cors @types/morgan
```

### Issue 5: Port Already in Use

**Problem:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**
```bash
# Option 1: Kill process using port 3000
npx kill-port 3000

# Option 2: Use different port
PORT=3001 npm run dev

# Option 3: Find and kill process manually
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

## 📝 Development Notes

### Performance Optimizations Implemented

1. **LRU Cache Strategy**: Automatically evicts least recently used items when capacity is reached
2. **TTL Expiration**: 60-second time-to-live prevents stale data
3. **Concurrent Request Handling**: Queue system prevents duplicate "database" calls
4. **Response Compression**: Reduces bandwidth usage
5. **Security Headers**: Helmet.js adds essential security headers

### Caching Strategy Details

- **Cache Size**: Maximum 100 items
- **TTL**: 60 seconds
- **Cleanup**: Automatic background cleanup every 30 seconds
- **LRU Logic**: Tracks access time to evict least recently used items
- **Statistics**: Tracks hits, misses, and response times

### Rate Limiting Implementation

1. **Primary Limit**: 10 requests per minute per IP
2. **Burst Limit**: 5 requests per 10 seconds per IP
3. **Headers**: Returns rate limit headers for client awareness
4. **Error Messages**: Meaningful error responses with retry suggestions

### Asynchronous Processing

- **Queue System**: Prevents duplicate processing of same user ID
- **Promise-based**: Non-blocking operations
- **Cleanup**: Automatic cleanup of completed promises
- **Error Handling**: Proper error propagation through promise chain

## 📊 Monitoring

### Built-in Metrics

Access real-time metrics at `/cache-status`:

- Cache hit ratio
- Average response time
- Current cache size
- Total requests processed

### Recommended Additional Monitoring

 **Application Performance Monitoring (APM)**:
   - New Relic
   - DataDog
   - AppDynamics
