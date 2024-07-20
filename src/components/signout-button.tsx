"use client";

import { signoutUserAction } from "@/actions/signout-user-action";
import { Button } from "@/components/ui/button";

export const SignoutButton = () => {
  const clickHandler = async () => {
    await signoutUserAction();
    window.location.href = "/";
  };

  return (
    <Button variant="destructive" size="sm" onClick={clickHandler}>
      Sign Out
    </Button>
  );
};
