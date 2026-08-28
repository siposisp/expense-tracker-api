import { userRepository } from '../repositories/user.repository.js';

export const userService = {
    async getById(id: number){
        const user = await userRepository.findById(id);

        if(!user){
            throw new Error("User not found");
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        }
    },



};

