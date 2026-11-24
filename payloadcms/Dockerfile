# Production image for the portfolio CMS. Build on the target host (the
# Oracle VPS is arm64) so native deps (libsql, sharp) match its platform.
FROM node:24-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# The config refuses to load without a 32+ char secret; this placeholder is
# build-only. The runtime secret comes from the container environment.
RUN PAYLOAD_SECRET=build-only-placeholder-never-used-at-runtime npm run build

FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
