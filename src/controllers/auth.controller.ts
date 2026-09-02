import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";

/**
 * Authentication Controller
 *
 * Handles HTTP requests related to user authentication.
 * It receives request data, calls the authentication service,
 * and returns the appropriate HTTP response.
 *
 * Business logic such as password hashing, credential validation,
 * and JWT generation is delegated to authService.
 */
export const authController = {

    // Registers a new user using the data received in the request body.
    async register(req: Request, res: Response) {
        try {
            const user = await authService.register(req.body);

            return res.status(201).json(user);

        } catch (error) {
            // Return a client error when the registration process fails.
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message,
                });
            }

            // Handle unexpected errors.
            return res.status(500).json({
                error: "Internal server error",
            });
        }
    },

    // Authenticates a user using the provided email and password.
    async login(req: Request, res: Response) {
        try {
            const user = await authService.login(
                req.body.email,
                req.body.password
            );

            return res.status(200).json(user);

        } catch (error) {
            // Return a client error when authentication fails.
            if (error instanceof Error) {
                return res.status(400).json({
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