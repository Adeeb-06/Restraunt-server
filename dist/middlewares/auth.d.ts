import { Request, Response, NextFunction } from "express";
export interface AuthenticatedRequest extends Request {
    userEmail?: string;
    userId?: string;
    firebaseUid?: string;
}
export declare const verifyAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map