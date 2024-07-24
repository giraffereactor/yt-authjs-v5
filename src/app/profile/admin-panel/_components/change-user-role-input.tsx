"use client";

import { changeUserRoleAction } from "@/actions/admin/change-user-role-action";
import { users } from "@/drizzle/schema";
import React, { useTransition } from "react";

type ChangeUserRoleInputProps = {
  email: (typeof users.$inferSelect)["email"];
  currentRole: (typeof users.$inferSelect)["role"];
  isAdmin: boolean;
};

export const ChangeUserRoleInput = ({
  email,
  currentRole,
  isAdmin,
}: ChangeUserRoleInputProps) => {
  const [isPending, startTransition] = useTransition();

  const changeHandler = (
    email: string,
    evt: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newRole = evt.target.value as (typeof users.$inferSelect)["role"];

    if (newRole === currentRole) return;

    startTransition(async () => {
      await changeUserRoleAction(email, newRole);
    });
  };

  return (
    <select
      disabled={isAdmin || isPending}
      defaultValue={currentRole}
      onChange={changeHandler.bind(null, email)}
      className="w-full rounded border border-gray-200 bg-white px-2 py-1 leading-tight focus:border-gray-500 focus:outline-none disabled:opacity-50"
    >
      <option value="user">USER</option>
      <option value="admin">ADMIN</option>
    </select>
  );
};
