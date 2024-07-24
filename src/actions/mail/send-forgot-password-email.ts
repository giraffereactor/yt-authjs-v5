"use server";

import { VERIFICATION_TOKEN_EXP_MIN } from "@/lib/constants";
import transport from "@/lib/nodemailer";

export async function sendForgotPasswordEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  console.log(`Sending email to ${email} with token ${token}`);

  await transport.sendMail({
    from: `"Authy Team" <${process.env.NODEMAILER_GOOGLE_SMTP_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
      <h2 style="text-align: center; color: #eab308;">Authy</h2>

      <p>Hi there,</p>

      <p>Please use the link below to access the reset password form on Authy. This link will expire in ${VERIFICATION_TOKEN_EXP_MIN} minutes. If you don't think you should be receiving this email, you can safely ignore it.</p>

      <p style="text-align: center;">
        <a href="${process.env.AUTH_URL}/auth/signin/forgot-password?token=${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #eab308; text-decoration: none; border-radius: 5px;">Reset Password Form</a>
      </p>
      
      <br />

      <p>You received this email because you send a forgot password request for Authy.</p>

      <p style="text-align: center; font-size: 12px; color: #aaa;">&copy; 2024 Authy. All rights reserved.</p>
    </div>
    `,
  });

  console.log(`Email send to ${email} with token ${token}`);
}
