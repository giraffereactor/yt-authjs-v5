import "server-only";

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.NODEMAILER_GOOGLE_SMTP_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    accessToken: process.env.NODEMAILER_GOOGLE_ACCESS_TOKEN,
    refreshToken: process.env.NODEMAILER_GOOGLE_REFRESH_TOKEN,
  },
});

export default transport;
