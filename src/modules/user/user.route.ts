import { Router } from "express";
import {
  registerUser,
  upsertUser,
  getAllUsers,
  userExists,
  getUserByEmail,
  updateUserRole,
} from "./user.controller";
import { verifyAuth } from "../../middlewares/auth";

const userRouter = Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/upsert", upsertUser);
userRouter.get("/:email/exists", userExists);

// Protected routes (require Firebase token)
userRouter.get("/", verifyAuth, getAllUsers);
userRouter.get("/:email", verifyAuth, getUserByEmail);
userRouter.patch("/:email/role", verifyAuth, updateUserRole);

export default userRouter;
