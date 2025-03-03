import express from "express";
import prisma from "../db/index.js"
const router = express.Router();

// Create the routes here

// Getting all active users
router.get("/", async function (request, response) {

    try {
      const getActive = await prisma.user.findMany({
       include: {
        isActive: true
        }
      });
      response.status(200).json({
        sucess: true,
        getActive,
      });
    } catch (error) {
      console.log(error);
    }
  });


  // Getting all admin users
router.get("/admins", async function (request, response) {
    const adminUsers = parseInt(request.params.adminUsers);
    try {
      const getAdmin = await prisma.user.findMany({
       include: {
        isAdmin: true
        }
      });
      response.status(200).json({
        sucess: true,
        getAdmin,
      });
    } catch (error) {
      console.log(error);
    }
  });


//deleting users
router.delete("/:id", async (request, response) => {
    try {
      const deleteUser = await prisma.user.delete({
        where: {
          firstName: request.params.firstName,
          lastName: request.params.lastName
        },
      })
      if (deleteUser) {
        const newUser = await prisma.user.findMany({
          where: {
            firstName: request.params.firstName,
            lastName: request.params.lastName
          },
        })
        response.status(200).json({
          success: true,
          message: "User was successfully deleted!"
        })
      } else {
        response.status(400), json({
          message: "Something went wrong, user could not be deleted!"
        })
      }
    } catch (error) {
      console.log(error)
      response.status(400).json({
        success: false,
        message: "Something went wrong!"
      })
    }
  })

//creating a new user
router.post("/", async (request, response) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
        //   userId: 1,
        },
      });
  
      if (newUser) {
        response.status(201).json({
          success: true,
          message: "New user created!",
          newUser,
        });
      } else {
        response.status(400).json({
          success: false,
          message: "User was not created",
        });
      }
    } catch (e) {
      console.log(e);
      response.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  })


//updating a user
router.put("/:id", async (request, response) => {
    try {
      const updateUser = await prisma.user.updateMany({
        where: {
          id: parseInt(request.params.userId),
        },
        data:{
            firstName: request.body.firstName,
            lastName: request.body.lastName,
        },
      })
      if (updateUser) {
        response.status(200).json({
          success: true,
          message: "User information was updated",
          userList
        });
      } else {
        response.status(400).json({
          success: false,
          message: "User not updated. Something failed."
        })
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        success: false,
        message: "Something went wrong"
      });
    }
  });
  
export default router;
