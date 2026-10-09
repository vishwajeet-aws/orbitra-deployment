import { NavLink } from 'react-router-dom'
import { Orbit, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'
import { appNavItems } from '../../data/navigation.js'
import { cn } from '../../utils/cn.js'

function Sidebar({ collapsed, mobileOpen, onToggleCollapsed, onCloseMobile }) {
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onCloseMobile}
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-orbitra-border bg-orbitra-950 transition-all duration-200',
          collapsed ? 'lg:w-[76px]' : 'lg:w-64',
          mobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex h-16 items-center justify-between gap-2 border-b border-orbitra-border px-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-blue/15 text-accent-cyan">
              <Orbit size={18} />
            </span>
            {!collapsed || mobileOpen ? (
              <div className="min-w-0 lg:block">
                <p className={cn('truncate text-sm font-semibold', collapsed && !mobileOpen ? 'lg:hidden' : '')}>
                  Orbitra
                </p>
                <p className={cn('truncate text-[11px] text-orbitra-muted', collapsed && !mobileOpen ? 'lg:hidden' : '')}>
                  Deploy
                </p>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            className="rounded-md p-1.5 text-orbitra-muted hover:bg-orbitra-800 hover:text-orbitra-text lg:hidden"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
          <button
            type="button"
            className="hidden rounded-md p-1.5 text-orbitra-muted hover:bg-orbitra-800 hover:text-orbitra-text lg:inline-flex"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {appNavItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    title={item.label}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        collapsed ? 'lg:justify-center lg:px-0' : '',
                        isActive
                          ? 'bg-accent-blue/15 font-medium text-accent-cyan'
                          : 'text-orbitra-muted hover:bg-orbitra-800 hover:text-orbitra-text',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          className={cn('shrink-0', isActive ? 'text-accent-cyan' : 'text-orbitra-muted')}
                        />
                        <span className={cn('truncate', collapsed ? 'lg:hidden' : '')}>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
