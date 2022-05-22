// Import Packages
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";


import errorHandler from "./middlewares/errorHandler.js";

// Import Modules
import connectDB from "./config/db.js";

// Import Routes
import userRoute from "./routes/userRoute.js";


// cors options
const corsOptions = {
  origin: "*",
  "Access-Control-Allow-Origin": "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();
connectDB();
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("App is running .... ");
});

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}


// routes
app.use("/api/v1/users", userRoute);



app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on ${process.env.NODE_ENV} at port ${PORT}`)
);
