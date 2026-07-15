import { Request, Response } from "express";
import prisma from "../config/prisma";

export const linkGuardian = async (req: Request, res: Response) => {
  try {
    const { seniorId, guardianId, relation } = req.body;
    const link = await prisma.guardianLink.create({ data: { seniorId, guardianId, relation } });
    res.status(201).json({ success: true, link });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getGuardians = async (req: Request, res: Response) => {
  try {
    const links = await prisma.guardianLink.findMany({
      where: { seniorId: req.params.guardianId as string },
      include: { guardian: true, senior: true },
    });
    res.status(200).json({ success: true, links });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getAlertsForGuardian = async (req: Request, res: Response) => {
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

export const classifyAlert = async (req: Request, res: Response) => {
  try {
    const { classification, guardianId } = req.body;
    const alert = await prisma.alert.update({
      where: { id: req.params.alertId as string },
      data: { classification, guardianId, status: "classified" },
    });
    res.status(200).json({ success: true, alert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};