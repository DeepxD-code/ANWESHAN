import { Request, Response } from "express";
import prisma from "../config/prisma";
import { notifyGuardians, isTwilioConfigured } from "../services/twilio.service";

const DEFAULT_CHECKIN_THRESHOLD_HOURS = 24;

export const createCheckIn = async (req: Request, res: Response) => {
  try {
    const { userId, latitude, longitude, location } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required." });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const checkIn = await prisma.checkIn.create({
      data: { userId, latitude: latitude ?? null, longitude: longitude ?? null, location: location ?? null },
    });

    await prisma.user.update({ where: { id: userId }, data: { lastCheckIn: new Date() } });

    res.status(201).json({ success: true, checkIn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getCheckInHistory = async (req: Request, res: Response) => {
  try {
    const { seniorId } = req.params as { seniorId: string };
    const checkIns = await prisma.checkIn.findMany({
      where: { userId: seniorId },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
    res.status(200).json({ success: true, checkIns });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getMissedCheckIns = async (req: Request, res: Response) => {
  try {
    const thresholdHours = parseInt(req.query.thresholdHours as string) || DEFAULT_CHECKIN_THRESHOLD_HOURS;
    const thresholdDate = new Date(Date.now() - thresholdHours * 60 * 60 * 1000);

    const seniors = await prisma.user.findMany({
      where: {
        role: "SENIOR",
        isActive: true,
        OR: [{ lastCheckIn: null }, { lastCheckIn: { lt: thresholdDate } }],
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        city: true,
        lastCheckIn: true,
      },
    });

    const alerts = await prisma.alert.findMany({
      where: {
        type: "checkin_missed",
        createdAt: { gte: thresholdDate },
      },
      select: { seniorId: true },
    });
    const alertedSeniorIds = new Set(alerts.map((a: any) => a.seniorId));

    const missed = seniors.filter((s: any) => !alertedSeniorIds.has(s.id));
    res.status(200).json({
      success: true,
      thresholdHours,
      count: missed.length,
      missed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const triggerMissedCheckInAlert = async (req: Request, res: Response) => {
  try {
    const { seniorId, thresholdHours } = req.body;
    if (!seniorId) {
      return res.status(400).json({ success: false, message: "seniorId is required." });
    }

    const senior = await prisma.user.findUnique({ where: { id: seniorId } });
    if (!senior || senior.role !== "SENIOR") {
      return res.status(404).json({ success: false, message: "Senior not found." });
    }

    const alert = await prisma.alert.create({
      data: {
        type: "checkin_missed",
        seniorId,
        severity: "high",
        status: "pending",
        location: senior.city || undefined,
        duress: false,
      },
    });

    const guardians = await prisma.guardianLink.findMany({
      where: { seniorId },
      include: { guardian: true },
    });

    const notificationResults: any[] = [];
    for (const link of guardians) {
      const result = await notifyGuardians(alert, link.guardian, senior.fullName);
      notificationResults.push({ guardianId: link.guardianId, phone: link.guardian.phone, ...result });
    }

    res.status(201).json({
      success: true,
      alert,
      notifications: {
        configured: isTwilioConfigured(),
        sent: notificationResults,
        guardianCount: guardians.length,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const scanForMissedCheckIns = async () => {
  try {
    const thresholdHours = DEFAULT_CHECKIN_THRESHOLD_HOURS;
    const thresholdDate = new Date(Date.now() - thresholdHours * 60 * 60 * 1000);

    const seniors = await prisma.user.findMany({
      where: {
        role: "SENIOR",
        isActive: true,
        OR: [{ lastCheckIn: null }, { lastCheckIn: { lt: thresholdDate } }],
      },
    });

    const recentAlerts = await prisma.alert.findMany({
      where: {
        type: "checkin_missed",
        createdAt: { gte: thresholdDate },
      },
      select: { seniorId: true },
    });
    const alerted = new Set(recentAlerts.map((a: any) => a.seniorId));

    let triggered = 0;
    for (const senior of seniors) {
      if (alerted.has(senior.id)) continue;
      await prisma.alert.create({
        data: {
          type: "checkin_missed",
          seniorId: senior.id,
          severity: "high",
          status: "pending",
          location: senior.city || undefined,
          duress: false,
        },
      });
      const guardians = await prisma.guardianLink.findMany({
        where: { seniorId: senior.id },
        include: { guardian: true },
      });
      for (const link of guardians) {
        const alert = { type: "checkin_missed", location: senior.city || undefined } as any;
        await notifyGuardians(alert, link.guardian, senior.fullName);
      }
      triggered++;
    }
    return { triggered, thresholdHours };
  } catch (error) {
    console.error("Check-in scan failed:", error);
    return { triggered: 0, thresholdHours: DEFAULT_CHECKIN_THRESHOLD_HOURS };
  }
};