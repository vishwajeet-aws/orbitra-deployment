import { useMemo, useState } from 'react'
import { AlertTriangle, ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, Container, Fingerprint, KeyRound, LockKeyhole, ShieldAlert, ShieldCheck } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { SAMPLE_SECURITY_CONTROLS, SAMPLE_SECURITY_FINDINGS } from '../data/security.js'

const severityTone = { Critical: 'danger', High: 'orange', Medium: 'warning', Low: 'blue' }
const controlTone = { 'Needs review': 'danger', 'Review suggested': 'warning', 'Example configured': 'success' }
const controlIcons = { iam: Fingerprint, container: Container, secrets: KeyRound, encryption: LockKeyhole }
const severities = ['All severities', 'Critical', 'High', 'Medium', 'Low']

function SecurityPage() {
  const [severity, setSeverity] = useState('All severities')
  const [expandedId, setExpandedId] = useState('SEC-1042')
  const filteredFindings = useMemo(() => SAMPLE_SECURITY_FINDINGS.filter((finding) => severity === 'All severities' || finding.severity === severity), [severity])
  const countBySeverity = (level) => SAMPLE_SECURITY_FINDINGS.filter((finding) => finding.severity === level).length

  return <div className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-sm text-accent-cyan">Trust &amp; governance</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">Security</h1><p className="mt-2 max-w-2xl text-sm text-orbitra-muted">Review example security findings and suggested safeguards for a cloud-native application.</p></div>
      <Badge tone="orange">Illustrative demo data</Badge>
    </header>

    <div className="flex items-start gap-3 rounded-xl border border-accent-orange/20 bg-accent-orange/5 p-4 text-sm leading-6 text-orbitra-muted" role="note"><ShieldAlert size={18} className="mt-1 shrink-0 text-accent-orange"/><p><span className="font-medium text-orbitra-text">No security scan has run.</span> Findings and control indicators below are invented examples for demonstrating the interface. Orbitra has not inspected a repository, container image, cloud account, IAM policy, or secret store.</p></div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Summary icon={ShieldAlert} label="Example findings" value={SAMPLE_SECURITY_FINDINGS.length} note="Sample records only" tone="blue"/>
      <Summary icon={AlertTriangle} label="Critical / high" value={countBySeverity('Critical') + countBySeverity('High')} note="Needs review in this demo" tone="warning"/>
      <Summary icon={Container} label="Container examples" value="1" note="Illustrative image finding" tone="purple"/>
      <Summary icon={KeyRound} label="Secret examples" value="1" note="No real secret was scanned" tone="cyan"/>
    </div>

    <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      <Card title="Security findings" description="Sample vulnerability and configuration examples with suggested next steps.">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-orbitra-muted">{filteredFindings.length} shown · {SAMPLE_SECURITY_FINDINGS.length} example findings</p><label className="flex items-center gap-2 text-xs text-orbitra-muted">Severity<select aria-label="Filter security findings by severity" value={severity} onChange={(event) => setSeverity(event.target.value)} className="rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2 text-sm text-orbitra-text outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/70">{severities.map((item) => <option key={item}>{item}</option>)}</select></label></div>
        {filteredFindings.length ? <div className="space-y-3">{filteredFindings.map((finding) => {
          const expanded = expandedId === finding.id
          return <article key={finding.id} className="rounded-xl border border-orbitra-border bg-orbitra-900/50 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${finding.severity === 'Critical' ? 'bg-red-500/10 text-red-400' : 'bg-accent-orange/10 text-accent-orange'}`}><AlertTriangle size={17}/></span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-semibold text-orbitra-text">{finding.title}</h3><Badge tone={severityTone[finding.severity]}>{finding.severity}</Badge></div><p className="mt-1 text-xs text-orbitra-muted">{finding.id} · {finding.category} · {finding.detected}</p></div></div><Button variant="ghost" size="sm" aria-expanded={expanded} aria-controls={`remediation-${finding.id}`} onClick={() => setExpandedId(expanded ? null : finding.id)}>{expanded ? 'Hide steps' : 'Remediation'}{expanded ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}</Button></div>
            <p className="mt-3 text-sm leading-5 text-orbitra-muted">{finding.summary}</p><p className="mt-2 break-all font-mono text-xs text-orbitra-muted">Resource: {finding.resource}</p>
            {expanded && <div id={`remediation-${finding.id}`} className="mt-4 rounded-lg border border-accent-cyan/15 bg-accent-cyan/5 p-4"><h4 className="text-sm font-medium text-orbitra-text">Suggested remediation</h4><ol className="mt-3 space-y-2">{finding.remediation.map((step, index) => <li key={step} className="flex gap-2 text-sm leading-5 text-orbitra-muted"><span className="font-mono text-xs text-accent-cyan">{index + 1}.</span><span>{step}</span></li>)}</ol><p className="mt-3 text-xs text-orbitra-muted">Guidance only. No files or infrastructure have been changed.</p></div>}
          </article>
        })}</div> : <EmptyState title="No example findings at this severity" description="Choose another severity filter to view the included demonstration records."/>}
      </Card>

      <Card title="Security controls" description="Example posture indicators for common cloud application safeguards.">
        <div className="space-y-3">{SAMPLE_SECURITY_CONTROLS.map((control) => {
          const Icon = controlIcons[control.icon] || ShieldCheck
          return <div key={control.id} className="rounded-xl border border-orbitra-border bg-orbitra-900/50 p-4"><div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orbitra-800 text-accent-cyan"><Icon size={17}/></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-medium text-orbitra-text">{control.name}</h3><Badge tone={controlTone[control.status]}>{control.status}</Badge></div><p className="mt-1 text-xs leading-5 text-orbitra-muted">{control.detail}</p><p className="mt-2 text-xs text-orbitra-text">{control.score}</p></div></div></div>
        })}</div>
        <div className="mt-4 rounded-lg border border-orbitra-border bg-orbitra-900/50 p-4"><div className="flex items-center gap-2 text-sm font-medium text-orbitra-text"><CheckCircle2 size={16} className="text-accent-green"/>Suggested review order</div><p className="mt-2 text-sm leading-5 text-orbitra-muted">Start with exposed credentials, then narrow IAM permissions and pin container images to reviewed versions.</p><span className="mt-3 inline-flex items-center gap-1 text-xs text-orbitra-muted">Example guidance only <ArrowUpRight size={13}/></span></div>
      </Card>
    </div>

    <Card title="Severity guide" description="These labels describe the sample records on this page, not an assessment of your environment.">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[['Critical', 'Immediate review suggested for a potentially exposed credential.', 'danger'], ['High', 'Review soon; the example could affect release integrity.', 'orange'], ['Medium', 'Consider tightening the configuration example.', 'warning'], ['Low', 'Informational hardening suggestion.', 'blue']].map(([level, description, tone]) => <div key={level} className="rounded-xl border border-orbitra-border bg-orbitra-900/50 p-4"><div className="flex items-center justify-between gap-2"><Badge tone={tone}>{level}</Badge><span className="text-xs text-orbitra-muted">{countBySeverity(level)} example</span></div><p className="mt-3 text-xs leading-5 text-orbitra-muted">{description}</p></div>)}</div>
    </Card>
  </div>
}

function Summary({ icon: Icon, label, value, note, tone }) {
  const iconTone = { blue: 'bg-accent-blue/10 text-accent-blue', warning: 'bg-accent-orange/10 text-accent-orange', purple: 'bg-accent-purple/10 text-accent-purple', cyan: 'bg-accent-cyan/10 text-accent-cyan' }[tone]
  return <Card className="p-4"><div className="flex items-center gap-3"><span className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconTone}`}><Icon size={17}/></span><div><p className="text-xs text-orbitra-muted">{label}</p><p className="mt-0.5 text-xl font-semibold text-orbitra-text">{value}</p></div></div><p className="mt-3 text-xs text-orbitra-muted">{note}</p></Card>
}

export default SecurityPage
