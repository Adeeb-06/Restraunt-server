import { Request, Response } from "express";
export declare const registerUser: (req: Request, res: Response) => Promise<void>;
export declare const upsertUser: (req: Request, res: Response) => Promise<void>;
export declare const userExists: (req: Request, res: Response) => Promise<void>;
export declare const getAllUsers: (_req: Request, res: Response) => Promise<void>;
export declare const getUserByEmail: (req: Request, res: Response) => Promise<void>;
export declare const updateUserRole: (req: Request, res: Response) => Promise<void>;
export declare const updateUserSettings: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map