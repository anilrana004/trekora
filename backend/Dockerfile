# Trekora Mongo API — Railway / Docker ready
FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN corepack enable pnpm 2>/dev/null || true \
  && (pnpm install --prod --frozen-lockfile 2>/dev/null || npm install --omit=dev)

COPY . .

EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD wget -qO- http://127.0.0.1:3001/health || exit 1

CMD ["node", "server.js"]
