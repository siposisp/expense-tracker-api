import type { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';

export const authController = {
    async register(req: Request, res: Response) {
        try {
            const user = await authService.register(req.body);

            return res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ 
                    error: error.message,
                });
            }

            return res.status(500).json({
                error: 'Internal server error',
            });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const user = await authService.login(req.body.email, req.body.password);

            return res.status(200).json(user);
        } catch (error){
            if (error instanceof Error) {
                return res.status(400).json({ 
                    error: error.message,
                });
            }

            return res.status(500).json({
                error: 'Internal server error',
            });
        }
    },
};