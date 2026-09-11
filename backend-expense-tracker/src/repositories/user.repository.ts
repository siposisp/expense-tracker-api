import { prisma } from "../lib/prisma.js";

/**
 * User Repository
 *
 * Handles all database operations related to users using Prisma.
 * It provides methods to create users and retrieve them by ID or email.
 *
 * This layer is responsible only for database access.
 * Business logic and validation are handled by the service layer.
 */
export const userRepository = {

    // Creates a new user in the database.
    create(data: {
        email: string;
        password: string;
        name: string;
    }) {
        return prisma.user.create({
            data,
        });
    },

    // Finds a user by their unique ID.
    findById(id: number) {
        return prisma.user.findUnique({
            where: { id },
        });
    },

    // Finds a user by their unique email address.
    findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    },

    // Updates the user's password.
    updatePassword(id: number, hashedPassword: string) {
        return prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
    },

};