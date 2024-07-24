import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <div className="text-3xl font-bold tracking-tight">Sign Up</div>

        <div className="my-2 h-1 bg-muted" />
        <p>Verification email has been sent!</p>
        <p>Please check your email to verify your account.</p>

        <div className="my-2 h-1 bg-muted" />
        <span>
          Click{" "}
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href="/">here</Link>
          </Button>{" "}
          to go back to the home page.
        </span>
      </div>
    </main>
  );
}
