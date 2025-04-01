FROM oven/bun:1

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lockb ./
RUN bun install

COPY . .

EXPOSE 4000

CMD ["bun", "run", "index.ts"] 