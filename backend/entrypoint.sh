#!/bin/sh
set -e

echo "Syncing database schema..."
npx prisma db push --schema=./prisma/schema.prisma --skip-generate

echo "Seeding database..."
node prisma/seed.js

echo "Starting ANWESHAN Backend..."
exec node dist/server.js