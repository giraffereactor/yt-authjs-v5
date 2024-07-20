"use server";

import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { and, eq, isNull } from "drizzle-orm";

export async function oauthVerifyEmailAction(email: string) {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(
      and(
        eq(users.email, email),
        isNull(users.password),
        isNull(users.emailVerified),
      ),
    )
    .then((res) => res[0] ?? null);

  if (existingUser?.id) {
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, existingUser.id));
  }
}
