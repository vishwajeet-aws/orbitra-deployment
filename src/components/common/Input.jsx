import { cn } from '../../utils/cn.js'

function Input({
  id,
  label,
  type = 'text',
  error = '',
  hint = '',
  className = '',
  ...props
}) {
  const inputId = id || props.name
  const errorId = error && inputId ? `${inputId}-error` : undefined
  const hintId = hint && inputId ? `${inputId}-hint` : undefined

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-orbitra-text">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={cn(hintId, errorId) || undefined}
        className={cn(
          'w-full rounded-lg border bg-orbitra-900 px-3 py-2 text-sm text-orbitra-text outline-none transition-colors',
          'placeholder:text-orbitra-muted',
          'focus-visible:ring-2 focus-visible:ring-accent-blue/70',
          error ? 'border-red-500' : 'border-orbitra-border hover:border-orbitra-500',
          className,
        )}
        {...props}
      />
      {hint && !error ? (
        <p id={hintId} className="mt-1 text-xs text-orbitra-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default Input
