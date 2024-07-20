import type { JWT as DefaultJWT } from "next-auth/jwt";
import type { User as DefaultUser } from "next-auth";
import { users } from "@/drizzle/schema";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: (typeof users.$inferSelect)["role"];
    emailVerified: (typeof users.$inferSelect)["emailVerified"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: (typeof users.$inferSelect)["id"];
    role: (typeof users.$inferSelect)["role"];
  }
}
