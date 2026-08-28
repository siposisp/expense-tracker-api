import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// Describes the data we expect to find inside the token
interface TokenPayload {
    id: number;
    role: string;
}

// Extends Express Request so we can add req.user
export interface AuthenticatedRequest extends Request {
    user?: TokenPayload;
}


export function authMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    // Get the Authorization header
    const authorization  = req.headers.authorization;

    // Reject the request if no Authorization header is provided
    if (!authorization) {
        return res.status(401).json({ 
            error: "Token required", 
        });
    }

    // Split "Bearer TOKEN" into two parts
    const [type,token] = authorization.split(" ");

    // Check that the token has the expected Bearer format
    if(type !== "Bearer" || !token){
        return res.status(401).json({ 
            error: "Invalid token format", 
        });
    }

    try {
        // Verify the token using the server's secret key
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as TokenPayload;

        // Store the authenticated user's data in the request
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        // Continue to the next middleware or controller
        next();
    } catch {
        // Reject invalid or expired tokens
        return res.status(401).json({
            error: "Invalid or expired token",
        });
    }
}


