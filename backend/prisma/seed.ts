import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("password123", 10);

  const senior = await prisma.user.upsert({
    where: { email: "ramesh@example.com" },
    update: {},
    create: {
      fullName: "Ramesh Patel", email: "ramesh@example.com", phone: "9876543210",
      password: hash, age: 72, gender: "Male", city: "Ahmedabad",
      address: "Satellite, Ahmedabad", role: "SENIOR",
    },
  });

  const guardian = await prisma.user.upsert({
    where: { email: "rajesh@example.com" },
    update: {},
    create: {
      fullName: "Rajesh Patel", email: "rajesh@example.com", phone: "9876543211",
      password: hash, age: 45, gender: "Male", city: "Ahmedabad",
      address: "Satellite, Ahmedabad", role: "FAMILY",
    },
  });

  const officer = await prisma.user.upsert({
    where: { email: "officer@example.com" },
    update: {},
    create: {
      fullName: "Inspector Rahul Mehta", email: "officer@example.com", phone: "9876543212",
      password: hash, age: 38, gender: "Male", city: "Ahmedabad",
      address: "Cyber Crime Branch", role: "OFFICER",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      fullName: "ANWESHAN Administrator", email: "admin@example.com", phone: "9876543213",
      password: hash, age: 35, city: "Ahmedabad",
      address: "ANWESHAN Control Center", role: "ADMIN",
    },
  });

  await prisma.guardianLink.upsert({
    where: { seniorId_guardianId: { seniorId: senior.id, guardianId: guardian.id } },
    update: {},
    create: { seniorId: senior.id, guardianId: guardian.id, relation: "Son" },
  });

  const existing = await prisma.complaint.findFirst();
  if (!existing) {
    await prisma.complaint.create({
      data: {
        complaintId: "ANW-2026-00124", title: "UPI Refund Scam",
        description: "Fraudster pretending to be bank executive.",
        category: "UPI Fraud", priority: "High", status: "INVESTIGATING",
        reportedLoss: 42000, location: "Satellite, Ahmedabad",
        userId: senior.id,
      },
    });
    await prisma.complaint.create({
      data: {
        complaintId: "ANW-2026-00125", title: "WhatsApp Investment Scam",
        description: "Fake investment advisor promising high returns.",
        category: "Investment Scam", priority: "Medium", status: "PENDING",
        reportedLoss: 18500, location: "Navrangpura",
        userId: senior.id,
      },
    });
  }

  await prisma.alert.create({
    data: {
      type: "sos", status: "pending", severity: "critical",
      location: "Satellite, Ahmedabad", seniorId: senior.id,
    },
  });

  console.log("Database seeded successfully");
}

main().catch(console.error).finally(() => prisma.$disconnect());
