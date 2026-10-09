import { useMemo, useState } from 'react'
import { Clipboard, Download, Search, Terminal } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { SAMPLE_LOGS } from '../data/logs.js'

const severityTone = { INFO: 'blue', DEBUG: 'gray', WARN: 'warning', ERROR: 'danger', FATAL: 'danger' }
const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'short', timeStyle: 'medium' })
const services = [...new Set(SAMPLE_LOGS.map((entry) => entry.service))]

function LogsPage() {
  const [query, setQuery] = useState('')
  const [severity, setSeverity] = useState('All severities')
  const [service, setService] = useState('All services')
  const [notice, setNotice] = useState('')

  const filteredLogs = useMemo(() => SAMPLE_LOGS.filter((entry) => {
    const matchesText = `${entry.message} ${entry.service} ${entry.severity} ${entry.id}`.toLowerCase().includes(query.toLowerCase())
    return matchesText && (severity === 'All severities' || entry.severity === severity) && (service === 'All services' || entry.service === service)
  }), [query, severity, service])

  const copyEntry = async (entry) => {
    const line = `${entry.timestamp} ${entry.severity} [${entry.service}] ${entry.message}`
    try {
      await navigator.clipboard.writeText(line)
      setNotice(`Copied sample log ${entry.id}.`)
    } catch {
      setNotice('Clipboard access is unavailable. Select the log text to copy it manually.')
    }
  }

  const downloadLogs = () => {
    const contents = filteredLogs.map((entry) => `${entry.timestamp} ${entry.severity} [${entry.service}] ${entry.message}`).join('\n')
    const blob = new Blob([contents], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'orbitra-sample-logs.log'
    document.body.append(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
    setNotice(`Downloaded ${filteredLogs.length} sample log entries.`)
  }

  return <div className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-accent-cyan">Observability</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">Logs</h1><p className="mt-2 text-sm text-orbitra-muted">Search and filter example log entries from sample services.</p></div><Badge tone="orange">Sample logs only</Badge></header>
    <div className="grid gap-4 sm:grid-cols-3"><Summary label="Entries shown" value={filteredLogs.length}/><Summary label="Sample services" value={services.length}/><Summary label="High severity" value={SAMPLE_LOGS.filter((entry) => ['ERROR', 'FATAL'].includes(entry.severity)).length}/></div>
    <Card className="p-4 sm:p-5"><div className="grid gap-3 lg:grid-cols-[minmax(15rem,1fr)_12rem_12rem_auto]"><label className="relative"><span className="sr-only">Search sample logs</span><Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-orbitra-muted"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search message, service, severity..." className="w-full rounded-lg border border-orbitra-border bg-orbitra-900 py-2.5 pr-3 pl-9 text-sm text-orbitra-text outline-none focus:ring-2 focus:ring-accent-blue/70"/></label><select aria-label="Filter log severity" value={severity} onChange={(event) => setSeverity(event.target.value)} className="rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2.5 text-sm text-orbitra-text"><option>All severities</option>{['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'].map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Filter log service" value={service} onChange={(event) => setService(event.target.value)} className="rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2.5 text-sm text-orbitra-text"><option>All services</option>{services.map((item) => <option key={item}>{item}</option>)}</select><Button variant="secondary" onClick={downloadLogs} disabled={filteredLogs.length === 0}><Download size={15}/> Download sample</Button></div></Card>
    {notice && <p role="status" className="rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-3 text-sm text-accent-cyan">{notice}</p>}
    <Card title="Log stream" description="Sample entries · newest first" className="p-0"><div className="flex items-center justify-between border-b border-orbitra-border px-5 py-3 text-xs text-orbitra-muted"><span className="flex items-center gap-2"><Terminal size={14}/> {filteredLogs.length} matching entries</span><span>Illustrative timestamps</span></div>{filteredLogs.length ? <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><caption className="sr-only">Searchable illustrative service log stream</caption><thead><tr className="border-b border-orbitra-border text-xs uppercase tracking-wide text-orbitra-muted">{['Timestamp', 'Severity', 'Service', 'Message', ''].map((heading) => <th key={heading || 'copy'} scope="col" className="px-4 py-3 font-medium">{heading}</th>)}</tr></thead><tbody className="divide-y divide-orbitra-border">{filteredLogs.map((entry) => <tr key={entry.id} className="align-top hover:bg-orbitra-800/30"><td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-orbitra-muted"><time dateTime={entry.timestamp}>{dateFormatter.format(new Date(entry.timestamp))}</time></td><td className="px-4 py-4"><Badge tone={severityTone[entry.severity]} className="font-mono text-xs">{entry.severity}</Badge></td><td className="whitespace-nowrap px-4 py-4 text-xs font-medium text-orbitra-text">{entry.service}</td><td className="max-w-xl px-4 py-4 font-mono text-xs leading-5 text-orbitra-muted">{entry.message}</td><td className="px-4 py-3"><Button variant="ghost" size="sm" onClick={() => copyEntry(entry)} aria-label={`Copy log ${entry.id}`}><Clipboard size={15}/></Button></td></tr>)}</tbody></table></div> : <EmptyState title="No sample logs found" description="Adjust your search or filters to see matching log entries." className="m-4"/>}</Card>
    <p className="text-xs text-orbitra-muted">These log lines are synthetic examples shipped with the frontend. Orbitra has not queried a log service or external system.</p>
  </div>
}

function Summary({ label, value }) { return <Card className="p-4"><p className="text-xs text-orbitra-muted">{label}</p><p className="mt-1 text-2xl font-semibold text-orbitra-text">{value}</p></Card> }
export default LogsPage
