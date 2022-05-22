import express from "express";
const router = express.Router();


// Controllers
import {
  authUser,
} from "../controllers/userController.js";

// Validator
import {
  userLoginValidate,
} from "../validator/userValidator.js";


router.post("/login", userLoginValidate, authUser);


export default router;


