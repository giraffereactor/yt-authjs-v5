export default function HomePage() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>

        <div className="my-2 h-1 bg-muted" />
        <h2 className="text-2xl font-bold tracking-tight">Features</h2>

        <ul className="mt-4 grid grid-cols-2 gap-2">
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            User in Client Components
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            User in Server Components
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Credentials Provider
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Protect Pages
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Signout
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Google OAuth Provider
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Github OAuth Provider
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Auth.js Drizzle Adapter
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Extend Session Information
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Auth.js Extend Types
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Auth.js Session Events
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Update Session (Client)
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Auth.js Session Callbacks
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Custom errors
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Account Linking
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Middleware
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            User Roles
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Admin Dashboard
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Email Verification
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Password Reset
          </li>
        </ul>

        <div className="my-2 h-1 bg-muted" />
        <h2 className="text-2xl font-bold tracking-tight">Created With</h2>

        <ul className="mt-4 grid grid-cols-4 gap-2">
          <li className="p-2 shadow hover:bg-muted">Next.js</li>
          <li className="p-2 shadow hover:bg-muted">Tailwind</li>
          <li className="p-2 shadow hover:bg-muted">shadcn/ui</li>
          <li className="p-2 shadow hover:bg-muted">Auth.js</li>
          <li className="p-2 shadow hover:bg-muted">Drizzle ORM</li>
          <li className="p-2 shadow hover:bg-muted">NeonDB</li>
          <li className="p-2 shadow hover:bg-muted">PostgreSQL</li>
          <li className="p-2 shadow hover:bg-muted">Valibot</li>
          <li className="p-2 shadow hover:bg-muted">TypeScript</li>
        </ul>
      </div>
    </main>
  );
}
