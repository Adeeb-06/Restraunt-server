import { Request, Response } from "express";
import User from "./user.model";

/**
 * POST /api/users/register
 * Creates a new user record. Returns 400 if email already exists.
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { restrauntName, email, firebaseUid, photoURL } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({
      restrauntName,
      email,
      firebaseUid: firebaseUid || "",
      photoURL: photoURL || "",
      role: "owner",
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error: unknown) {
    console.error("registerUser error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message });
  }
};

/**
 * POST /api/users/upsert
 * Creates user if they don't exist, or links firebaseUid if missing.
 * Used for Google / social sign-in flows.
 */
export const upsertUser = async (req: Request, res: Response) => {
  try {
    const { restrauntName, email, firebaseUid, photoURL } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        restrauntName: restrauntName || email.split("@")[0],
        email,
        firebaseUid: firebaseUid || "",
        photoURL: photoURL || "",
        role: "owner",
      });
    } else if (firebaseUid && !user.firebaseUid) {
      // Link firebase UID if it wasn't stored yet
      user.firebaseUid = firebaseUid;
      await user.save();
    }

    res.status(200).json({ message: "User upserted", user });
  } catch (error: unknown) {
    console.error("upsertUser error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message });
  }
};

/**
 * GET /api/users/:email/exists
 * Quick existence check — returns { exists: boolean }
 */
export const userExists = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ exists: false });
      return;
    }
    res.status(200).json({ exists: true });
  } catch (error: unknown) {
    console.error("userExists error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/users
 * Returns all users (admin use).
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-__v");
    res.status(200).json(users);
  } catch (error: unknown) {
    console.error("getAllUsers error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * GET /api/users/:email
 * Returns a single user by email.
 */
export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email }).select("-__v");
    if (!user) {
      res.status(404).json({ exists: false, message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error: unknown) {
    console.error("getUserByEmail error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * PATCH /api/users/:email/role
 * Updates user role — protected, admin only.
 */
export const updateUserRole = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { role } = req.body;

  const validRoles = ["customer", "admin", "staff"];
  if (!validRoles.includes(role)) {
    res.status(400).json({ message: `Invalid role. Must be one of: ${validRoles.join(", ")}` });
    return;
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { role },
      { new: true },
    ).select("-__v");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "Role updated", user });
  } catch (error: unknown) {
    console.error("updateUserRole error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * PATCH /api/users/:email/settings
 * Updates user settings such as itemImageEnabled
 */
export const updateUserSettings = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { itemImageEnabled } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { itemImageEnabled } },
      { new: true }
    ).select("-__v");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "Settings updated", user });
  } catch (error: unknown) {
    console.error("updateUserSettings error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * PATCH /api/users/:email/profile
 * Updates user profile: restrauntName, photoURL
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { restrauntName, photoURL } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { restrauntName, photoURL } },
      { new: true }
    ).select("-__v");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error: unknown) {
    console.error("updateUserProfile error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addColours = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { colors } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { colors } },
      { new: true }
    ).select("-__v");
    if (!user) {
      res.status(404).json({ message: "User   not found" });
      return;
    }
    res.status(200).json({ message: "Colors updated successfully", user });
  } catch (error: unknown) {
    console.error("addColours error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
  
