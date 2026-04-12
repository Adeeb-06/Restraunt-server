import { Response, NextFunction } from "express";
import User from "../modules/user/user.model";
import { AuthenticatedRequest } from "./auth";

export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (user.role !== "admin") {
            res.status(403).json({ message: "Unauthorized - Requires Admin or Owner role" });
            return;
        }
        next();
    } catch (error: unknown) {
        console.error("isAdmin error:", error);
        res.status(500).json({ message: "Server Error" });
    }
}