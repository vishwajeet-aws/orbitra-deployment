import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock3, Search } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Card from '../components/common/Card.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useDeployments } from '../contexts/DeploymentsContext.jsx'

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })
const statusStyles = {
  succeeded: ['Succeeded', 'success'],
  failed: ['Failed', 'danger'],
  'in-progress': ['In progress', 'cyan'],
  cancelled: ['Cancelled', 'gray'],
}

function DeploymentsPage() {
  const { deployments } = useDeployments()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [environment, setEnvironment] = useState('All environments')
  const rows = useMemo(() => deployments.filter((deployment) => (
    `${deployment.application} ${deployment.version} ${deployment.commit}`.toLowerCase().includes(query.toLowerCase())
    && (status === 'All statuses' || deployment.status === status)
    && (environment === 'All environments' || deployment.environment === environment)
  )), [deployments, query, status, environment])
  return <div className="space-y-6">
    <header><p className="text-sm text-accent-cyan">Release activity</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">Deployments</h1><p className="mt-2 text-sm text-orbitra-muted">Review example release runs across your sample environments.</p></header>
    <Card className="p-4 sm:p-5"><div className="grid gap-3 sm:grid-cols-3"><label className="relative"><span className="sr-only">Search deployments</span><Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-orbitra-muted"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search application, version, commit" className="w-full rounded-lg border border-orbitra-border bg-orbitra-900 py-2.5 pr-3 pl-9 text-sm text-orbitra-text outline-none focus:ring-2 focus:ring-accent-blue/70"/></label><select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2.5 text-sm text-orbitra-text"><option>All statuses</option><option value="succeeded">Succeeded</option><option value="failed">Failed</option><option value="in-progress">In progress</option><option value="cancelled">Cancelled</option></select><select aria-label="Filter by environment" value={environment} onChange={(event) => setEnvironment(event.target.value)} className="rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2.5 text-sm text-orbitra-text"><option>All environments</option><option>Production</option><option>Staging</option><option>Development</option></select></div></Card>
    <div className="flex items-center justify-between text-sm text-orbitra-muted"><span>{rows.length} sample runs</span><Badge tone="orange">Simulated only</Badge></div>
    {rows.length ? <Card className="overflow-hidden p-0"><div className="overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left text-sm"><caption className="sr-only">Sample deployment history</caption><thead><tr className="border-b border-orbitra-border text-xs uppercase tracking-wide text-orbitra-muted">{['Application', 'Environment', 'Version', 'Status', 'Started', ''].map((label) => <th key={label || 'details'} scope="col" className="px-4 py-3 font-medium">{label}</th>)}</tr></thead><tbody className="divide-y divide-orbitra-border">{rows.map((item) => <tr key={item.id} className="transition-colors hover:bg-orbitra-800/50"><th scope="row" className="px-4 py-4 font-medium text-orbitra-text">{item.application}<div className="mt-1 text-xs font-normal text-orbitra-muted">{item.id}</div></th><td className="px-4 py-4 text-orbitra-muted">{item.environment}</td><td className="px-4 py-4 font-mono text-xs text-orbitra-muted">{item.version} · {item.commit}</td><td className="px-4 py-4"><Badge tone={statusStyles[item.status]?.[1] || 'gray'}>{statusStyles[item.status]?.[0] || item.status}</Badge>{item.status === 'in-progress' && <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-orbitra-700"><div className="h-full rounded-full bg-accent-cyan transition-all" style={{ width: `${item.progress}%` }} /></div>}</td><td className="whitespace-nowrap px-4 py-4 text-xs text-orbitra-muted"><span className="flex items-center gap-1.5"><Clock3 size={13}/>{dateFormatter.format(new Date(item.timestamp))}</span></td><td className="px-4 py-4"><Link to={`/deployments/${item.id}`} className="inline-flex items-center gap-1 rounded px-2 py-1 text-accent-cyan hover:bg-orbitra-700">Details <ArrowUpRight size={14}/></Link></td></tr>)}</tbody></table></div></Card> : <EmptyState title="No deployments match" description="Change your search or filters to see sample release records." />}
    <p className="text-xs text-orbitra-muted">These are illustrative records. Retrying a run only animates local demo state and does not deploy an application.</p>
  </div>
}
export default DeploymentsPage
