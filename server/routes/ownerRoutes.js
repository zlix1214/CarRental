import express from "express";
import { changeRoleToOwner } from "../controllers/ownerController";
import { protect } from "../middleware/auth";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);

export default ownerRouter;
