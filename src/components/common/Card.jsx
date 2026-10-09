function Card({ title, description, children, className = '' }) {
  return (
    <section
      className={[
        'rounded-2xl border border-orbitra-border bg-orbitra-850 p-6 shadow-xl',
        className,
      ].join(' ')}
    >
      {title ? (
        <header className="mb-4">
          <h2 className="text-lg font-semibold text-orbitra-text">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-orbitra-muted">{description}</p>
          ) : null}
        </header>
      ) : null}
      {children}
    </section>
  )
}

export default Card
