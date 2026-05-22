import mongoose from "mongoose";

/**
 * Close HTTP server and Mongo on SIGTERM/SIGINT (Railway/K8s friendly).
 * @param {import('http').Server} server
 */
export function registerGracefulShutdown(server) {
  let shuttingDown = false;

  async function shutdown(signal) {
    if (shuttingDown) return;
    shuttingDown = true;
    process.stdout.write(`[server] ${signal} — shutting down gracefully\n`);

    const forceTimer = setTimeout(() => {
      process.stderr.write("[server] forced exit after timeout\n");
      process.exit(1);
    }, 12_000);
    forceTimer.unref?.();

    await new Promise((resolve) => {
      server.close(() => resolve(undefined));
    });

    try {
      await mongoose.connection.close(false);
      process.stdout.write("[server] MongoDB connection closed\n");
    } catch (err) {
      process.stderr.write(
        `[server] Mongo close error: ${err instanceof Error ? err.message : err}\n`,
      );
    }

    clearTimeout(forceTimer);
    process.exit(0);
  }

  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));
}
