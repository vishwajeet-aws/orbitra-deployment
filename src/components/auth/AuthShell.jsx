import { Activity, Boxes, Check, Orbit, Workflow } from 'lucide-react'

const highlights = [
  'Plan deployments with a clear view of each environment',
  'Review sample infrastructure health and cost signals',
  'Keep project and pipeline workflows in one workspace',
]

function AuthShell({ eyebrow, title, description, children, footer }) {
  return (
    <div className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <section className="max-w-lg">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1.5 text-xs font-medium text-accent-cyan">
          <Orbit size={14} aria-hidden="true" />
          {eyebrow}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-orbitra-text sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-6 text-orbitra-muted sm:text-base">{description}</p>

        <div className="mt-8 rounded-2xl border border-orbitra-border bg-orbitra-850 p-5">
          <p className="text-sm font-medium text-orbitra-text">A workspace for your cloud workflows</p>
          <ul className="mt-4 space-y-3">
            {highlights.map((highlight, index) => {
              const Icon = [Activity, Workflow, Boxes][index]
              return (
                <li key={highlight} className="flex items-start gap-3 text-sm text-orbitra-muted">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-blue/10 text-accent-cyan">
                    <Icon size={14} aria-hidden="true" />
                  </span>
                  {highlight}
                </li>
              )
            })}
          </ul>
          <p className="mt-5 flex items-center gap-2 border-t border-orbitra-border pt-4 text-xs leading-5 text-orbitra-muted">
            <Check size={14} className="shrink-0 text-accent-green" aria-hidden="true" />
            Demo only: no real account is created and no password is sent to a server.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-orbitra-border bg-orbitra-850 p-5 shadow-2xl shadow-black/20 sm:p-8">
        {children}
        {footer ? <div className="mt-6 border-t border-orbitra-border pt-5">{footer}</div> : null}
      </section>
    </div>
  )
}

export default AuthShell
