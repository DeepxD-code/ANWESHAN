import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma";

export const register = async (
  req: Request,
  res: Response
) => {

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
    } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone },
        ],
      },
    });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });

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

        role,

      },

    });

    return res.status(201).json({

      success: true,

      message: "Registration successful.",

      user,

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal server error.",

    });

  }

};



export const login = async (

  req: Request,

  res: Response

) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user = await prisma.user.findUnique({

      where: {
        email,
      },

    });

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found.",

      });

    }

    const validPassword = await bcrypt.compare(

      password,

      user.password

    );

    if (!validPassword) {

      return res.status(401).json({

        success: false,

        message: "Invalid credentials.",

      });

    }

    const token = jwt.sign(

      {

        id: user.id,

        role: user.role,

      },

      process.env.JWT_SECRET as string,

      {

        expiresIn: "7d",

      }

    );

    return res.status(200).json({

      success: true,

      token,

      user,

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal server error.",

    });

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
