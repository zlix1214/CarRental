import express from "express";
import {
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { getCars } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserData);
userRouter.get("/car", getCars);

export default userRouter;
