import Badge from '../common/Badge.jsx'
import { SAMPLE_DASHBOARD_STATS } from '../../data/dashboardStats.js'

const colorClasses = {
  blue: 'bg-accent-blue/15 text-accent-blue',
  purple: 'bg-accent-purple/15 text-accent-purple',
  green: 'bg-accent-green/15 text-accent-green',
  cyan: 'bg-accent-cyan/15 text-accent-cyan',
  orange: 'bg-accent-orange/15 text-accent-orange',
}

function StatisticsGrid() {
  return (
    <section aria-labelledby="dashboard-stats-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="dashboard-stats-heading" className="text-lg font-semibold text-orbitra-text">
            Workspace at a glance
          </h2>
          <p className="mt-1 text-sm text-orbitra-muted">
            A quick summary of your deployment workspace.
          </p>
        </div>
        <Badge tone="gray">Illustrative sample data</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SAMPLE_DASHBOARD_STATS.map((stat) => {
          const Icon = stat.icon

          return (
            <article
              key={stat.id}
              className="rounded-2xl border border-orbitra-border bg-orbitra-850 p-5 transition-colors hover:border-orbitra-600"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-orbitra-muted">{stat.label}</h3>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-orbitra-text">
                    {stat.value}
                  </p>
                </div>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorClasses[stat.color]}`}>
                  <Icon size={19} aria-hidden="true" />
                </span>
              </div>

              <p className="mt-2 text-xs text-orbitra-muted">{stat.detail}</p>

              {typeof stat.progress === 'number' ? (
                <div
                  className="mt-4 h-1.5 overflow-hidden rounded-full bg-orbitra-700"
                  role="progressbar"
                  aria-label={`${stat.label} sample progress`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={stat.progress}
                >
                  <div
                    className="h-full rounded-full bg-accent-blue transition-[width]"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default StatisticsGrid
