#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy --schema=./prisma/schema.prisma 2>/dev/null || npx prisma db push --schema=./prisma/schema.prisma

echo "Seeding database..."
node prisma/seed.js

echo "Starting ANWESHAN Backend..."
exec node dist/server.js
