import {
  ArrowUpRight,
  Boxes,
  ClipboardList,
  FolderKanban,
  Rocket,
  ScrollText,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../common/Card.jsx'

const actions = [
  {
    title: 'New Project',
    description: 'Start a project workspace',
    to: '/projects',
    icon: FolderKanban,
    color: 'text-accent-blue bg-accent-blue/15',
  },
  {
    title: 'Deploy Application',
    description: 'Open deployment workflows',
    to: '/deployments',
    icon: Rocket,
    color: 'text-accent-purple bg-accent-purple/15',
  },
  {
    title: 'Create Pipeline',
    description: 'Set up a CI/CD workflow',
    to: '/pipelines',
    icon: Workflow,
    color: 'text-accent-cyan bg-accent-cyan/15',
  },
  {
    title: 'Manage Kubernetes',
    description: 'View the sample cluster page',
    to: '/kubernetes',
    icon: Boxes,
    color: 'text-accent-green bg-accent-green/15',
  },
  {
    title: 'Provision Infrastructure',
    description: 'Review infrastructure examples',
    to: '/infrastructure',
    icon: ClipboardList,
    color: 'text-accent-orange bg-accent-orange/15',
  },
  {
    title: 'View Logs',
    description: 'Open the searchable log viewer',
    to: '/logs',
    icon: ScrollText,
    color: 'text-accent-cyan bg-accent-cyan/15',
  },
]

function QuickActions() {
  return (
    <Card title="Quick actions" description="Shortcuts to common workspace pages.">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group flex items-center gap-3 rounded-xl border border-orbitra-border bg-orbitra-900/50 p-3 transition-colors hover:border-orbitra-500 hover:bg-orbitra-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${action.color}`}>
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-orbitra-text">{action.title}</span>
                <span className="mt-0.5 block truncate text-xs text-orbitra-muted">{action.description}</span>
              </span>
              <ArrowUpRight
                size={15}
                className="shrink-0 text-orbitra-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          )
        })}
      </div>
    </Card>
  )
}

export default QuickActions
