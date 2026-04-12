import { Router } from "express";
import {
  registerUser,
  upsertUser,
  getAllUsers,
  userExists,
  getUserByEmail,
  updateUserRole,
  updateUserSettings,
  updateUserProfile,
  addColours,
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
userRouter.patch("/:email/settings", verifyAuth, updateUserSettings);
userRouter.patch("/:email/profile", verifyAuth, updateUserProfile);
userRouter.patch("/:email/colors", verifyAuth, addColours);

export default userRouter;
