import { cn } from '../../utils/cn.js'

function EmptyState({ title, description, action, className = '' }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-dashed border-orbitra-border bg-orbitra-900/60 px-6 py-10 text-center',
        className,
      )}
    >
      <h3 className="text-base font-semibold text-orbitra-text">{title}</h3>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-orbitra-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  )
}

export default EmptyState
