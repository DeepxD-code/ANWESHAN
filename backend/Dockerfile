FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma/ ./prisma/
RUN npm install
RUN npx prisma generate
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache sqlite
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /app/prisma/migrations ./prisma/migrations
COPY prisma/seed.js ./prisma/seed.js
COPY package*.json ./
COPY prisma.config.ts ./
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
EXPOSE 5000
ENTRYPOINT ["./entrypoint.sh"]
