FROM oven/bun:1.0.29

WORKDIR /app

COPY bun.lockb package.json ./
RUN bun install

COPY . .

EXPOSE 4000

CMD ["bun", "index.ts"]