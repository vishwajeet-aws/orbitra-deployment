import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, GitBranch, Layers3 } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Card from '../components/common/Card.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useProjects } from '../contexts/ProjectsContext.jsx'
import { useDeployments } from '../contexts/DeploymentsContext.jsx'

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })
const statusStyles = { succeeded: ['Succeeded', 'success'], failed: ['Failed', 'danger'], 'in-progress': ['In progress', 'cyan'], cancelled: ['Cancelled', 'gray'] }

function ProjectDetailsPage() {
  const { projectId } = useParams()
  const { projects } = useProjects()
  const { deployments } = useDeployments()
  const project = projects.find((item) => item.id === projectId)
  if (!project) return <div className="space-y-5"><Link to="/projects" className="inline-flex items-center gap-2 text-sm text-accent-cyan"><ArrowLeft size={15}/> Back to projects</Link><EmptyState title="Project not found" description="It may have been removed from this demo session." /></div>
  const projectDeployments = deployments.filter((item) => item.projectId === project.id)

  return <div className="space-y-6">
    <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-orbitra-muted hover:text-accent-cyan"><ArrowLeft size={15}/> All projects</Link>
    <header className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm text-accent-cyan">Project overview</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">{project.name}</h1><p className="mt-2 max-w-2xl text-sm text-orbitra-muted">{project.description}</p></div><Badge tone={project.statusTone}>{project.status}</Badge></header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><InfoCard icon={Layers3} label="Framework" value={project.framework}/><InfoCard icon={GitBranch} label="Visibility" value={project.visibility}/><InfoCard icon={ExternalLink} label="Repository" value={project.repository}/><InfoCard icon={Layers3} label="Last updated" value={dateFormatter.format(new Date(project.updatedAt))}/></div>
    <Card title="Deployment history" description="Sample runs associated with this project.">
      {projectDeployments.length ? <div className="space-y-3">{projectDeployments.map((item) => <Link key={item.id} to={`/deployments/${item.id}`} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orbitra-border bg-orbitra-900/50 p-4 transition-colors hover:border-orbitra-600"><div><p className="font-medium text-orbitra-text">{item.id} <span className="ml-2 text-xs font-normal text-orbitra-muted">{item.version}</span></p><p className="mt-1 text-xs text-orbitra-muted">{item.environment} · {dateFormatter.format(new Date(item.timestamp))}</p></div><Badge tone={statusStyles[item.status]?.[1] || 'gray'}>{statusStyles[item.status]?.[0] || item.status}</Badge></Link>)}</div> : <EmptyState title="No sample deployments" description="There are no illustrative deployment records for this project." action={<Link to="/deployments" className="inline-flex items-center gap-2 rounded-lg bg-accent-blue px-4 py-2 text-sm font-medium text-white">Browse deployments</Link>} />}
    </Card>
    <p className="text-xs text-orbitra-muted">Project metadata and release history are frontend sample data only.</p>
  </div>
}

function InfoCard({ icon: Icon, label, value }) { return <Card className="p-4"><div className="flex items-center gap-2 text-xs text-orbitra-muted"><Icon size={14}/>{label}</div><p className="mt-3 break-words text-sm font-medium text-orbitra-text">{value}</p></Card> }
export default ProjectDetailsPage
