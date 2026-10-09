import { Link, Outlet } from 'react-router-dom'
import { Orbit } from 'lucide-react'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-orbitra-900 text-orbitra-text">
      <header className="flex h-16 items-center justify-between border-b border-orbitra-border px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-blue/15 text-accent-cyan">
            <Orbit size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold">Orbitra</span>
            <span className="block text-[11px] text-orbitra-muted">Deploy</span>
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/login" className="text-orbitra-muted hover:text-orbitra-text">
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-accent-blue px-3 py-1.5 font-medium text-white hover:bg-blue-500"
          >
            Register
          </Link>
        </nav>
      </header>
      <main className="px-4 py-8 md:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout
