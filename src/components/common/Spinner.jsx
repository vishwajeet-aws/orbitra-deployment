import { cn } from '../../utils/cn.js'

function Spinner({ label = 'Loading', className = '' }) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-orbitra-muted', className)} role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-orbitra-600 border-t-accent-cyan" />
      <span>{label}</span>
    </div>
  )
}

export default Spinner
