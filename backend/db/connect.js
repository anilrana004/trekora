import dns from "dns";
import mongoose from "mongoose";

const LOG_PREFIX = "[mongodb]";

/** Windows/local resolvers sometimes refuse SRV lookups; optional public DNS fix. */
function configureMongoDns() {
  if (process.env.MONGODB_DNS_SERVERS) {
    dns.setServers(
      process.env.MONGODB_DNS_SERVERS.split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    );
    return;
  }
  if (process.env.MONGODB_USE_PUBLIC_DNS === "true") {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  }
}

let cached = global.mongoose;
let handlersRegistered = false;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, ready: false };
}

function registerConnectionHandlers() {
  if (handlersRegistered) return;
  handlersRegistered = true;

  mongoose.connection.on("connected", () => {
    cached.ready = true;
    process.stdout.write(`${LOG_PREFIX} connected (${mongoose.connection.name})\n`);
  });

  mongoose.connection.on("disconnected", () => {
    cached.ready = false;
    cached.conn = null;
    cached.promise = null;
    process.stderr.write(`${LOG_PREFIX} disconnected — will reconnect on next request\n`);
  });

  mongoose.connection.on("error", (err) => {
    cached.ready = false;
    process.stderr.write(
      `${LOG_PREFIX} connection error: ${err instanceof Error ? err.message : String(err)}\n`,
    );
  });

  mongoose.connection.on("reconnected", () => {
    cached.ready = true;
    process.stdout.write(`${LOG_PREFIX} reconnected\n`);
  });
}

export function isMongoReady() {
  return cached.ready && mongoose.connection.readyState === 1;
}

/**
 * Connect to MongoDB Atlas. Throws only when MONGODB_URI is missing.
 * Transient failures are logged; callers should catch and return API errors.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri || !String(uri).trim()) {
    throw new Error("MONGODB_URI is not configured");
  }

  registerConnectionHandlers();

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (mongoose.connection.readyState === 0) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    configureMongoDns();
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 20_000,
        maxPoolSize: 25,
        minPoolSize: 2,
        socketTimeoutMS: 45_000,
      })
      .then((conn) => {
        cached.conn = conn;
        cached.ready = true;
        return conn;
      })
      .catch((err) => {
        cached.promise = null;
        cached.conn = null;
        cached.ready = false;
        process.stderr.write(
          `${LOG_PREFIX} connect failed: ${err instanceof Error ? err.message : String(err)}\n`,
        );
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/** Safe connect for health checks — never throws. */
export async function connectDBSafe() {
  try {
    await connectDB();
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "MongoDB unavailable",
    };
  }
}
