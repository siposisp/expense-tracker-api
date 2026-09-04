import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "./auth.middleware.js";

/**
 * Role Authorization Middleware
 *
 * Verifies that the authenticated user has administrator permissions.
 * This middleware assumes that authMiddleware has already validated
 * the JWT and stored the authenticated user in req.user.
 *
 * If the user is not authenticated, the request is rejected with 401.
 * If the user is authenticated but is not an administrator,
 * the request is rejected with 403.
 *
 * Otherwise, the request continues to the next middleware or controller.
 */
export function rolAuthMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    // Reject requests without an authenticated user.
    if (!req.user) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }

    const userRole = req.user.role;

    // Reject authenticated users without administrator permissions.
    if (userRole !== "ADMIN") {
        return res.status(403).json({
            error: "Forbidden",
        });
    }

    // Continue if the authenticated user is an administrator.
    return next();
}