import "server-only";

import db from "@/drizzle";
import { lower, users } from "@/drizzle/schema";
import {
  desc,
  eq,
  getTableColumns,
  //  getTableColumns
} from "drizzle-orm";
import { USER_ROLES } from "@/lib/constants";
import { auth } from "@/auth";
// import { auth } from "@/auth";

/* ADMIN QUERIES - THESE QUERIES REQUIRE ADMIN ACCESS */
export async function findAllUsers() {
  const session = await auth();

  if (session?.user?.role !== USER_ROLES.ADMIN) {
    throw new Error("Unauthorized");
  }

  const { password, ...rest } = getTableColumns(users);

  const allUsers = await db
    .select({ ...rest })
    .from(users)
    .orderBy(desc(users.role));

  return allUsers;
}
/* -------------------------------------------------- */

export const findUserByEmail = async (
  email: string,
): Promise<typeof users.$inferSelect | null> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()))
    .then((res) => res[0] ?? null);

  return user;
};

// type UserWithoutPassword = Omit<typeof users.$inferSelect, "password">;

// export const findUserById = async (
//   id: string,
// ): Promise<UserWithoutPassword> => {
//   const { password, ...rest } = getTableColumns(users);

//   const user = await db
//     .select(rest)
//     .from(users)
//     .where(eq(users.id, id))
//     .then((res) => res[0] ?? null);

//   if (!user) throw new Error("User not found.");

//   return user;
// };

// export const findUserByAuth = async () => {
//   const session = await auth();

//   const sessionUserId = session?.user?.id;
//   if (!sessionUserId) throw new Error("Unauthorized");

//   const { password, ...rest } = getTableColumns(users);

//   const user = await db
//     .select(rest)
//     .from(users)
//     .where(eq(users.id, sessionUserId))
//     .then((res) => res[0] ?? null);

//   if (!user) throw new Error("User not found.");

//   return user;
// };
