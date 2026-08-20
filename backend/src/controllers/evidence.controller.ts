import { Request, Response } from "express";
import prisma from "../config/prisma";

// Keyword-based auto-categorization (AI-like classifier used for the prototype)
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  phishing: ["phishing", "link", "kyc", "verify", "click here", "update your", "suspicious link", "secure-bank", "login", "password reset", "account suspended", "unusual activity"],
  vishing: ["call", "calling", "phone call", "sbi", "hdfc", "bank manager", "executive", "asked me to", "spoke to"],
  smishing: ["sms", "text message", "received a message", "otp", "sent me", "courier", "parcel", "delivery"],
  upi_fraud: ["upi", "gpay", "google pay", "phonepe", "paytm", "collect request", "money debited", "transaction", "refund"],
  investment: ["investment", "returns", "trading", "stock", "mutual fund", "profit", "guaranteed", "share market", "crypto"],
  romance: ["matrimony", "dating", "nri", "love", "relationship", "visa fees", "boyfriend", "girlfriend", "marriage"],
  job: ["job", "salary", "registration fee", "offer letter", "hr@", "employment", "work from home", "interview"],
  digital_arrest: ["arrest", "police", "ed", "cbi", "money laundering", "narcotics", "court", "summons", "bail", "warrant"],
  lottery: ["lottery", "prize", "won", "winner", "congratulations", "claim your"],
  pension: ["pension", "lifecert", "jivan pramaan", "epfo", "pf claim"],
};

const CATEGORY_LABELS: Record<string, string> = {
  phishing: "Phishing",
  vishing: "Vishing (Call)",
  smishing: "Smishing (SMS)",
  upi_fraud: "UPI Fraud",
  investment: "Investment Scam",
  romance: "Romance Scam",
  job: "Job Scam",
  digital_arrest: "Digital Arrest",
  lottery: "Lottery / Prize",
  pension: "Pension Fraud",
};

export function autoCategorize(text: string): { category: string; label: string; confidence: number } {
  const lower = (text || "").toLowerCase();
  let best = "general";
  let bestScore = 0;

  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = cat;
    }
  }

  const confidence = bestScore > 0 ? Math.min(0.95, 0.5 + bestScore * 0.12) : 0.3;
  return { category: best, label: CATEGORY_LABELS[best] || "General", confidence };
}

export const uploadEvidence = async (req: Request, res: Response) => {
  try {
    const { fileName, fileUrl, fileType, fileSize, complaintId, userId, description } = req.body;

    if (!fileName || !fileUrl || !userId) {
      return res.status(400).json({ success: false, message: "fileName, fileUrl and userId are required." });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found — please log in again." });
    }

    // Auto-categorize from file name + description
    const ai = autoCategorize(`${fileName} ${description || ""}`);

    const evidence = await prisma.evidence.create({
      data: {
        fileName,
        fileUrl,
        fileType: fileType || "DOCUMENT",
        fileSize: fileSize ? String(fileSize) : null,
        complaintId: complaintId || null,
        userId,
      },
    });

    // Create a review entry — status pending until a caretaker (human-in-the-loop) approves
    let review = null;
    try {
      review = await prisma.evidenceReview.create({
        data: {
          evidenceId: evidence.id,
          reviewedBy: userId,
          status: "pending",
          aiCategory: ai.category,
          aiConfidence: ai.confidence,
          category: ai.category,
          notes: description || null,
        },
      });
    } catch (e) {
      console.warn("Review entry creation failed (evidence may already have a review):", e);
    }

    res.status(201).json({
      success: true,
      evidence,
      autoCategory: ai,
      review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getEvidenceForReview = async (_req: Request, res: Response) => {
  try {
    const reviews = await prisma.evidenceReview.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "desc" },
      include: {
        evidence: {
          include: { user: { select: { id: true, fullName: true, phone: true, role: true } } },
        },
        reviewer: { select: { id: true, fullName: true } },
      },
    });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const approveEvidence = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params as { reviewId: string };
    const { category, notes, reviewerId } = req.body;

    const review = await prisma.evidenceReview.update({
      where: { id: reviewId },
      data: {
        status: "approved",
        category: category || undefined,
        notes: notes || undefined,
        ...(reviewerId ? { reviewedBy: reviewerId } : {}),
      },
    });
    res.status(200).json({ success: true, review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const rejectEvidence = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params as { reviewId: string };
    const { notes, reviewerId } = req.body;

    const review = await prisma.evidenceReview.update({
      where: { id: reviewId },
      data: {
        status: "rejected",
        notes: notes || undefined,
        ...(reviewerId ? { reviewedBy: reviewerId } : {}),
      },
    });
    res.status(200).json({ success: true, review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getEvidenceStats = async (_req: Request, res: Response) => {
  try {
    const [total, pending, approved, rejected, byCategory] = await Promise.all([
      prisma.evidence.count(),
      prisma.evidenceReview.count({ where: { status: "pending" } }),
      prisma.evidenceReview.count({ where: { status: "approved" } }),
      prisma.evidenceReview.count({ where: { status: "rejected" } }),
      prisma.evidenceReview.groupBy({
        by: ["category"],
        _count: { _all: true },
      }),
    ]);
    res.status(200).json({ success: true, stats: { total, pending, approved, rejected, byCategory } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};