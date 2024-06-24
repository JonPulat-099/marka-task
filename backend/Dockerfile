FROM oven/bun:1 as base
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
EXPOSE 2332
RUN bun run build

FROM base AS dev
CMD ["bun", "run", "dev"]

FROM base AS prod
RUN bun run start