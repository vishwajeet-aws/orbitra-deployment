import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SearchModal from '../components/layout/SearchModal.jsx'
import Sidebar from '../components/layout/Sidebar.jsx'
import Topbar from '../components/layout/Topbar.jsx'
import useCommandK from '../hooks/useCommandK.js'
import { cn } from '../utils/cn.js'

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const openSearch = useCallback(() => setSearchOpen(true), [])
  useCommandK(openSearch)

  return (
    <div className="min-h-screen bg-orbitra-900 text-orbitra-text">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className={cn('flex min-h-screen flex-col transition-[padding] duration-200', collapsed ? 'lg:pl-[76px]' : 'lg:pl-64')}>
        <Topbar onOpenSidebar={() => setMobileOpen(true)} onOpenSearch={openSearch} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}

export default DashboardLayout
