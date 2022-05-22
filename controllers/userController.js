import asyncHandler from "express-async-handler";
import generateWebToken from "../utils/generateWebToken.js";


// Import model
import UserModel from "../models/UserModel.js";

// Utils
import { success, useErrorResponse } from "../utils/apiResponse.js";

// Request: POST
// Route: POST /api/v1/users/login
// Access: Public

export const authUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
  
    if (!userName || !password) {
      return res
        .status(422)
        .json(
          useErrorResponse("Please enter UserName and password", res.statusCode)
        );
    }
  
    const user = await UserModel.findOne({ userName });
  
    if (!user) {
      return res
        .status(422)
        .json(
          useErrorResponse("UserName or password is invalid", res.statusCode)
        );
    }
  
    
  
    if (user.password !== password) {
      return res
        .status(422)
        .json(
          useErrorResponse("UserName or password is invalid", res.statusCode)
        );
    }
  
    const userData = {
      id: user._id,
      userName: user.userName,
      token: generateWebToken(user._id),
    };
  
    if (user) {
      res
        .status(200)
        .json(success("User loggedIn successfully", userData, res.statusCode));
    }
  });
  