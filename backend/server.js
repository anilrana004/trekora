import { config as loadEnv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import express from "express";
import { connectDBSafe } from "./db/connect.js";
import { errorHandler, notFoundHandler } from "./lib/api-error.js";
import { compressionMiddleware } from "./lib/compression.js";
import { registerGracefulShutdown } from "./lib/graceful-shutdown.js";
import { securityHeadersMiddleware } from "./lib/http-security.js";
import { createCorsMiddleware } from "./lib/cors-config.js";
import { mongoSanitizeMiddleware } from "./lib/mongo-sanitize.js";
import { requestLoggerMiddleware } from "./lib/request-logger.js";
import { mountApiRoutes } from "./lib/mount-api-routes.js";
import {
  isProduction,
  logEnvValidation,
  validateServerEnv,
} from "./lib/env-config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: join(__dirname, "../src/.env") });
loadEnv({ path: join(__dirname, "../src/.env.local"), override: true });

const app = express();
const PORT =
  Number(process.env.PORT) ||
  Number(process.env.DISCOUNT_API_PORT) ||
  3001;

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(requestLoggerMiddleware);
app.use(securityHeadersMiddleware);
app.use(compressionMiddleware);
app.use(createCorsMiddleware());
app.use(express.json({ limit: "512kb" }));
app.use(mongoSanitizeMiddleware);

app.get("/health", async (_req, res) => {
  const mongo = await connectDBSafe();
  res.json({ ok: true, mongo: mongo.ok });
});

mountApiRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  const envCheck = validateServerEnv({ requireMongo: false });
  logEnvValidation(envCheck, "server");
  if (isProduction() && envCheck.warnings.length) {
    process.stderr.write(
      "[server] Review SECURITY.md for production env guidance.\n",
    );
  }

  const mongo = await connectDBSafe();
  if (!mongo.ok) {
    process.stderr.write(
      `[server] MongoDB not connected at startup (${mongo.message}) — API will retry per request\n`,
    );
  }
  const server = app.listen(PORT, () => {
    process.stdout.write(
      `Trekora discount API listening on http://127.0.0.1:${PORT}\n`,
    );
  });
  registerGracefulShutdown(server);
}

start().catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
});
