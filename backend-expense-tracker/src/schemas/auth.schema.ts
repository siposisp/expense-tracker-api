import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email"),
})

export const resetPasswordSchema = z.object({
    token: z.string().min(1,"Token is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type forgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordInput = z.infer<typeof resetPasswordSchema>;


