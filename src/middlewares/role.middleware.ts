import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "./auth.middleware.js";


export function rolAuthMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
){
    //No authenticated user
    if(!req.user){
        return res.status(401).json({
            error: "Unauthorized",
        });
    }

    const userRole = req.user.role;

    //Authenticated user but not administrator
    if(userRole !== "ADMIN"){
        return res.status(403).json({
            error: "Forbidden",
        });
    }

    return next();
}




