import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth";
export declare const isAdmin: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=isAdmin.d.ts.map