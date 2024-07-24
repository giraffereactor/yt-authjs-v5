import "server-only";
import db from "@/drizzle";
import { adminUserEmailAddresses, lower } from "@/drizzle/schema";

export const findAdminUserEmailAddresses = async () => {
  const adminUserEmailAddress = await db
    .select({ email: lower(adminUserEmailAddresses.email) })
    .from(adminUserEmailAddresses);

  return adminUserEmailAddress.map((item) => item.email as string);
};
