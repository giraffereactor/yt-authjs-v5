"use server";

import argon2 from "argon2";
import * as v from "valibot";
import { SignupSchema } from "@/validators/signup-validator";
import db from "@/drizzle";
import { lower, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

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
      .select({ id: users.id })
      .from(users)
      .where(eq(lower(users.email), email.toLowerCase()))
      .then((res) => res[0] ?? null);

    if (existingUser?.id) {
      return { success: false, error: "Email already exists", statusCode: 409 };
    }
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }

  try {
    const hashedPassword = await argon2.hash(password);

    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ id: users.id })
      .then((res) => res[0]);

    console.log({ insertedId: newUser.id });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
