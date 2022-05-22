import { validationResult, check } from "express-validator";

// utils
import { useErrorResponse } from "../utils/apiResponse.js";

const validateUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (!errors.isEmpty()) {
      errors.errors.map((err) => {
        return res.status(422).json(useErrorResponse(err.msg, res.statusCode));
      });
    }
  }

  next();
};


export const userLoginValidate = [
  check("userName").notEmpty().withMessage("User Name is required"),
  check("password").notEmpty().withMessage("Password is required"),
  validateUser,
];

