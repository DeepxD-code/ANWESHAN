import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getChannels = async (_req: Request, res: Response) => {
  try {
    const channels = await prisma.communityChannel.findMany({
      orderBy: { createdAt: "asc" },
      include: { _count: { select: { posts: true } } },
    });
    res.status(200).json({ success: true, channels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params as { channelId: string };
    const where: any = channelId !== "all" ? { channelId } : {};
    const posts = await prisma.communityPost.findMany({
      where,
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      include: {
        user: { select: { id: true, fullName: true, role: true } },
        replies: {
          include: { user: { select: { id: true, fullName: true } } },
          orderBy: { createdAt: "asc" },
        },
        _count: { select: { replies: true } },
      },
    });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category, region, latitude, longitude, channelId, userId } = req.body;
    if (!title || !content || !userId) {
      return res.status(400).json({ success: false, message: "title, content and userId are required." });
    }
    const post = await prisma.communityPost.create({
      data: {
        title,
        content,
        category: category || "general",
        region: region || null,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        channelId: channelId || null,
        userId,
      },
    });
    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const addReply = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params as { postId: string };
    const { content, userId } = req.body;
    if (!content || !userId) {
      return res.status(400).json({ success: false, message: "content and userId are required." });
    }
    const reply = await prisma.communityReply.create({
      data: { content, userId, postId },
      include: { user: { select: { id: true, fullName: true } } },
    });
    res.status(201).json({ success: true, reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getRegionalStats = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.communityPost.findMany({
      select: { category: true, region: true, latitude: true, longitude: true, createdAt: true },
    });

    const byRegion: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    const byDay: Record<string, number> = {};

    for (const p of posts) {
      const region = p.region || "Unknown";
      byRegion[region] = (byRegion[region] || 0) + 1;
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
      const day = p.createdAt.toISOString().split("T")[0];
      byDay[day] = (byDay[day] || 0) + 1;
    }

    res.status(200).json({
      success: true,
      byRegion,
      byCategory,
      byDay,
      total: posts.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};