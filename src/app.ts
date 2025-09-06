import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import { rateLimiter, burstLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";
import {
  getUser,
  createUser,
  clearCache,
  getCacheStatus,
} from "./controllers/userController";

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(morgan("combined"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);
app.use(burstLimiter);


app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/users/:id", getUser);
app.post("/users", createUser);

app.delete("/cache", clearCache);
app.get("/cache-status", getCacheStatus);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested endpoint does not exist",
  });
});

export default app;
