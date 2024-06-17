# Stage 1: Build
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN corepack enable pnpm && pnpm i
COPY . .
RUN pnpm run build

# Stage 2: Serve
FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

RUN corepack enable pnpm && pnpm i next

CMD ["pnpm", "start"]