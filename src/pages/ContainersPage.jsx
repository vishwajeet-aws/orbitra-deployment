import { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Cpu, MemoryStick, Play, RotateCw, Search, Square, X } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import Modal from '../components/common/Modal.jsx'
import { SAMPLE_CONTAINERS } from '../data/containers.js'

const statusTone = { Running: 'success', Stopped: 'gray', Restarting: 'orange' }
const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })

function ContainersPage() {
  const [containers, setContainers] = useState(SAMPLE_CONTAINERS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [selected, setSelected] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [notice, setNotice] = useState('')
  const timers = useRef(new Set())

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), [])

  const visibleContainers = useMemo(() => containers.filter((container) => (
    `${container.name} ${container.image} ${container.id} ${container.host}`.toLowerCase().includes(search.toLowerCase())
    && (statusFilter === 'All statuses' || container.status === statusFilter)
  )), [containers, search, statusFilter])

  const startContainer = (container) => {
    setContainers((items) => items.map((item) => item.id === container.id ? { ...item, status: 'Running', cpu: 12, memory: 24 } : item))
    setNotice(`${container.name} was marked running in this frontend simulation.`)
  }
  const stopContainer = (container) => {
    setContainers((items) => items.map((item) => item.id === container.id ? { ...item, status: 'Stopped', cpu: 0, memory: 0 } : item))
    setNotice(`${container.name} was marked stopped in this frontend simulation.`)
    setConfirm(null)
  }
  const restartContainer = (container) => {
    setContainers((items) => items.map((item) => item.id === container.id ? { ...item, status: 'Restarting', cpu: 0, memory: 0 } : item))
    setNotice(`${container.name} is restarting in this frontend simulation.`)
    setConfirm(null)
    const timer = window.setTimeout(() => {
      setContainers((items) => items.map((item) => item.id === container.id ? { ...item, status: 'Running', cpu: 18, memory: 31 } : item))
      setNotice(`${container.name} restart simulation completed.`)
      timers.current.delete(timer)
    }, 1300)
    timers.current.add(timer)
  }

  return <div className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-accent-cyan">Runtime</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">Containers</h1><p className="mt-2 text-sm text-orbitra-muted">Inspect sample container workloads and simulate basic controls.</p></div><Badge tone="orange">Demo inventory</Badge></header>
    <div className="grid gap-4 sm:grid-cols-3"><SummaryCard icon={Box} label="Containers" value={containers.length}/><SummaryCard icon={Play} label="Running" value={containers.filter((item) => item.status === 'Running').length}/><SummaryCard icon={RotateCw} label="Needs attention" value={containers.filter((item) => item.status === 'Restarting').length}/></div>
    <Card className="p-4 sm:p-5"><div className="grid gap-3 sm:grid-cols-[1fr_12rem]"><label className="relative"><span className="sr-only">Search containers</span><Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-orbitra-muted"/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, image, host..." className="w-full rounded-lg border border-orbitra-border bg-orbitra-900 py-2.5 pr-3 pl-9 text-sm text-orbitra-text outline-none focus:ring-2 focus:ring-accent-blue/70"/></label><select aria-label="Filter container status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2.5 text-sm text-orbitra-text"><option>All statuses</option><option>Running</option><option>Stopped</option><option>Restarting</option></select></div></Card>
    {notice && <div role="status" className="flex items-start justify-between gap-3 rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-3 text-sm text-accent-cyan"><span>{notice} No Docker daemon was contacted.</span><button aria-label="Dismiss message" onClick={() => setNotice('')} className="rounded p-0.5 hover:bg-accent-cyan/10"><X size={15}/></button></div>}
    <Card title="Container inventory" description={`${visibleContainers.length} of ${containers.length} illustrative records`} className="p-0"><div className="overflow-x-auto"><table className="w-full min-w-[880px] text-left text-sm"><caption className="sr-only">Sample container inventory and local simulation controls</caption><thead><tr className="border-b border-orbitra-border text-xs uppercase tracking-wide text-orbitra-muted">{['Container', 'Status', 'CPU / memory', 'Host', 'Created', 'Actions'].map((label) => <th key={label} scope="col" className="px-4 py-3 font-medium">{label}</th>)}</tr></thead><tbody className="divide-y divide-orbitra-border">{visibleContainers.map((container) => <tr key={container.id} className="hover:bg-orbitra-800/40"><th scope="row" className="px-4 py-4"><button onClick={() => setSelected(container)} className="text-left font-medium text-orbitra-text hover:text-accent-cyan">{container.name}</button><span className="mt-1 block font-mono text-xs font-normal text-orbitra-muted">{container.image}</span></th><td className="px-4 py-4"><Badge tone={statusTone[container.status]}>{container.status}</Badge></td><td className="px-4 py-4"><div className="min-w-32 space-y-1.5 text-xs text-orbitra-muted"><Meter icon={Cpu} label="CPU" value={container.cpu}/><Meter icon={MemoryStick} label="MEM" value={container.memory}/></div></td><td className="px-4 py-4 text-orbitra-muted">{container.host}</td><td className="whitespace-nowrap px-4 py-4 text-xs text-orbitra-muted">{dateFormatter.format(new Date(container.created))}</td><td className="px-4 py-4"><div className="flex items-center gap-1">{container.status === 'Stopped' ? <Button size="sm" variant="secondary" onClick={() => startContainer(container)} aria-label={`Start ${container.name}`}><Play size={14}/>Start</Button> : <><Button size="sm" variant="ghost" onClick={() => setConfirm({ type: 'restart', container })} disabled={container.status === 'Restarting'} aria-label={`Restart ${container.name}`}><RotateCw size={15}/></Button><Button size="sm" variant="ghost" onClick={() => setConfirm({ type: 'stop', container })} aria-label={`Stop ${container.name}`}><Square size={14}/></Button></>}</div></td></tr>)}</tbody></table></div>{visibleContainers.length === 0 && <EmptyState title="No containers match" description="Try a different search term or status." className="m-4"/>}</Card>
    <p className="text-xs text-orbitra-muted">Container names, images, resource usage, and timestamps are sample data. Start, stop, and restart only change this page’s local demo state.</p>

    <Modal open={Boolean(selected)} title={selected ? selected.name : 'Container details'} onClose={() => setSelected(null)}><p className="font-mono text-xs text-orbitra-muted">{selected?.id} · {selected?.image}</p><div className="mt-4 grid grid-cols-2 gap-3"><Detail label="Status" value={selected?.status}/><Detail label="Host" value={selected?.host}/><Detail label="Port mapping" value={selected?.ports}/><Detail label="Created" value={selected ? dateFormatter.format(new Date(selected.created)) : ''}/></div><div className="mt-4 space-y-3"><Meter icon={Cpu} label="CPU usage" value={selected?.cpu || 0}/><Meter icon={MemoryStick} label="Memory usage" value={selected?.memory || 0}/></div><p className="mt-4 text-xs text-orbitra-muted">Details shown are illustrative and do not come from a running container.</p></Modal>
    <Modal open={Boolean(confirm)} title={confirm?.type === 'stop' ? 'Stop this sample container?' : 'Restart this sample container?'} onClose={() => setConfirm(null)}><p className="text-sm leading-6 text-orbitra-muted">{confirm?.container?.name} will be updated in this local demo only. No real container will be stopped or restarted.</p><div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={() => setConfirm(null)}>Go back</Button><Button variant={confirm?.type === 'stop' ? 'danger' : 'primary'} onClick={() => confirm?.type === 'stop' ? stopContainer(confirm.container) : restartContainer(confirm.container)}>{confirm?.type === 'stop' ? 'Confirm stop' : 'Simulate restart'}</Button></div></Modal>
  </div>
}

function SummaryCard({ icon: Icon, label, value }) { return <Card className="p-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-blue/15 text-accent-cyan"><Icon size={17}/></span><div><p className="text-xs text-orbitra-muted">{label}</p><p className="mt-0.5 text-xl font-semibold text-orbitra-text">{value}</p></div></div></Card> }
function Detail({ label, value }) { return <div className="rounded-lg border border-orbitra-border bg-orbitra-900/50 p-3"><p className="text-xs text-orbitra-muted">{label}</p><p className="mt-1 text-sm font-medium text-orbitra-text">{value}</p></div> }
function Meter({ icon: Icon, label, value = 0 }) { return <div className="flex items-center gap-2"><Icon size={13}/><span className="w-8">{label}</span><div className="h-1.5 min-w-12 flex-1 overflow-hidden rounded-full bg-orbitra-700"><div className="h-full rounded-full bg-accent-cyan" style={{ width: `${value}%` }}/></div><span className="w-8 text-right">{value}%</span></div> }
export default ContainersPage
