"use server";

import * as v from "valibot";
import { UpdateUserInfoSchema } from "@/validators/update-user-info-validator";
import { auth } from "@/auth";
import { users } from "@/drizzle/schema";
import db from "@/drizzle";
import { eq } from "drizzle-orm";

type Res =
  | {
      success: true;
      data: {
        id: (typeof users.$inferSelect)["id"];
        name: (typeof users.$inferSelect)["name"];
      };
    }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 401 | 500 };

export async function updateUserInfoAction(values: unknown): Promise<Res> {
  const parsedValues = v.safeParse(UpdateUserInfoSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);
    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { id, name } = parsedValues.output;

  const session = await auth();

  if (!session?.user?.id || session.user.id !== id) {
    return { success: false, error: "Unauthorized", statusCode: 401 };
  }

  if (session.user.name === name) {
    return { success: true, data: { id, name } };
  }

  try {
    const updatedUser = await db
      .update(users)
      .set({ name })
      .where(eq(users.id, id))
      .returning({ id: users.id, name: users.name })
      .then((res) => res[0]);

    return { success: true, data: updatedUser };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
