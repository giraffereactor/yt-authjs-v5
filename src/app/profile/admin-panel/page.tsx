import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { USER_ROLES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { findAllUsers } from "@/resources/user-queries";
import { ArrowLeftSquareIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ToggleEmailVerifiedInput } from "./_components/toggle-email-verified-input";
import { ChangeUserRoleInput } from "./_components/change-user-role-input";

export default async function Page() {
  const session = await auth();

  if (session?.user?.role !== USER_ROLES.ADMIN) redirect("/profile");

  const users = await findAllUsers();

  return (
    <main className="mt-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <ProfileButton />
        </div>

        <div className="my-4 h-1 bg-muted" />
        <h2 className="text-2xl font-bold tracking-tight">All Users</h2>

        <div className="my-4 h-1 bg-muted" />
        <table className="mt-4 w-full table-auto divide-y">
          <thead>
            <tr className="divide-x">
              <th className="bg-primary-foreground px-6 py-3 text-start">id</th>
              <th className="bg-primary-foreground px-6 py-3 text-start">
                name
              </th>
              <th className="bg-primary-foreground px-6 py-3 text-start">
                email
              </th>
              <th className="bg-primary-foreground px-6 py-3 text-start">
                email verified
              </th>
              <th className="bg-primary-foreground px-6 py-3 text-start">
                role
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={cn("divide-x", {
                  "bg-primary/15": user.role === USER_ROLES.ADMIN,
                })}
              >
                <td className="px-6 py-3">{user.id}</td>
                <td
                  className={cn("px-6 py-3", {
                    "opacity-50": user.name === null,
                  })}
                >
                  {user.name ?? "NULL"}
                </td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  <ToggleEmailVerifiedInput
                    email={user.email}
                    emailVerified={user.emailVerified}
                    isAdmin={user.role === USER_ROLES.ADMIN}
                  />
                </td>
                <td className="px-6 py-3 uppercase">
                  <ChangeUserRoleInput
                    email={user.email}
                    currentRole={user.role}
                    isAdmin={user.role === USER_ROLES.ADMIN}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const ProfileButton = () => {
  return (
    <Button size="lg" asChild>
      <Link href="/profile">
        <ArrowLeftSquareIcon className="mr-2" />
        Profile
      </Link>
    </Button>
  );
};
