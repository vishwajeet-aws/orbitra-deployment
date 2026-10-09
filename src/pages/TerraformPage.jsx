import { useState } from 'react'
import { Check, Clipboard, Cloud, Database, Globe2, Play, RefreshCw, ShieldAlert, X } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import Modal from '../components/common/Modal.jsx'
import { SAMPLE_INFRASTRUCTURE, SAMPLE_PLAN_OUTPUT, SAMPLE_TERRAFORM } from '../data/infrastructure.js'

const typeIcons = { 'Virtual network': Globe2, 'Kubernetes cluster': Cloud, 'PostgreSQL database': Database, 'Object storage': Cloud }

function TerraformPage() {
  const [planState, setPlanState] = useState('idle')
  const [applyOpen, setApplyOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [copied, setCopied] = useState(false)

  const runPlanDemo = () => {
    setPlanState('planning')
    setNotice('')
    window.setTimeout(() => {
      setPlanState('planned')
      setNotice('Mock plan finished. No Terraform command was run.')
    }, 700)
  }
  const applyDemo = () => {
    setPlanState('applied')
    setApplyOpen(false)
    setNotice('Mock apply marked complete in this session. No infrastructure changed.')
  }
  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(SAMPLE_TERRAFORM)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setNotice('Clipboard access is unavailable here. Select and copy the sample configuration manually.')
    }
  }

  return <div className="space-y-6">
    <header className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm text-accent-cyan">Infrastructure</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">Terraform / Infrastructure</h1><p className="mt-2 text-sm text-orbitra-muted">Review sample cloud resources and explore a safe plan/apply walkthrough.</p></div><Badge tone="orange">Illustrative only</Badge></header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{SAMPLE_INFRASTRUCTURE.map((resource) => { const Icon = typeIcons[resource.type] || Cloud; return <Card key={resource.id} className="p-4"><div className="flex items-start justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-blue/15 text-accent-cyan"><Icon size={17}/></span><Badge tone={resource.status === 'Healthy' ? 'success' : 'warning'}>{resource.status}</Badge></div><h2 className="mt-4 truncate text-sm font-semibold text-orbitra-text" title={resource.name}>{resource.name}</h2><p className="mt-1 text-xs text-orbitra-muted">{resource.type}</p><p className="mt-3 text-xs text-orbitra-muted">{resource.provider} · {resource.region}</p></Card> })}</div>
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <Card title="Example Terraform configuration" description="A read-only sample snippet. Orbitra does not execute Terraform in the browser." className="min-w-0">
        <div className="overflow-hidden rounded-xl border border-orbitra-border bg-[#080d18]"><div className="flex items-center justify-between border-b border-orbitra-border px-4 py-2.5"><div className="flex items-center gap-2 text-xs text-orbitra-muted"><span className="h-2.5 w-2.5 rounded-full bg-red-400/80"/><span className="h-2.5 w-2.5 rounded-full bg-accent-orange"/><span className="h-2.5 w-2.5 rounded-full bg-accent-green"/><span className="ml-2 font-mono">main.tf · example</span></div><Button variant="ghost" size="sm" onClick={copyConfig} aria-label="Copy sample Terraform configuration">{copied ? <Check size={14}/> : <Clipboard size={14}/>} {copied ? 'Copied' : 'Copy'}</Button></div><pre className="max-h-[440px] overflow-auto p-4 text-xs leading-6 text-slate-300"><code>{SAMPLE_TERRAFORM}</code></pre></div>
        <p className="mt-3 text-xs text-orbitra-muted">Configuration is demonstration text, not tied to credentials, state files, or AWS resources.</p>
      </Card>
      <div className="space-y-5">
        <Card title="Plan and apply demo" description="See how a Terraform review flow can look before a future backend is connected.">
          <div className="rounded-xl border border-accent-orange/20 bg-accent-orange/5 p-4"><div className="flex items-start gap-3"><ShieldAlert size={18} className="mt-0.5 shrink-0 text-accent-orange"/><p className="text-xs leading-5 text-orbitra-muted">Frontend-only demonstration. The buttons below simulate interface states; Terraform is never installed or invoked here.</p></div></div>
          <div className="mt-4 flex flex-wrap gap-2"><Button onClick={runPlanDemo} disabled={planState === 'planning'}>{planState === 'planning' ? <RefreshCw size={15} className="animate-spin"/> : <Play size={15}/>} {planState === 'planning' ? 'Preparing mock plan…' : 'Run mock plan'}</Button><Button variant="secondary" disabled={planState !== 'planned'} onClick={() => setApplyOpen(true)}>Review mock apply</Button></div>
          {notice && <p role="status" className="mt-4 rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 p-3 text-xs text-accent-cyan">{notice}</p>}
          {planState === 'planned' || planState === 'applied' ? <div className="mt-5"><div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-medium text-orbitra-text">Mock plan output</h3><Badge tone={planState === 'applied' ? 'success' : 'cyan'}>{planState === 'applied' ? 'Demo applied' : 'Plan ready'}</Badge></div><div className="space-y-2">{SAMPLE_PLAN_OUTPUT.map((item) => <PlanRow key={item.address} item={item}/>)}</div><p className="mt-3 text-xs text-orbitra-muted">Plan: 1 to add, 1 to change, 1 to destroy · sample output only</p></div> : null}
        </Card>
        <Card title="Infrastructure guardrails" description="Checks shown here are sample interface indicators."><ul className="space-y-3 text-sm">{[['State file access', 'Not connected', 'gray'], ['AWS credentials', 'Not configured', 'gray'], ['Policy review', 'Example only', 'orange']].map(([label, value, tone]) => <li key={label} className="flex items-center justify-between gap-3"><span className="text-orbitra-muted">{label}</span><Badge tone={tone}>{value}</Badge></li>)}</ul></Card>
      </div>
    </div>
    <p className="text-xs text-orbitra-muted">Infrastructure names and statuses are invented sample data. No cloud APIs, Terraform state, or infrastructure resources are accessed.</p>
    <Modal open={applyOpen} title="Confirm mock apply?" onClose={() => setApplyOpen(false)}><p className="text-sm leading-6 text-orbitra-muted">The example plan includes adding, changing, and destroying resources. Continuing only changes the demo badge to “Demo applied”; it does not execute Terraform or alter cloud infrastructure.</p><div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={() => setApplyOpen(false)}>Go back</Button><Button variant="danger" onClick={applyDemo}><X size={15}/> Simulate apply</Button></div></Modal>
  </div>
}

function PlanRow({ item }) { const color = { add: 'text-accent-green', change: 'text-accent-orange', destroy: 'text-red-400' }[item.action]; const sign = { add: '+', change: '~', destroy: '-' }[item.action]; return <div className="rounded-lg border border-orbitra-border bg-orbitra-900/50 p-3"><p className="font-mono text-xs"><span className={`mr-2 font-bold ${color}`}>{sign}</span><span className="text-orbitra-text">{item.address}</span></p><p className="mt-1 pl-5 text-xs text-orbitra-muted">{item.description}</p></div> }
export default TerraformPage
