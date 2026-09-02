import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";


type RegisterData = {
    name: string;
    email: string;
    password: string;
};

/**
 * Authentication Service
 *
 * Contains the business logic related to user authentication.
 * It handles user registration, password hashing, credential validation,
 * and JWT generation for authenticated users.
 *
 * Database access is delegated to userRepository.
 * Passwords are never stored or returned in plain text.
 */
export const authService = {

    // Registers a new user after checking that the email is not already in use.
    async register(data: RegisterData) {
        const existingUser = await userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash the password before storing it in the database.
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });

        // Return only non-sensitive user information.
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };
    },

    // Validates user credentials and generates a JWT if authentication succeeds.
    async login(email: string, password: string) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Compare the provided password with the stored hashed password.
        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            throw new Error("Invalid email or password");
        }

        // Create a signed token containing the authenticated user's ID and role.
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as NonNullable<SignOptions["expiresIn"]>
            }

        );

        return {
            token,
        };
    },
};