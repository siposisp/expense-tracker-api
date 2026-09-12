import { transporter } from "../lib/transporter.js";

export async function sendPasswordResetEmail(to: string, resetToken: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
        from: `"Expense Tracker" <${process.env.GMAIL_USER}>`,
        to,
        subject: "Reset your password",
        text: `You requested to reset your password. Visit this link to continue: ${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, ignore this email.`,
        html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
                <p>Hi,</p>
                <p>We received a request to reset your password for your Expense Tracker account.</p>
                <p>
                    <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 8px;">
                        Reset Password
                    </a>
                </p>
                <p>Or copy and paste this link into your browser:</p>
                <p style="color: #6b7280; word-break: break-all;">${resetUrl}</p>
                <p>This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.</p>
            </div>
        `,
    });
}