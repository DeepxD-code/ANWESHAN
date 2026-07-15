const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: "ramesh@example.com" } });
  if (existing) { console.log("Already seeded"); return; }

  const hash = await bcrypt.hash("password123", 10);
  const senior = await prisma.user.upsert({
    where: { email: "ramesh@example.com" }, update: {},
    create: { fullName: "Ramesh Patel", email: "ramesh@example.com", phone: "9876543210", password: hash, age: 72, gender: "Male", city: "Ahmedabad", address: "Satellite, Ahmedabad", role: "SENIOR" },
  });
  const guardian = await prisma.user.upsert({
    where: { email: "rajesh@example.com" }, update: {},
    create: { fullName: "Rajesh Patel", email: "rajesh@example.com", phone: "9876543211", password: hash, age: 45, gender: "Male", city: "Ahmedabad", address: "Satellite, Ahmedabad", role: "FAMILY" },
  });
  await prisma.user.upsert({
    where: { email: "officer@example.com" }, update: {},
    create: { fullName: "Inspector Rahul Mehta", email: "officer@example.com", phone: "9876543212", password: hash, age: 38, gender: "Male", city: "Ahmedabad", address: "Cyber Crime Branch", role: "OFFICER" },
  });
  await prisma.guardianLink.upsert({
    where: { seniorId_guardianId: { seniorId: senior.id, guardianId: guardian.id } }, update: {},
    create: { seniorId: senior.id, guardianId: guardian.id, relation: "Son" },
  });
  console.log("Database seeded successfully");
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
