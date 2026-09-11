import { prisma } from "../lib/prisma.js";

export const passwordResetTokenRepository = {
    
    // Creates a new password reset token for a user.
    create(data: {
        token: string;
        expiresAt: Date;
        userId: number
    }) {
        return prisma.passwordResetToken.create({
            data,
        });
    },

    // Finds a token record by its token string.
    findByToken(token: string) {
        return prisma.passwordResetToken.findUnique({
            where: { token },
        });
    },

    // Marks a token as used, so it can't be reused.
    markAsUSed(id: number) {
        return prisma.passwordResetToken.update({
            where: { id },
            data: { used: true },
        });
    },




}