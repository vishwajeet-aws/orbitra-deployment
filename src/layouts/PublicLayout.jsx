import { Link, NavLink, Outlet } from 'react-router-dom'
import { Orbit } from 'lucide-react'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-orbitra-900 text-orbitra-text">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-orbitra-border bg-orbitra-900/90 px-4 backdrop-blur md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-blue/15 text-accent-cyan">
            <Orbit size={18} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold">Orbitra</span>
            <span className="block text-[11px] text-orbitra-muted">Deploy</span>
          </span>
        </Link>
        <nav aria-label="Public navigation" className="flex items-center gap-2 text-sm sm:gap-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `hidden rounded-md px-2 py-1.5 transition-colors sm:inline-flex ${isActive ? 'text-orbitra-text' : 'text-orbitra-muted hover:text-orbitra-text'}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => `rounded-md px-2 py-1.5 transition-colors ${isActive ? 'text-orbitra-text' : 'text-orbitra-muted hover:text-orbitra-text'}`}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="rounded-lg bg-accent-blue px-3 py-2 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
          >
            Register
          </NavLink>
        </nav>
      </header>
      <main id="main-content" className="px-4 py-8 md:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-orbitra-border px-4 py-5 text-center text-xs text-orbitra-muted md:px-8">
        Orbitra Deploy · Frontend demo with mock data and authentication
      </footer>
    </div>
  )
}

export default PublicLayout
