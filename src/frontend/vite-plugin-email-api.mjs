import { logTrekoraEnvStatus, loadTrekoraEnv } from "../../backend/lib/load-env.js";

import { resolveApiHandler, agentMarkdownHandler, wantsMarkdown } from "./api/_lib/resolve-api-handler.mjs";

loadTrekoraEnv();



function createMockReqRes(req, res) {

  const mockReq = {

    method: req.method,

    url: req.url,

    headers: req.headers,

    body: undefined,

    async *[Symbol.asyncIterator]() {

      const chunks = [];

      await new Promise((resolve, reject) => {

        req.on("data", (c) => chunks.push(c));

        req.on("end", resolve);

        req.on("error", reject);

      });

      if (chunks.length) yield Buffer.concat(chunks);

    },

  };



  const mockRes = {

    statusCode: 200,

    headers: {},

    setHeader(key, value) {

      this.headers[key.toLowerCase()] = value;

    },

    status(code) {

      this.statusCode = code;

      return this;

    },

    json(payload) {

      res.statusCode = this.statusCode;

      for (const [k, v] of Object.entries(this.headers)) {

        res.setHeader(k, v);

      }

      res.setHeader("Content-Type", "application/json");

      res.end(JSON.stringify(payload));

    },

    end() {

      res.statusCode = this.statusCode;

      for (const [k, v] of Object.entries(this.headers)) {

        res.setHeader(k, v);

      }

      res.end();

    },

  };



  return { mockReq, mockRes };

}



/** Dev-only: Trekora serverless API routes (email, discounts, reviews, gallery). */

export function emailApiPlugin() {

  return {

    name: "trekora-email-api",

    enforce: "pre",

    configureServer(server) {
      logTrekoraEnvStatus("vite-api");

      server.middlewares.use(async (req, res, next) => {

        const raw = req.url ?? "";

        const pathname = raw.split("?")[0];

        if (
          wantsMarkdown(req.headers?.accept ?? "") &&
          !pathname.startsWith("/api/") &&
          !pathname.startsWith("/.well-known/") &&
          !pathname.startsWith("/assets/") &&
          !/\.[a-z0-9]+$/i.test(pathname)
        ) {
          const { mockReq, mockRes } = createMockReqRes(req, res);
          mockReq.url = `/api/agent-markdown?path=${encodeURIComponent(pathname || "/")}`;
          try {
            await agentMarkdownHandler(mockReq, mockRes);
            return;
          } catch (err) {
            console.error("[vite api] markdown", pathname, err);
          }
        }

        const handler = resolveApiHandler(pathname, req.method);

        if (!handler) return next();



        const { mockReq, mockRes } = createMockReqRes(req, res);

        try {

          await handler(mockReq, mockRes);

        } catch (err) {

          console.error("[vite api]", pathname, err);

          res.statusCode = 500;

          res.setHeader("Content-Type", "application/json");

          res.end(JSON.stringify({ ok: false, error: "Internal server error" }));

        }

      });

    },

  };

}


