import {useErrorResponse} from "../utils/apiResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err);

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id ${err.value}`;
    error = useErrorResponse(message, 404);
  }

  // Mongoose Duplication Error
  if (err.code === 11000) {
    const message = "Duplicate Field Entered";
    error = useErrorResponse(message, 400);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = useErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
