const variantClasses = {
  primary:
    'bg-accent-blue text-white hover:bg-blue-500 focus-visible:outline-accent-blue',
  secondary:
    'border border-orbitra-border bg-orbitra-800 text-orbitra-text hover:bg-orbitra-700 focus-visible:outline-accent-cyan',
  ghost:
    'bg-transparent text-orbitra-muted hover:bg-orbitra-800 hover:text-orbitra-text focus-visible:outline-accent-purple',
  danger:
    'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-500',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    className,
  ].join(' ')

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
