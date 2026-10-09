import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, CircleHelp, LogOut, Menu, Search, Settings, UserRound } from 'lucide-react'
import { SAMPLE_CURRENT_USER } from '../../data/currentUser.js'
import { SAMPLE_NOTIFICATIONS } from '../../data/notifications.js'
import { readPreferences } from '../../services/preferences.js'
import Button from '../common/Button.jsx'

function Topbar({ onOpenSidebar, onOpenSearch }) {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [preferences, setPreferences] = useState(() => readPreferences())
  const menuRef = useRef(null)
  const profile = preferences.profile
  const visibleNotifications = SAMPLE_NOTIFICATIONS.filter((item) => preferences.notifications[item.category] !== false)
  const unreadCount = visibleNotifications.filter((item) => item.unread).length

  useEffect(() => {
    const onClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileOpen(false)
        setNotificationsOpen(false)
        setHelpOpen(false)
      }
    }

    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    const onPreferencesChanged = (event) => { if (event.detail) setPreferences(event.detail) }
    window.addEventListener('orbitra:preferences-changed', onPreferencesChanged)
    return () => window.removeEventListener('orbitra:preferences-changed', onPreferencesChanged)
  }, [])

  const initials = profile.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || SAMPLE_CURRENT_USER.initials

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-orbitra-border bg-orbitra-900/80 px-4 backdrop-blur">
      <button
        type="button"
        className="rounded-lg p-2 text-orbitra-muted hover:bg-orbitra-800 lg:hidden"
        onClick={onOpenSidebar}
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      <button
        type="button"
        onClick={onOpenSearch}
        className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-orbitra-border bg-orbitra-850 px-3 py-2 text-left text-sm text-orbitra-muted hover:border-orbitra-500"
      >
        <Search size={16} />
        <span className="truncate">Search pages and tools</span>
        <kbd className="ml-auto hidden rounded border border-orbitra-border px-1.5 py-0.5 text-[10px] text-orbitra-muted md:inline">
          Ctrl K
        </kbd>
      </button>

      <div ref={menuRef} className="flex items-center gap-1">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0"
            aria-label="Help"
            onClick={() => {
              setHelpOpen((open) => !open)
              setProfileOpen(false)
              setNotificationsOpen(false)
            }}
          >
            <CircleHelp size={18} />
          </Button>
          {helpOpen ? (
            <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-orbitra-border bg-orbitra-850 p-3 text-sm shadow-xl">
              <p className="font-medium text-orbitra-text">Sample help</p>
              <p className="mt-1 text-orbitra-muted">
                This frontend uses mock data. It does not connect to AWS, Kubernetes, or Terraform yet.
              </p>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="relative h-9 w-9 p-0"
            aria-label="Notifications"
            onClick={() => {
              setNotificationsOpen((open) => !open)
              setProfileOpen(false)
              setHelpOpen(false)
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 ? (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-orange" />
            ) : null}
          </Button>
          {notificationsOpen ? (
            <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl border border-orbitra-border bg-orbitra-850 p-2 shadow-xl">
              <p className="px-2 py-1 text-xs font-medium tracking-wide text-orbitra-muted uppercase">
                Sample notifications
              </p>
              <ul>
                {visibleNotifications.map((item) => (
                  <li key={item.id} className="rounded-lg px-2 py-2 hover:bg-orbitra-800">
                    <p className="text-sm text-orbitra-text">{item.title}</p>
                    <p className="text-xs text-orbitra-muted">
                      {item.detail} · {item.time}
                    </p>
                  </li>
                ))}
              </ul>
              {visibleNotifications.length === 0 ? <p className="px-2 py-3 text-sm text-orbitra-muted">All sample notification categories are turned off.</p> : null}
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            className="ml-1 flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-orbitra-800"
            onClick={() => {
              setProfileOpen((open) => !open)
              setNotificationsOpen(false)
              setHelpOpen(false)
            }}
            aria-haspopup="menu"
            aria-expanded={profileOpen}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-purple/20 text-xs font-semibold text-accent-purple">
              {initials}
            </span>
            <span className="hidden text-left md:block">
              <span className="block text-sm text-orbitra-text">{profile.name}</span>
              <span className="block text-xs text-orbitra-muted">{SAMPLE_CURRENT_USER.role}</span>
            </span>
          </button>
          {profileOpen ? (
            <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-orbitra-border bg-orbitra-850 p-1 shadow-xl">
              <p className="px-3 py-2 text-xs text-orbitra-muted">{profile.email}</p>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-orbitra-text hover:bg-orbitra-800"
                onClick={() => {
                  setProfileOpen(false)
                  navigate('/settings')
                }}
              >
                <Settings size={16} />
                Settings
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-orbitra-text hover:bg-orbitra-800"
                onClick={() => {
                  setProfileOpen(false)
                  navigate('/settings')
                }}
              >
                <UserRound size={16} />
                Profile
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-orbitra-800"
                onClick={() => {
                  setProfileOpen(false)
                  navigate('/')
                }}
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Topbar
