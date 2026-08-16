import { Request, Response } from "express";
import prisma from "../config/prisma";

const queryString = (value: unknown, fallback = "") => {
  if (Array.isArray(value)) return String(value[0] ?? fallback);
  return typeof value === "string" ? value : fallback;
};

// Create a new community thread
export const createThread = async (req: Request, res: Response) => {
  try {
    const { title, description, scamType, severity, area, authorId } = req.body;

    if (!title || !scamType || !authorId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, scamType, authorId",
      });
    }

    const thread = await prisma.communityThread.create({
      data: {
        title,
        description,
        scamType,
        severity: severity || "medium",
        area,
        authorId,
        category: "scam-alert",
      },
      include: {
        author: {
          select: { id: true, fullName: true, role: true },
        },
      },
    });

    res.status(201).json({ success: true, thread });
  } catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({ success: false, message: "Failed to create thread" });
  }
};

// Get all community threads with pagination
export const getThreads = async (req: Request, res: Response) => {
  try {
    const scamType = queryString(req.query.scamType);
    const severity = queryString(req.query.severity);
    const skip = queryString(req.query.skip, "0");
    const take = queryString(req.query.take, "10");

    const where: any = { isLocked: false };
    if (scamType) where.scamType = scamType;
    if (severity) where.severity = severity;

    const threads = await prisma.communityThread.findMany({
      where,
      include: {
        author: {
          select: { id: true, fullName: true, role: true },
        },
        posts: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: parseInt(skip as string),
      take: parseInt(take as string),
    });

    const total = await prisma.communityThread.count({ where });

    res.status(200).json({ success: true, threads, total, skip, take });
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(500).json({ success: false, message: "Failed to fetch threads" });
  }
};

// Get single thread with all posts
export const getThreadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    // Increment view count
    await prisma.communityThread.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    const thread = await prisma.communityThread.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, fullName: true, role: true },
        },
        posts: {
          include: {
            author: {
              select: { id: true, fullName: true, role: true },
            },
            replies: {
              include: {
                author: {
                  select: { id: true, fullName: true, role: true },
                },
              },
            },
          },
          where: { parentPostId: null },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!thread) {
      return res.status(404).json({ success: false, message: "Thread not found" });
    }

    res.status(200).json({ success: true, thread });
  } catch (error) {
    console.error("Error fetching thread:", error);
    res.status(500).json({ success: false, message: "Failed to fetch thread" });
  }
};

// Add a post/reply to a thread
export const addPost = async (req: Request, res: Response) => {
  try {
    const { threadId, content, authorId, parentPostId } = req.body;

    if (!threadId || !content || !authorId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: threadId, content, authorId",
      });
    }

    const post = await prisma.communityPost.create({
      data: {
        content,
        authorId,
        threadId,
        parentPostId: parentPostId || null,
      },
      include: {
        author: {
          select: { id: true, fullName: true, role: true },
        },
      },
    });

    // Update thread's reply count
    if (!parentPostId) {
      await prisma.communityThread.update({
        where: { id: threadId },
        data: { replyCount: { increment: 1 } },
      });
    }

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ success: false, message: "Failed to add post" });
  }
};

// Get posts for a thread
export const getThreadPosts = async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params as { threadId: string };
    const skip = queryString(req.query.skip, "0");
    const take = queryString(req.query.take, "20");

    const posts = await prisma.communityPost.findMany({
      where: {
        threadId,
        parentPostId: null,
      },
      include: {
        author: {
          select: { id: true, fullName: true, role: true },
        },
        replies: {
          include: {
            author: {
              select: { id: true, fullName: true, role: true },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: parseInt(skip as string),
      take: parseInt(take as string),
    });

    const total = await prisma.communityPost.count({
      where: { threadId, parentPostId: null },
    });

    res.status(200).json({ success: true, posts, total, skip, take });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
};

// Mark post as helpful
export const markPostHelpful = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const post = await prisma.communityPost.update({
      where: { id },
      data: { isHelpful: true },
    });

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error marking post helpful:", error);
    res.status(500).json({ success: false, message: "Failed to mark post" });
  }
};

// Like/upvote a post
export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const post = await prisma.communityPost.update({
      where: { id },
      data: { likeCount: { increment: 1 } },
    });

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ success: false, message: "Failed to like post" });
  }
};

// Get popular scam types/categories
export const getScamCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.communityThread.groupBy({
      by: ["scamType"],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
    });

    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
};

// Search threads
export const searchThreads = async (req: Request, res: Response) => {
  try {
    const query = queryString(req.query.query);
    const skip = queryString(req.query.skip, "0");
    const take = queryString(req.query.take, "10");

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const threads = await prisma.communityThread.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { scamType: { contains: query } },
        ],
      },
      include: {
        author: {
          select: { id: true, fullName: true, role: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: parseInt(skip as string),
      take: parseInt(take as string),
    });

    const total = await prisma.communityThread.count({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { scamType: { contains: query } },
        ],
      },
    });

    res.status(200).json({ success: true, threads, total, query });
  } catch (error) {
    console.error("Error searching threads:", error);
    res.status(500).json({ success: false, message: "Failed to search threads" });
  }
};
