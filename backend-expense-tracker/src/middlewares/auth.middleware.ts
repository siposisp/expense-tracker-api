import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Authentication Middleware
 *
 * Validates the JWT sent in the Authorization header.
 * If the token is valid, it extracts the authenticated user's
 * ID and role and stores them in req.user.
 *
 * If authentication fails, the request is stopped with a 401 response.
 * Otherwise, the request continues to the next middleware or controller.
 */

// Describes the user data stored inside the JWT payload.
interface TokenPayload {
    id: number;
    role: string;
}

// Extends Express Request so authenticated user data can be stored in req.user.
export interface AuthenticatedRequest extends Request {
    user?: TokenPayload;
}

export function authMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    // Get the Authorization header from the request.
    const authorization = req.headers.authorization;

    // Reject requests that do not include an Authorization header.
    if (!authorization) {
        return res.status(401).json({
            error: "Token required",
        });
    }

    // Split "Bearer TOKEN" into the authentication type and the token itself.
    const [type, token] = authorization.split(" ");

    // Validate the expected Bearer token format.
    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            error: "Invalid token format",
        });
    }

    try {
        // Verify the token signature and expiration using the server secret.
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as TokenPayload;

        // Store the authenticated user's identity for the next layers.
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        // Continue to the next middleware or controller.
        return next();

    } catch {
        // Reject tokens that are invalid, modified, or expired.
        return res.status(401).json({
            error: "Invalid or expired token",
        });
    }
}