export default function HomePage() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>

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
