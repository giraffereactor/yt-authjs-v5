"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignoutButton } from "@/components/signout-button";
import { useSession } from "next-auth/react";
import { Loader2Icon } from "lucide-react";

export const NavbarLinks = () => {
  const session = useSession();

  switch (session.status) {
    case "loading":
      return <Loading />;
    case "unauthenticated":
      return <SignedOut />;
    case "authenticated":
      return <SignedIn />;
    default:
      return null;
  }
};

const Loading = () => {
  return (
    <li>
      <Button size="sm" variant="ghost">
        <Loader2Icon className="min-w-[8ch] animate-spin" />
      </Button>
    </li>
  );
};

const SignedIn = () => {
  return (
    <>
      <li>
        <Button size="sm" asChild>
          <Link href="/profile">Profile</Link>
        </Button>
      </li>

      <li>
        <SignoutButton />
      </li>
    </>
  );
};

const SignedOut = () => {
  return (
    <>
      <li>
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </li>

      <li>
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
      </li>
    </>
  );
};
