import { Router } from "express";
import { verifyAuth } from "../../middlewares/auth";
import { getAllUsers, getUserById, addAccessCode } from "./admin.controller";
import { isAdmin } from "../../middlewares/isAdmin";

const adminRouter = Router();

adminRouter.get("/users", verifyAuth, isAdmin, getAllUsers);
adminRouter.get("/users/:id", verifyAuth, isAdmin, getUserById);
adminRouter.post("/users/:id/access-codes", verifyAuth, isAdmin, addAccessCode);

export default adminRouter;
