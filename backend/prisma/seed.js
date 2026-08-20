"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hash = await bcrypt_1.default.hash("password123", 10);
    // Admin - pre-created at development time
    const admin = await prisma.user.upsert({
        where: { email: "admin@anweshan.gov.in" },
        update: {},
        create: {
            fullName: "System Administrator",
            email: "admin@anweshan.gov.in",
            phone: "9000000000",
            password: hash,
            age: 35,
            gender: "Male",
            city: "Ahmedabad",
            address: "Cyber Crime Branch HQ",
            role: "ADMIN",
            isVerified: true,
        },
    });
    // Police Officer - login only with police ID
    const officer = await prisma.user.upsert({
        where: { email: "officer@example.com" },
        update: {},
        create: {
            fullName: "Inspector Rahul Mehta",
            email: "officer@example.com",
            phone: "9876543212",
            password: hash,
            age: 38,
            gender: "Male",
            city: "Ahmedabad",
            address: "Cyber Crime Branch",
            role: "OFFICER",
            policeId: "POL-AHD-001",
            badgeNumber: "CCB-2024-001",
            station: "Ahmedabad Cyber Crime Branch",
            rank: "Inspector",
            isVerified: true,
        },
    });
    // Senior Citizen - signup with phone + name, device ID stored, caretaker token generated
    const senior = await prisma.user.upsert({
        where: { email: "ramesh@example.com" },
        update: {},
        create: {
            fullName: "Ramesh Patel",
            email: "ramesh@example.com",
            phone: "9876543210",
            password: hash,
            age: 72,
            gender: "Male",
            city: "Ahmedabad",
            address: "Satellite, Ahmedabad",
            role: "SENIOR",
            deviceId: "device_senior_ramesh_001",
            caretakerToken: "CT-7X9K2M-PATEL-2026",
            lastCheckIn: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
    });
    // Caretaker (Family) - maps to senior via token
    const guardian = await prisma.user.upsert({
        where: { email: "rajesh@example.com" },
        update: {},
        create: {
            fullName: "Rajesh Patel",
            email: "rajesh@example.com",
            phone: "9876543211",
            password: hash,
            age: 45,
            gender: "Male",
            city: "Ahmedabad",
            address: "Satellite, Ahmedabad",
            role: "FAMILY",
        },
    });
    await prisma.guardianLink.upsert({
        where: { seniorId_guardianId: { seniorId: senior.id, guardianId: guardian.id } },
        update: {},
        create: { seniorId: senior.id, guardianId: guardian.id, relation: "Son" },
    });
    // Additional caretaker (daughter)
    const guardian2 = await prisma.user.upsert({
        where: { email: "priya@example.com" },
        update: {},
        create: {
            fullName: "Priya Shah",
            email: "priya@example.com",
            phone: "9876543213",
            password: hash,
            age: 40,
            gender: "Female",
            city: "Ahmedabad",
            address: "Vastrapur, Ahmedabad",
            role: "FAMILY",
        },
    });
    await prisma.guardianLink.upsert({
        where: { seniorId_guardianId: { seniorId: senior.id, guardianId: guardian2.id } },
        update: {},
        create: { seniorId: senior.id, guardianId: guardian2.id, relation: "Daughter" },
    });
    // Community Channels
    await prisma.communityChannel.upsert({
        where: { id: "channel-general" },
        update: {},
        create: {
            id: "channel-general",
            name: "general-scams",
            description: "General scam reports and discussions",
            category: "general",
            isPrivate: false,
        },
    });
    await prisma.communityChannel.upsert({
        where: { id: "channel-phishing" },
        update: {},
        create: {
            id: "channel-phishing",
            name: "phishing-scams",
            description: "Phishing, smishing, vishing reports",
            category: "phishing",
            isPrivate: false,
        },
    });
    await prisma.communityChannel.upsert({
        where: { id: "channel-romance" },
        update: {},
        create: {
            id: "channel-romance",
            name: "romance-scams",
            description: "Romance/dating scam reports",
            category: "romance",
            isPrivate: false,
        },
    });
    await prisma.communityChannel.upsert({
        where: { id: "channel-investment" },
        update: {},
        create: {
            id: "channel-investment",
            name: "investment-scams",
            description: "Investment and financial fraud reports",
            category: "investment",
            isPrivate: false,
        },
    });
    const existing = await prisma.complaint.findFirst();
    if (!existing) {
        await prisma.complaint.create({
            data: {
                complaintId: "ANW-2026-00124",
                title: "UPI Refund Scam",
                description: "Fraudster pretending to be bank executive.",
                category: "UPI Fraud",
                priority: "High",
                status: "INVESTIGATING",
                reportedLoss: 42000,
                location: "Satellite, Ahmedabad",
                userId: senior.id,
            },
        });
        await prisma.complaint.create({
            data: {
                complaintId: "ANW-2026-00125",
                title: "WhatsApp Investment Scam",
                description: "Fake investment advisor promising high returns.",
                category: "Investment Scam",
                priority: "Medium",
                status: "PENDING",
                reportedLoss: 18500,
                location: "Navrangpura",
                userId: senior.id,
            },
        });
    }
    await prisma.alert.create({
        data: {
            type: "sos",
            status: "pending",
            severity: "critical",
            location: "Satellite, Ahmedabad",
            seniorId: senior.id,
        },
    });
    // Sample check-ins
    await prisma.checkIn.create({
        data: { userId: senior.id, latitude: 23.0225, longitude: 72.5714, location: "Satellite, Ahmedabad", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    });
    await prisma.checkIn.create({
        data: { userId: senior.id, latitude: 23.0225, longitude: 72.5714, location: "Satellite, Ahmedabad", createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000) },
    });
    await prisma.checkIn.create({
        data: { userId: senior.id, latitude: 23.0225, longitude: 72.5714, location: "Satellite, Ahmedabad", createdAt: new Date(Date.now() - 50 * 60 * 60 * 1000) },
    });
    // Sample community posts
    await prisma.communityPost.create({
        data: {
            title: "Fake bank call asking for OTP",
            content: "Received a call from 'SBI' asking for OTP to verify account. They knew my name and last 4 digits of account. Hung up immediately.",
            category: "vishing",
            region: "Ahmedabad",
            latitude: 23.0225,
            longitude: 72.5714,
            userId: senior.id,
            channelId: "channel-phishing",
        },
    });
    await prisma.communityPost.create({
        data: {
            title: "Investment scam on WhatsApp group",
            content: "Someone in our senior citizen WhatsApp group shared a link for 'guaranteed 20% returns'. It's a fake trading platform. Don't fall for it!",
            category: "investment",
            region: "Ahmedabad",
            latitude: 23.03,
            longitude: 72.58,
            userId: guardian.id,
            channelId: "channel-investment",
        },
    });
    await prisma.communityPost.create({
        data: {
            title: "Romance scam alert - fake profile on matrimony site",
            content: "My friend was contacted by someone claiming to be an NRI doctor. After 2 weeks of chatting, they asked for money for 'visa fees'. It's a scam!",
            category: "romance",
            region: "Ahmedabad",
            latitude: 23.0,
            longitude: 72.55,
            userId: guardian2.id,
            channelId: "channel-romance",
        },
    });
    console.log("Database seeded successfully");
    console.log("Admin: admin@anweshan.gov.in / password123");
    console.log("Officer: officer@example.com / password123");
    console.log("Senior: ramesh@example.com / password123 (Token: CT-7X9K2M-PATEL-2026)");
    console.log("Guardian: rajesh@example.com / password123");
    console.log("Guardian2: priya@example.com / password123");
}
main().catch(console.error).finally(() => prisma.$disconnect());
