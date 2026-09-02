import { userRepository } from '../repositories/user.repository.js';


/**
 * User Service
 *
 * Contains the business logic related to users.
 * It retrieves user information through the repository
 * and ensures that sensitive data, such as the password,
 * is not returned by the service.
 *
 * This layer does not access the database directly.
 * Database operations are delegated to userRepository.
 */
export const userService = {

    // Finds a user by ID and returns only non-sensitive information.
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

