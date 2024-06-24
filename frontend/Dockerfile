FROM oven/bun:1 as base
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
EXPOSE  5599

FROM base AS dev
CMD ["bun", "dev"]

FROM base AS prod
RUN bun run build