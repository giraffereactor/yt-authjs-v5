import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as v from "valibot";
import argon2 from "argon2";
import { SigninSchema } from "@/validators/signin-validator";
import { findUserByEmail } from "@/resources/user-queries";
import { OAuthAccountAlreadyLinkedError } from "@/lib/custom-errors";
import { authConfig } from "@/auth.config";

const { providers: authConfigProviders, ...authConfigRest } = authConfig;

const nextAuth = NextAuth({
  ...authConfigRest,
  providers: [
    ...authConfigProviders,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = v.safeParse(SigninSchema, credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.output;

          const user = await findUserByEmail(email);
          if (!user) return null;

          if (!user.password) throw new OAuthAccountAlreadyLinkedError();

          const passwordsMatch = await argon2.verify(user.password, password);

          if (passwordsMatch) {
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }

        return null;
      },
    }),
  ],
});

export const { signIn, signOut, auth, handlers } = nextAuth;
