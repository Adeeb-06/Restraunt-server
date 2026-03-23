import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth";
export declare const isOwner: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=isOwner.d.ts.map