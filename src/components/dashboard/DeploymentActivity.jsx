import { CircleCheck, Clock3, ExternalLink, X, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../common/Badge.jsx'
import Card from '../common/Card.jsx'
import { SAMPLE_RECENT_DEPLOYMENTS } from '../../data/recentDeployments.js'

const statusDetails = {
  succeeded: {
    label: 'Succeeded',
    tone: 'success',
    Icon: CircleCheck,
    iconClass: 'text-accent-green',
  },
  failed: {
    label: 'Failed',
    tone: 'danger',
    Icon: X,
    iconClass: 'text-red-400',
  },
  'in-progress': {
    label: 'In progress',
    tone: 'cyan',
    Icon: Loader2,
    iconClass: 'animate-spin text-accent-cyan',
  },
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function DeploymentActivity() {
  return (
    <Card
      title="Deployment activity"
      description="Recent sample deployment records across your environments."
      className="p-5 sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Badge tone="gray">Illustrative records</Badge>
        <Link
          to="/deployments"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-accent-cyan hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-cyan"
        >
          View all
          <ExternalLink size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm">
          <caption className="sr-only">Illustrative recent deployment records</caption>
          <thead>
            <tr className="border-b border-orbitra-border text-xs font-medium tracking-wide text-orbitra-muted uppercase">
              <th scope="col" className="px-3 py-3">Application</th>
              <th scope="col" className="px-3 py-3">Environment</th>
              <th scope="col" className="px-3 py-3">Status</th>
              <th scope="col" className="px-3 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orbitra-border">
            {SAMPLE_RECENT_DEPLOYMENTS.map((deployment) => {
              const status = statusDetails[deployment.status]
              const StatusIcon = status.Icon

              return (
                <tr key={deployment.id} className="transition-colors hover:bg-orbitra-800/50">
                  <th scope="row" className="whitespace-nowrap px-3 py-4 font-medium text-orbitra-text">
                    {deployment.application}
                  </th>
                  <td className="whitespace-nowrap px-3 py-4 text-orbitra-muted">
                    {deployment.environment}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    <span className="inline-flex items-center gap-2">
                      <StatusIcon size={16} className={status.iconClass} aria-hidden="true" />
                      <Badge tone={status.tone}>{status.label}</Badge>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-orbitra-muted">
                    <time dateTime={deployment.timestamp}>
                      <span className="inline-flex items-center gap-2">
                        <Clock3 size={14} aria-hidden="true" />
                        {dateFormatter.format(new Date(deployment.timestamp))}
                      </span>
                    </time>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default DeploymentActivity
