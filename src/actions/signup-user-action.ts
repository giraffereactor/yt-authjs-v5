"use server";

import argon2 from "argon2";
import * as v from "valibot";
import { SignupSchema } from "@/validators/signup-validator";
import db from "@/drizzle";
import { lower, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { USER_ROLES } from "@/lib/constants";
import { findAdminUserEmailAddresses } from "@/resources/admin-user-email-address-queries";
import { createVerificationTokenAction } from "@/actions/create-verification-token-action";
import { sendSignupUserEmail } from "@/actions/mail/send-signup-user-email";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 409 | 500 };

export async function signupUserAction(values: unknown): Promise<Res> {
  const parsedValues = v.safeParse(SignupSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);
    console.log(flatErrors);
    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { name, email, password } = parsedValues.output;

  try {
    const existingUser = await db
      .select({
        id: users.id,
        email: users.email,
        emailVerified: users.emailVerified,
      })
      .from(users)
      .where(eq(lower(users.email), email.toLowerCase()))
      .then((res) => res[0] ?? null);

    if (existingUser?.id) {
      if (!existingUser.emailVerified) {
        const verificationToken = await createVerificationTokenAction(
          existingUser.email,
        );

        await sendSignupUserEmail({
          email: existingUser.email,
          token: verificationToken.token,
        });

        return {
          success: false,
          error: "User exists but not verified. Verification link resent",
          statusCode: 409,
        };
      } else {
        return {
          success: false,
          error: "Email already exists",
          statusCode: 409,
        };
      }
    }
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }

  try {
    const hashedPassword = await argon2.hash(password);
    const adminEmails = await findAdminUserEmailAddresses();
    const isAdmin = adminEmails.includes(email.toLowerCase());

    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role: isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER,
      })
      .returning({
        id: users.id,
        email: users.email,
        emailVerified: users.emailVerified,
      })
      .then((res) => res[0]);

    const verificationToken = await createVerificationTokenAction(
      newUser.email,
    );

    await sendSignupUserEmail({
      email: newUser.email,
      token: verificationToken.token,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
