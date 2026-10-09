import Badge from './Badge.jsx'

function PlaceholderPage({ title, description, children }) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
        <Badge tone="gray">Placeholder</Badge>
      </div>
      {description ? <p className="mb-6 max-w-2xl text-orbitra-muted">{description}</p> : null}
      {children}
    </div>
  )
}

export default PlaceholderPage
