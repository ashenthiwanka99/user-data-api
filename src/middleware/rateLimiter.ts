import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    error: "Too many requests, please try again later.",
    retryAfter: "1 minute",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const burstLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 5,
  message: {
    error: "Burst limit exceeded, please slow down.",
    retryAfter: "10 seconds",
  },
});
