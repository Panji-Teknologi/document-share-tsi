FROM node:20-alpine

WORKDIR /app

COPY . .

RUN corepack enable && \
    corepack prepare pnpm@9.1.0 --activate && \
    pnpm install --frozen-lockfile

RUN pnpm db:generate && pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
