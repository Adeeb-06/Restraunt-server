import User from "../user/user.model";
import { Request, Response } from "express";

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().select("restrauntName email photoURL");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
}

const addAccessCode = async (req: Request, res: Response) => {
    try {
        const { code, validity } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.accessCodes.push({ code, validity });
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to add access code" });
    }
}

export { getAllUsers, getUserById, addAccessCode };