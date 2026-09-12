import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";
import { passwordResetTokenRepository } from "../repositories/passwordResetToken.repository.js";
import { sendPasswordResetEmail } from "../utils/mailer.js";
import { request } from "http";


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

        // Return only non-sensitive user information.
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
            token,
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

    //Generates a password reset token and sends it via email.
    async requestPasswordReset(email:string) {
        const user = await userRepository.findByEmail(email);

        // We do not reveal whether the email exists or not.
        if(!user) {
            return {
                message: "A reset link has been sent."
            };
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); //1 hour

        await passwordResetTokenRepository.create({
            token, 
            expiresAt, 
            userId: user.id,
        });

        await sendPasswordResetEmail(user.email, token);

        return {
            message: "A reset link has been sent."
        };
    },

    //Resets the password using a valid, unused, non-expired token.
    async resetPassword(token: string, newPassword:string) {
        const resetToken = await passwordResetTokenRepository.findByToken(token);

        if(!resetToken){
            throw new Error("Invalid or expired reset token");
        }

        if(resetToken.used){
            throw new Error("This reset link has already been used");
        }

        if(resetToken.expiresAt < new Date()) {
            throw new Error("Invalid or expired reset token");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await userRepository.updatePassword(resetToken.userId, hashedPassword);
        await passwordResetTokenRepository.markAsUsed(resetToken.id);

        return {
            message: "Password reset successfully"
        };

    }











};