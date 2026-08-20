import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import prisma from "../config/prisma";

function generateCaretakerToken(): string {
  const prefix = "CT";
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();
  const suffix = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `${prefix}-${random}-${suffix}-${new Date().getFullYear()}`;
}

function generateDeviceId(): string {
  return `device_${crypto.randomBytes(8).toString("hex")}`;
}

export const register = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      age,
      gender,
      city,
      address,
      role,
      deviceId: providedDeviceId,
      caretakerToken,
      policeId,
    } = req.body;

    if (role === "ADMIN") {
      return res.status(403).json({ success: false, message: "Admin accounts cannot be created via registration." });
    }

    if (role === "OFFICER") {
      return res.status(403).json({ success: false, message: "Police officer accounts cannot be created via registration. Contact system administrator." });
    }

    if (role === "FAMILY") {
      if (!caretakerToken) {
        return res.status(400).json({ success: false, message: "Caretaker token is required for family registration." });
      }

      const senior = await prisma.user.findUnique({
        where: { caretakerToken },
      });

      if (!senior) {
        return res.status(404).json({ success: false, message: "Invalid or expired caretaker token." });
      }

      if (senior.role !== "SENIOR") {
        return res.status(400).json({ success: false, message: "Token does not belong to a senior citizen." });
      }

      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { phone }] },
      });

      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          fullName,
          email,
          phone,
          password: hashedPassword,
          age,
          gender,
          city,
          address,
          role: "FAMILY",
        },
      });

      await prisma.guardianLink.create({
        data: { seniorId: senior.id, guardianId: user.id, relation: "Family Member" },
      });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        success: true,
        message: "Caretaker registration successful. Linked to senior citizen.",
        token,
        user,
      });
    }

    if (role === "SENIOR") {
      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { phone }] },
      });

      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const deviceId = providedDeviceId || generateDeviceId();
      const token = generateCaretakerToken();

      const user = await prisma.user.create({
        data: {
          fullName,
          email,
          phone,
          password: hashedPassword,
          age,
          gender,
          city,
          address,
          role: "SENIOR",
          deviceId,
          caretakerToken: token,
        },
      });

      const jwtToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        success: true,
        message: "Senior citizen registration successful. Share your caretaker token with family members.",
        token: jwtToken,
        user,
        caretakerToken: token,
      });
    }

    return res.status(400).json({ success: false, message: "Invalid role specified." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, policeId } = req.body;

    let user;
    if (policeId) {
      user = await prisma.user.findUnique({ where: { policeId } });
      if (!user || user.role !== "OFFICER") {
        return res.status(404).json({ success: false, message: "Invalid police ID." });
      }
    } else {
      user = await prisma.user.findUnique({ where: { email } });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: "Account is deactivated. Contact administrator." });
    }

    let validPassword = false;
    if (policeId) {
      validPassword = await bcrypt.compare(password, user.password);
    } else {
      validPassword = await bcrypt.compare(password, user.password);
    }

    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        deviceId: user.deviceId,
        caretakerToken: user.caretakerToken,
        policeId: user.policeId,
        badgeNumber: user.badgeNumber,
        station: user.station,
        rank: user.rank,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id, fullName, phone, email } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { fullName, phone, email },
      select: { id: true, fullName: true, email: true, phone: true, role: true },
    });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const linkCaretaker = async (req: Request, res: Response) => {
  try {
    const { seniorId, caretakerToken } = req.body;
    const user = req.body.user;

    const senior = await prisma.user.findUnique({ where: { id: seniorId } });
    if (!senior || senior.caretakerToken !== caretakerToken) {
      return res.status(400).json({ success: false, message: "Invalid caretaker token." });
    }

    const existingLink = await prisma.guardianLink.findUnique({
      where: { seniorId_guardianId: { seniorId, guardianId: user.id } },
    });

    if (existingLink) {
      return res.status(400).json({ success: false, message: "Already linked to this senior citizen." });
    }

    const link = await prisma.guardianLink.create({
      data: { seniorId, guardianId: user.id, relation: "Family Member" },
    });

    return res.status(201).json({ success: true, link });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const verifyCaretakerToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const senior = await prisma.user.findUnique({ where: { caretakerToken: token } });

    if (!senior || senior.role !== "SENIOR") {
      return res.status(404).json({ success: false, message: "Invalid token." });
    }

    return res.status(200).json({
      success: true,
      senior: { id: senior.id, fullName: senior.fullName, city: senior.city },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};