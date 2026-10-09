import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Circle, RotateCcw, XCircle } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import Modal from '../components/common/Modal.jsx'
import { useDeployments } from '../contexts/DeploymentsContext.jsx'

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })
const statusStyles = { succeeded: ['Succeeded', 'success'], failed: ['Failed', 'danger'], 'in-progress': ['In progress', 'cyan'], cancelled: ['Cancelled', 'gray'] }

function DeploymentDetailsPage() {
  const { deploymentId } = useParams()
  const { deployments, retryDeployment, cancelDeployment } = useDeployments()
  const deployment = deployments.find((item) => item.id === deploymentId)
  const [confirmAction, setConfirmAction] = useState('')
  if (!deployment) return <div className="space-y-5"><Link to="/deployments" className="inline-flex items-center gap-2 text-sm text-accent-cyan"><ArrowLeft size={15}/> Back to deployments</Link><EmptyState title="Deployment not found" description="This sample record does not exist in the current demo session." /></div>

  const executeAction = () => {
    if (confirmAction === 'retry') retryDeployment(deployment.id)
    if (confirmAction === 'cancel') cancelDeployment(deployment.id)
    setConfirmAction('')
  }
  return <div className="space-y-6">
    <Link to="/deployments" className="inline-flex items-center gap-2 text-sm text-orbitra-muted hover:text-accent-cyan"><ArrowLeft size={15}/> Deployment history</Link>
    <header className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm text-accent-cyan">Deployment details</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">{deployment.application}</h1><p className="mt-2 font-mono text-xs text-orbitra-muted">{deployment.id} · {deployment.version} · {deployment.commit}</p></div><Badge tone={statusStyles[deployment.status]?.[1] || 'gray'}>{statusStyles[deployment.status]?.[0] || deployment.status}</Badge></header>
    <Card title="Run summary" description={deployment.message}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Meta label="Environment" value={deployment.environment}/><Meta label="Started" value={dateFormatter.format(new Date(deployment.timestamp))}/><Meta label="Initiated by" value={deployment.initiatedBy}/><Meta label="Run type" value="Frontend simulation"/></div>
      {deployment.status === 'in-progress' && <div className="mt-6"><div className="mb-2 flex justify-between text-sm"><span className="text-orbitra-muted">Simulated progress</span><span className="text-orbitra-text">{deployment.progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-orbitra-700"><div className="h-full rounded-full bg-accent-cyan transition-all duration-500" style={{ width: `${deployment.progress}%` }}/></div><div className="mt-4 flex justify-end"><Button variant="danger" onClick={() => setConfirmAction('cancel')}>Cancel run</Button></div></div>}
      {deployment.status !== 'in-progress' && <div className="mt-6 flex justify-end"><Button variant="secondary" onClick={() => setConfirmAction('retry')}><RotateCcw size={15}/> Retry simulation</Button></div>}
    </Card>
    <Card title="Activity timeline" description="Illustrative steps from this local sample run."><ol className="space-y-0">{deployment.events.map((event, index) => { const isFinal = index === deployment.events.length - 1; const Icon = isFinal && deployment.status === 'failed' ? XCircle : isFinal && deployment.status === 'succeeded' ? CheckCircle2 : Circle; return <li key={`${event}-${index}`} className="relative flex gap-3 pb-5 last:pb-0"><span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orbitra-800 text-accent-cyan"><Icon size={15}/></span>{index < deployment.events.length - 1 && <span className="absolute top-7 left-3.5 h-full w-px bg-orbitra-border"/>}<span className="pt-1 text-sm text-orbitra-text">{event}</span></li> })}</ol></Card>
    <p className="rounded-lg border border-accent-orange/20 bg-accent-orange/5 p-3 text-xs leading-5 text-orbitra-muted">Demo only: this screen does not connect to a CI/CD system and no application has been deployed. Retry and cancel update temporary UI state only.</p>
    <Modal open={Boolean(confirmAction)} title={confirmAction === 'retry' ? 'Retry this sample run?' : 'Cancel this sample run?'} onClose={() => setConfirmAction('')}>
      <p className="text-sm leading-6 text-orbitra-muted">{confirmAction === 'retry' ? 'A short progress animation will run locally and finish with a simulated result.' : 'The in-progress sample will be marked cancelled in this session.'} No infrastructure action will be performed.</p>
      <div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={() => setConfirmAction('')}>Go back</Button><Button variant={confirmAction === 'cancel' ? 'danger' : 'primary'} onClick={executeAction}>{confirmAction === 'retry' ? 'Run simulation' : 'Confirm cancel'}</Button></div>
    </Modal>
  </div>
}

function Meta({ label, value }) { return <div className="rounded-xl border border-orbitra-border bg-orbitra-900/50 p-4"><p className="text-xs text-orbitra-muted">{label}</p><p className="mt-2 break-words text-sm font-medium text-orbitra-text">{value}</p></div> }
export default DeploymentDetailsPage
