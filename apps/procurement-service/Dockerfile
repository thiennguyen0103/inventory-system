FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build procurement-service

CMD ["node", "dist/apps/procurement-service/main.js"]