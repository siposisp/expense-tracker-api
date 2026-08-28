import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js"
import type { Response } from 'express';
import { userService } from '../services/user.service.js';



export const userController = {
    async getUser(req: AuthenticatedRequest, res: Response){
        if(!req.user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        try {
            const userId = req.user.id;

            const user = await userService.getById(userId);

            return res.status(200).json(user);

        }catch(error){
            if(error instanceof Error){
                return res.status(404).json({
                    error: error.message,
                });
            }

            return res.status(500).json({
                error: 'Internal server error',
            });
            
        }
    },

};