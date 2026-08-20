import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getPlatformStats = async (_req: Request, res: Response) => {
  try {
    const [
      seniors,
      officers,
      admins,
      families,
      complaints,
      activeCases,
      alerts,
      activeAlerts,
      checkIns,
      evidence,
      evidencePending,
      evidenceApproved,
      communityPosts,
      communityReplies,
      emergencies,
      activeEmergencies,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "SENIOR", isActive: true } }),
      prisma.user.count({ where: { role: "OFFICER", isActive: true } }),
      prisma.user.count({ where: { role: "ADMIN", isActive: true } }),
      prisma.user.count({ where: { role: "FAMILY", isActive: true } }),
      prisma.complaint.count(),
      prisma.case.count({ where: { status: { not: "CLOSED" } } }),
      prisma.alert.count(),
      prisma.alert.count({ where: { status: { notIn: ["resolved", "closed", "RESOLVED", "CLOSED"] } } }),
      prisma.checkIn.count(),
      prisma.evidence.count(),
      prisma.evidenceReview.count({ where: { status: "pending" } }),
      prisma.evidenceReview.count({ where: { status: "approved" } }),
      prisma.communityPost.count(),
      prisma.communityReply.count(),
      prisma.emergency.count(),
      prisma.emergency.count({ where: { status: "ACTIVE" } }),
    ]);

    const byRegionRaw = await prisma.communityPost.groupBy({ by: ["region"], _count: { _all: true } });
    const byCategoryRaw = await prisma.evidenceReview.groupBy({ by: ["category"], _count: { _all: true } });

    res.status(200).json({
      success: true,
      stats: {
        users: {
          seniors,
          officers,
          admins,
          families,
          total: seniors + officers + admins + families,
        },
        complaints: {
          total: complaints,
          activeCases,
        },
        alerts: {
          total: alerts,
          active: activeAlerts,
        },
        checkIns: {
          total: checkIns,
        },
        evidence: {
          total: evidence,
          pending: evidencePending,
          approved: evidenceApproved,
        },
        community: {
          posts: communityPosts,
          replies: communityReplies,
        },
        emergencies: {
          total: emergencies,
          active: activeEmergencies,
        },
        regions: byRegionRaw,
        evidenceByCategory: byCategoryRaw,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;
    const users = await prisma.user.findMany({
      where: role ? { role: String(role).toUpperCase() as any } : undefined,
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        city: true,
        isActive: true,
        createdAt: true,
        lastCheckIn: true,
        badgeNumber: true,
        station: true,
        caretakerToken: true,
      },
    });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const toggleUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as { userId: string };
    const { isActive } = req.body;
    if (typeof isActive !== "boolean") {
      return res.status(400).json({ success: false, message: "isActive (boolean) is required." });
    }
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: { id: true, fullName: true, isActive: true },
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getRecentActivity = async (_req: Request, res: Response) => {
  try {
    const [alerts, checkIns, posts, complaints] = await Promise.all([
      prisma.alert.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { senior: { select: { fullName: true } } },
      }),
      prisma.checkIn.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { user: { select: { fullName: true, role: true } } },
      }),
      prisma.communityPost.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { user: { select: { fullName: true } } },
      }),
      prisma.complaint.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { user: { select: { fullName: true } } },
      }),
    ]);

    const activities = [
      ...alerts.map((a: any) => ({
        type: "ALERT",
        message: `Alert for ${a.senior?.fullName || "senior"}: ${a.type} (${a.severity})`,
        createdAt: a.createdAt,
      })),
      ...checkIns.map((c: any) => ({
        type: "CHECKIN",
        message: `${c.user?.fullName || "User"} checked in`,
        createdAt: c.createdAt,
      })),
      ...posts.map((p: any) => ({
        type: "COMMUNITY",
        message: `${p.user?.fullName || "User"} posted: ${p.content?.slice(0, 60) || ""}`,
        createdAt: p.createdAt,
      })),
      ...complaints.map((c: any) => ({
        type: "COMPLAINT",
        message: `${c.user?.fullName || "User"} filed complaint ${c.complaintId || ""}`,
        createdAt: c.createdAt,
      })),
    ]
      .sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 20);

    res.status(200).json({ success: true, activities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};