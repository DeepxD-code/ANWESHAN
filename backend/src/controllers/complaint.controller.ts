import { Request, Response } from "express";
import prisma from "../config/prisma";



export const createComplaint = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      title,
      description,
      category,
      priority,
      reportedLoss,
      location,
      userId,
    } = req.body;


    const complaint =
      await prisma.complaint.create({

        data: {

          complaintId:
            "ANW-" + Date.now(),

          title,

          description,

          category,

          priority,

          reportedLoss,

          location,

          userId,

        },

      });



    return res.status(201).json({

      success: true,

      message:
        "Complaint created successfully.",

      complaint,

    });


  } catch (error) {

    console.error(error);


    return res.status(500).json({

      success: false,

      message:
        "Internal server error.",

    });

  }

};







export const getComplaints = async (

  _req: Request,

  res: Response

) => {

  try {


    const complaints =
      await prisma.complaint.findMany({

        include: {

          user: true,

        },

        orderBy: {

          createdAt: "desc",

        },

      });



    return res.status(200).json({

      success: true,

      complaints,

    });



  } catch (error) {


    console.error(error);



    return res.status(500).json({

      success: false,

      message:
        "Internal server error.",

    });


  }

};







export const getComplaintById = async (

  req: Request,

  res: Response

) => {

  try {


    const id = req.params.id as string;



    const complaint =
      await prisma.complaint.findUnique({

        where: {

          id,

        },

        include: {

          user: true,

        },

      });



    if (!complaint) {


      return res.status(404).json({

        success: false,

        message:
          "Complaint not found.",

      });


    }



    return res.status(200).json({

      success: true,

      complaint,

    });



  } catch (error) {


    console.error(error);



    return res.status(500).json({

      success: false,

      message:
        "Internal server error.",

    });


  }

};








export const updateComplaint = async (

  req: Request,

  res: Response

) => {

  try {


    const id = req.params.id as string;



    const complaint =
      await prisma.complaint.update({

        where: {

          id,

        },


        data: req.body,


      });



    return res.status(200).json({

      success: true,

      message:
        "Complaint updated successfully.",


      complaint,


    });



  } catch (error) {


    console.error(error);



    return res.status(500).json({

      success: false,

      message:
        "Internal server error.",

    });


  }

};









export const deleteComplaint = async (

  req: Request,

  res: Response

) => {

  try {


    const id = req.params.id as string;



    await prisma.complaint.delete({

      where: {

        id,

      },

    });



    return res.status(200).json({

      success: true,

      message:
        "Complaint deleted successfully.",

    });



  } catch (error) {


    console.error(error);



    return res.status(500).json({

      success: false,

      message:
        "Internal server error.",

    });


  }

};