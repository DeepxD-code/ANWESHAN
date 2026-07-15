import { Request, Response } from "express";
import prisma from "../config/prisma";
import { notifyGuardians, isTwilioConfigured } from "../services/twilio.service";

export const createAlert = async (req: Request, res: Response) => {
  try {
    const { type, seniorId, latitude, longitude, location, duress, conversation } = req.body;
    const alert = await prisma.alert.create({
      data: { type, seniorId, latitude, longitude, location, duress: duress || false, severity: type === "sos" ? "critical" : "medium" },
    });
    const senior = await prisma.user.findUnique({ where: { id: seniorId } });
    const seniorName = senior?.fullName || "your senior";
    const guardians = await prisma.guardianLink.findMany({ where: { seniorId }, include: { guardian: true } });
    const notificationResults: any[] = [];
    for (const link of guardians) {
      const result = await notifyGuardians(alert, link.guardian, seniorName, conversation);
      notificationResults.push({ guardianId: link.guardianId, phone: link.guardian.phone, ...result });
    }
    const twilioOk = isTwilioConfigured();
    res.status(201).json({
      success: true,
      alert,
      notifications: {
        configured: twilioOk,
        sent: notificationResults,
        guardianCount: guardians.length,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getAlerts = async (_req: Request, res: Response) => {
  try {
    const alerts = await prisma.alert.findMany({ orderBy: { createdAt: "desc" }, include: { senior: true, guardian: true } });
    res.status(200).json({ success: true, alerts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getAlertById = async (req: Request, res: Response) => {
  try {
    const alert = await prisma.alert.findUnique({ where: { id: req.params.id as string }, include: { senior: true, guardian: true, conversations: true } });
    if (!alert) return res.status(404).json({ success: false, message: "Alert not found." });
    res.status(200).json({ success: true, alert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const updateAlert = async (req: Request, res: Response) => {
  try {
    const alert = await prisma.alert.update({ where: { id: req.params.id as string }, data: req.body });
    res.status(200).json({ success: true, alert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getAlertsByGuardian = async (req: Request, res: Response) => {
  try {
    const links = await prisma.guardianLink.findMany({ where: { guardianId: req.params.guardianId as string } });
    const seniorIds = links.map((l: { seniorId: string }) => l.seniorId);
    const alerts = await prisma.alert.findMany({
      where: { seniorId: { in: seniorIds } },
      orderBy: { createdAt: "desc" },
      include: { senior: true, conversations: true },
    });
    res.status(200).json({ success: true, alerts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};