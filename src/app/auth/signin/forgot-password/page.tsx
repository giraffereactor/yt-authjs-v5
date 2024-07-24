import { Button } from "@/components/ui/button";
import { findVerificationTokenByToken } from "@/resources/verification-token-queries";
import Link from "next/link";
import { ResetPasswordForm } from "./_components/reset-password-form";

type PageProps = { searchParams: { token: string } };

export default async function Page({ searchParams }: PageProps) {
  const verificationToken = await findVerificationTokenByToken(
    searchParams.token,
  );

  if (!verificationToken?.expires) return <TokenIsInvalidState />;

  const isExpired = new Date(verificationToken.expires) < new Date();

  if (isExpired) return <TokenIsInvalidState />;

  return (
    <main className="mt-4">
      <div className="container">
        <div className="text-3xl font-bold tracking-tight">
          Forgot Password?
        </div>

        <div className="my-2 h-1 bg-muted" />
        <div className="rounded bg-green-100 p-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Enter your new password below
          </h2>

          <div className="mt-4">
            <ResetPasswordForm
              email={verificationToken.identifier}
              token={searchParams.token}
            />
          </div>
        </div>

        <span>
          No longer need to reset your password? Click{" "}
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>{" "}
          to sign in.
        </span>
      </div>
    </main>
  );
}

const TokenIsInvalidState = () => {
  return (
    <main className="mt-4">
      <div className="container">
        <div className="text-3xl font-bold tracking-tight">
          Forgot Password?
        </div>

        <div className="my-2 h-1 bg-muted" />
        <div className="rounded bg-red-100 p-4">
          <p>Token is invalid.</p>

          <span>
            Click{" "}
            <Button variant="link" size="sm" className="px-0" asChild>
              <Link href="/auth/signin">here</Link>
            </Button>{" "}
            to sign in page so you can request a new forgot password email.
          </span>
        </div>
      </div>
    </main>
  );
};
