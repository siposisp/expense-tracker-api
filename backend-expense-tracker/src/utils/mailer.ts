import { resend } from "../lib/resend.js";

export async function sendPasswordResetEmail(to: string, resetToken: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject: "Reset your password",
        html: `
            <p>You requested to reset your password.</p>
            <p><a href="${resetUrl}">Click here to reset your password</a></p>
            <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
        `,
    });
}