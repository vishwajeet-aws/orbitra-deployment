const toneClasses = {
  blue: 'bg-accent-blue/15 text-accent-blue',
  purple: 'bg-accent-purple/15 text-accent-purple',
  cyan: 'bg-accent-cyan/15 text-accent-cyan',
  green: 'bg-accent-green/15 text-accent-green',
  orange: 'bg-accent-orange/15 text-accent-orange',
  gray: 'bg-orbitra-700 text-orbitra-muted',
  success: 'bg-accent-green/15 text-accent-green',
  warning: 'bg-accent-orange/15 text-accent-orange',
  danger: 'bg-red-500/15 text-red-400',
}

function Badge({ children, tone = 'blue', className = '' }) {
  const classes = [
    'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
    toneClasses[tone] || toneClasses.blue,
    className,
  ].join(' ')

  return <span className={classes}>{children}</span>
}

export default Badge
