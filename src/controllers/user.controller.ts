import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import type { Response } from "express";
import { userService } from "../services/user.service.js";

/**
 * User Controller
 *
 * Handles HTTP requests related to the authenticated user.
 * It obtains the user information added to the request by
 * the authentication middleware and delegates the business
 * logic to userService.
 *
 * This controller does not access the database directly.
 */
export const userController = {

    // Retrieves the authenticated user's information.
    async getUser(req: AuthenticatedRequest, res: Response) {
        // Reject the request if no authenticated user is available.
        if (!req.user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        try {
            const userId = req.user.id;

            const user = await userService.getById(userId);

            return res.status(200).json(user);

        } catch (error) {
            // Return a not found response if the user does not exist.
            if (error instanceof Error) {
                return res.status(404).json({
                    error: error.message,
                });
            }

            // Handle unexpected errors.
            return res.status(500).json({
                error: "Internal server error",
            });
        }
    },

};