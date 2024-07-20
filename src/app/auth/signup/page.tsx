import { Button } from "@/components/ui/button";
import { SignupForm } from "./_components/signup-form";
import Link from "next/link";
import {
  OAuthSigninButtons,
  OAuthSigninButtonsSkeleton,
} from "@/components/oauth-signin-buttons";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Sign Up</h1>

        {/* Signup Form */}
        <div className="my-4 h-1 bg-muted" />
        <SignupForm />

        {/* OAuth Links */}
        <div className="my-4 h-1 bg-muted" />
        <Suspense fallback={<OAuthSigninButtonsSkeleton signup />}>
          <OAuthSigninButtons signup />
        </Suspense>

        {/* Go to Signin Link */}
        <div className="my-4 h-1 bg-muted" />
        <p>
          Already have an account? Click{" "}
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>{" "}
          to sign in.
        </p>
      </div>
    </main>
  );
}
