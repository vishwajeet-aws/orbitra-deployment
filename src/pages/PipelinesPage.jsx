import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, Circle, CircleX, GitBranch, LoaderCircle, Play, Plus, Workflow } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import Input from '../components/common/Input.jsx'
import Modal from '../components/common/Modal.jsx'
import { SAMPLE_PIPELINES } from '../data/pipelines.js'

const initialForm = { name: '', repository: '', branch: 'main' }
const statusTone = { Succeeded: 'success', Running: 'cyan', Failed: 'danger', Queued: 'gray', Ready: 'blue', Skipped: 'gray' }

function PipelinesPage() {
  const [pipelines, setPipelines] = useState(SAMPLE_PIPELINES)
  const [selectedId, setSelectedId] = useState(SAMPLE_PIPELINES[0].id)
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [runOpen, setRunOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const timers = useRef(new Set())

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), [])

  const filtered = useMemo(() => pipelines.filter((pipeline) => `${pipeline.name} ${pipeline.repository} ${pipeline.branch}`.toLowerCase().includes(search.toLowerCase())), [pipelines, search])
  const selected = filtered.find((pipeline) => pipeline.id === selectedId) || filtered[0]

  const createPipeline = (event) => {
    event.preventDefault()
    if (form.name.trim().length < 3 || !form.repository.trim()) {
      setError('Enter a pipeline name (at least 3 characters) and a repository.')
      return
    }
    const pipeline = {
      id: `pipe-${Date.now().toString(36)}`,
      name: form.name.trim(),
      repository: form.repository.trim(),
      branch: form.branch.trim() || 'main',
      status: 'Ready',
      updatedAt: new Date().toISOString(),
      stages: ['Checkout', 'Install', 'Test', 'Build', 'Deploy'].map((name) => ({ name, status: 'Queued', duration: '—' })),
      runs: [],
    }
    setPipelines((items) => [pipeline, ...items])
    setSelectedId(pipeline.id)
    setCreateOpen(false)
    setForm(initialForm)
    setError('')
    setNotice('Pipeline added to the local demo list. No repository was connected.')
  }

  const simulateRun = () => {
    const runId = `#${Math.floor(1000 + Math.random() * 9000)}`
    const runningRun = { id: runId, status: 'Running', commit: 'sample-sha', actor: 'You', when: 'Just now', duration: 'In progress' }
    setPipelines((items) => items.map((item) => item.id === selected.id ? {
      ...item,
      status: 'Running',
      updatedAt: new Date().toISOString(),
      stages: item.stages.map((stage, index) => ({ ...stage, status: index === 0 ? 'Running' : 'Queued', duration: '—' })),
      runs: [runningRun, ...item.runs],
    } : item))
    setRunOpen(false)
    setNotice(`${selected.name} is running as a frontend simulation.`)
    const targetId = selected.id
    const timer = window.setTimeout(() => {
      setPipelines((items) => items.map((item) => item.id === targetId ? {
        ...item,
        status: 'Succeeded',
        stages: item.stages.map((stage, index) => ({ ...stage, status: 'Succeeded', duration: ['7s', '19s', '32s', '26s', '14s'][index] || '18s' })),
        runs: item.runs.map((run, index) => index === 0 && run.id === runId ? { ...run, status: 'Succeeded', duration: '1m 38s' } : run),
      } : item))
      setNotice(`${selected.name} simulation finished successfully. No build or deployment ran.`)
      timers.current.delete(timer)
    }, 1800)
    timers.current.add(timer)
  }

  return <div className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-accent-cyan">Automation</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">CI/CD Pipelines</h1><p className="mt-2 text-sm text-orbitra-muted">Review workflow examples and simulate a sample pipeline run.</p></div><Button onClick={() => { setForm(initialForm); setError(''); setCreateOpen(true) }}><Plus size={16}/> Create pipeline</Button></header>
    <div className="grid gap-4 sm:grid-cols-3"><Summary label="Pipelines" value={pipelines.length}/><Summary label="Succeeded runs" value={pipelines.reduce((count, pipeline) => count + pipeline.runs.filter((run) => run.status === 'Succeeded').length, 0)}/><Summary label="Needs attention" value={pipelines.filter((pipeline) => pipeline.status === 'Failed').length}/></div>
    {notice && <div role="status" className="rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-3 text-sm text-accent-cyan">{notice}</div>}
    <div className="grid gap-5 xl:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.7fr)]">
      <Card title="Pipeline list" description="Sample workflows in your workspace." className="h-fit"><label className="mb-4 block"><span className="sr-only">Search pipelines</span><Input name="pipeline-search" placeholder="Search name, repo, branch..." value={search} onChange={(event) => setSearch(event.target.value)}/></label>{filtered.length ? <div className="space-y-2">{filtered.map((pipeline) => <button key={pipeline.id} onClick={() => setSelectedId(pipeline.id)} className={`w-full rounded-xl border p-3 text-left transition-colors ${selected?.id === pipeline.id ? 'border-accent-blue/50 bg-accent-blue/10' : 'border-orbitra-border bg-orbitra-900/40 hover:border-orbitra-600'}`}><div className="flex items-start justify-between gap-2"><span className="truncate text-sm font-medium text-orbitra-text">{pipeline.name}</span><Badge tone={statusTone[pipeline.status] || 'gray'} className="px-2 py-0.5 text-xs">{pipeline.status}</Badge></div><span className="mt-2 flex items-center gap-1.5 truncate text-xs text-orbitra-muted"><GitBranch size={13}/>{pipeline.repository} · {pipeline.branch}</span><span className="mt-2 block text-[11px] text-orbitra-muted">Updated {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(pipeline.updatedAt))}</span></button>)}</div> : <EmptyState title="No pipelines found" description="Change your search or create a sample pipeline."/>}</Card>

      {selected ? <div className="space-y-5"><Card title={selected.name} description={`${selected.repository} · ${selected.branch}`}><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Workflow size={17} className="text-accent-cyan"/><span className="text-sm text-orbitra-muted">Workflow visualization</span><Badge tone={statusTone[selected.status] || 'gray'}>{selected.status}</Badge></div><Button onClick={() => setRunOpen(true)} disabled={selected.status === 'Running'}><Play size={15}/> Simulate run</Button></div><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{selected.stages.map((stage, index) => <StageCard key={`${stage.name}-${index}`} stage={stage} isLast={index === selected.stages.length - 1}/>)}</div><p className="mt-4 text-xs text-orbitra-muted">Stage names and results are illustrative. No CI runner has been started.</p></Card>
        <Card title="Recent runs" description="Example run history for the selected pipeline.">{selected.runs.length ? <div className="overflow-x-auto"><table className="w-full min-w-[540px] text-left text-sm"><caption className="sr-only">Sample recent pipeline runs</caption><thead><tr className="border-b border-orbitra-border text-xs uppercase tracking-wide text-orbitra-muted">{['Run', 'Status', 'Commit', 'Started by', 'Duration'].map((heading) => <th key={heading} scope="col" className="px-3 py-3 font-medium">{heading}</th>)}</tr></thead><tbody className="divide-y divide-orbitra-border">{selected.runs.map((run) => <tr key={`${selected.id}-${run.id}`}><th scope="row" className="px-3 py-3 font-medium text-orbitra-text">{run.id}<span className="mt-1 block text-xs font-normal text-orbitra-muted">{run.when}</span></th><td className="px-3 py-3"><Badge tone={statusTone[run.status] || 'gray'}>{run.status}</Badge></td><td className="px-3 py-3 font-mono text-xs text-orbitra-muted">{run.commit}</td><td className="px-3 py-3 text-orbitra-muted">{run.actor}</td><td className="px-3 py-3 text-orbitra-muted">{run.duration}</td></tr>)}</tbody></table></div> : <EmptyState title="No runs yet" description="Use Simulate run to show how a pipeline run appears."/>}</Card></div> : <EmptyState title="Select a pipeline" description="Choose a sample workflow from the list to see stages and runs."/>}
    </div>
    <p className="text-xs text-orbitra-muted">Pipeline definitions and run activity are local sample state. Creating or running a workflow does not connect a Git provider, build an image, or deploy software.</p>

    <Modal open={createOpen} title="Create a pipeline" onClose={() => setCreateOpen(false)}><form onSubmit={createPipeline} className="space-y-4"><Input label="Pipeline name" name="pipeline-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Web app CI" required autoFocus/><Input label="Repository" name="pipeline-repository" value={form.repository} onChange={(event) => setForm({ ...form, repository: event.target.value })} placeholder="organization/repository" required/><Input label="Branch" name="pipeline-branch" value={form.branch} onChange={(event) => setForm({ ...form, branch: event.target.value })} placeholder="main"/>{error && <p role="alert" className="text-sm text-red-400">{error}</p>}<p className="text-xs text-orbitra-muted">This creates a local example only; no repository is linked.</p><div className="flex justify-end gap-2"><Button variant="secondary" onClick={() => setCreateOpen(false)}>Cancel</Button><Button type="submit">Create pipeline</Button></div></form></Modal>
    <Modal open={runOpen} title="Simulate a pipeline run?" onClose={() => setRunOpen(false)}><p className="text-sm leading-6 text-orbitra-muted">This will animate sample workflow stages for <strong className="text-orbitra-text">{selected?.name}</strong>. No code will build and nothing will be deployed.</p><div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={() => setRunOpen(false)}>Go back</Button><Button onClick={simulateRun}><Play size={15}/> Start simulation</Button></div></Modal>
  </div>
}

function Summary({ label, value }) { return <Card className="p-4"><p className="text-xs text-orbitra-muted">{label}</p><p className="mt-1 text-2xl font-semibold text-orbitra-text">{value}</p></Card> }
function StageCard({ stage, isLast }) { const Icon = stage.status === 'Succeeded' ? CheckCircle2 : stage.status === 'Failed' ? CircleX : stage.status === 'Running' ? LoaderCircle : stage.status === 'Skipped' ? CircleX : Circle; const tone = stage.status === 'Succeeded' ? 'text-accent-green' : stage.status === 'Failed' ? 'text-red-400' : stage.status === 'Running' ? 'animate-spin text-accent-cyan' : 'text-orbitra-muted'; return <div className="relative rounded-xl border border-orbitra-border bg-orbitra-900/50 p-3"><div className="flex items-center gap-2"><Icon size={16} className={tone}/><span className="truncate text-xs font-medium text-orbitra-text">{stage.name}</span></div><p className="mt-2 text-[11px] text-orbitra-muted">{stage.status} · {stage.duration}</p>{!isLast && <span className="absolute top-1/2 -right-3 z-10 hidden h-px w-3 bg-orbitra-600 lg:block"/>}</div> }
export default PipelinesPage
