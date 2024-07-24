import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <div className="text-3xl font-bold tracking-tight">Reset Password</div>

        <div className="my-2 h-1 bg-muted" />
        <p>Password has been successfully reset!</p>

        <div className="my-2 h-1 bg-muted" />
        <span>
          Click{" "}
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>{" "}
          to sign in.
        </span>
      </div>
    </main>
  );
}
