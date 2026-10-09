import { Activity, AlertTriangle, Box, Boxes, CheckCircle2, Cloud, Database, FileCode2, Globe } from 'lucide-react'
import Badge from '../common/Badge.jsx'
import Card from '../common/Card.jsx'
import {
  SAMPLE_RESOURCE_USAGE,
  SAMPLE_SERVICE_HEALTH,
} from '../../data/infrastructureHealth.js'

const progressColors = {
  cyan: 'bg-accent-cyan',
  purple: 'bg-accent-purple',
  blue: 'bg-accent-blue',
  green: 'bg-accent-green',
}

const serviceIcons = {
  aws: Cloud,
  docker: Box,
  kubernetes: Boxes,
  terraform: FileCode2,
  database: Database,
  api: Globe,
}

function InfrastructureHealth() {
  return (
    <section aria-labelledby="infrastructure-health-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="infrastructure-health-heading" className="text-lg font-semibold text-orbitra-text">
            Infrastructure health
          </h2>
          <p className="mt-1 text-sm text-orbitra-muted">
            Example resource readings and service indicators for the dashboard.
          </p>
        </div>
        <Badge tone="gray">Mock infrastructure data</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card title="Resource utilization" description="Illustrative capacity readings · updated for this demo">
          <div className="space-y-5">
            {SAMPLE_RESOURCE_USAGE.map((resource) => (
              <div key={resource.id}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-orbitra-text">{resource.label}</h3>
                    <p className="mt-0.5 text-xs text-orbitra-muted">{resource.detail}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-orbitra-text">
                    {resource.value}%
                  </span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-orbitra-700"
                  role="progressbar"
                  aria-label={`${resource.label} sample usage`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={resource.value}
                  aria-valuetext={`${resource.value}% sample usage`}
                >
                  <div
                    className={`h-full rounded-full ${progressColors[resource.color]}`}
                    style={{ width: `${resource.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Service status" description="Mock integration states · not connected to live services">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SAMPLE_SERVICE_HEALTH.map((service) => {
              const Icon = serviceIcons[service.id]
              const StatusIcon = service.tone === 'warning' ? AlertTriangle : CheckCircle2

              return (
                <li
                  key={service.id}
                  className="flex min-w-0 items-center gap-3 rounded-xl border border-orbitra-border bg-orbitra-900/60 p-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orbitra-800 text-orbitra-muted">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium text-orbitra-text">{service.name}</h3>
                    <p className="truncate text-xs text-orbitra-muted">{service.detail}</p>
                  </div>
                  <Badge tone={service.tone} className="shrink-0 px-2 py-0.5 text-xs">
                    <StatusIcon size={13} className="mr-1" aria-hidden="true" />
                    {service.status}
                  </Badge>
                </li>
              )
            })}
          </ul>

          <p className="mt-4 flex items-start gap-2 rounded-lg border border-accent-orange/20 bg-accent-orange/5 p-3 text-xs leading-5 text-orbitra-muted">
            <Activity size={15} className="mt-0.5 shrink-0 text-accent-orange" aria-hidden="true" />
            The API attention indicator is sample content. Orbitra has not checked a real API or infrastructure.
          </p>
        </Card>
      </div>
    </section>
  )
}

export default InfrastructureHealth
