import { useMemo, useState } from 'react'
import { ArrowDownRight, CircleDollarSign, Lightbulb, PieChart as PieIcon, TrendingDown, Wallet } from 'lucide-react'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Badge from '../components/common/Badge.jsx'
import Card from '../components/common/Card.jsx'
import { SAMPLE_COST_PERIODS } from '../data/dashboardCost.js'

// Static display conversion for this frontend demo; replace with a trusted API later.
const INR_PER_USD = 96.6149
const usdMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const inrMoney = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
const toInr = (usdAmount) => usdAmount * INR_PER_USD
const formatCost = (usdAmount) => `${inrMoney.format(toInr(usdAmount))} (${usdMoney.format(usdAmount)})`

function CostPage() {
  const [periodKey, setPeriodKey] = useState('30d')
  const period = SAMPLE_COST_PERIODS[periodKey]
  const total = useMemo(() => period.services.reduce((sum, service) => sum + service.amount, 0), [period])
  const sortedServices = useMemo(() => [...period.services].sort((a, b) => b.amount - a.amount), [period])
  const topService = sortedServices[0]
  const budgetPercent = Math.round((total / period.budget) * 100)
  const progressValue = Math.min(budgetPercent, 100)
  const budgetTone = budgetPercent >= 100 ? 'danger' : budgetPercent >= 80 ? 'warning' : 'cyan'

  return <div className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-accent-cyan">FinOps</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">Cost Management</h1><p className="mt-2 text-sm text-orbitra-muted">Understand sample service costs and explore optimization ideas.</p></div><Badge tone="orange">Sample estimates · not billing data</Badge></header>
    <Card className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5"><div><p className="text-sm font-medium text-orbitra-text">Estimated cloud spend</p><p className="mt-1 text-xs text-orbitra-muted">Illustrative figures for {period.label.toLowerCase()}</p></div><label className="flex items-center gap-2 text-xs text-orbitra-muted">Date range<select aria-label="Cost date range" value={periodKey} onChange={(event) => setPeriodKey(event.target.value)} className="rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2 text-sm text-orbitra-text outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/70">{Object.entries(SAMPLE_COST_PERIODS).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}</select></label></Card>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Kpi icon={CircleDollarSign} label="Estimated total" value={inrMoney.format(toInr(total))} note={`${usdMoney.format(total)} · ${period.label}`} tone="cyan"/><Kpi icon={Wallet} label="Sample budget" value={`${budgetPercent}%`} note={`${formatCost(Math.max(period.budget - total, 0))} remaining`} tone={budgetTone}/><Kpi icon={TrendingDown} label="Potential savings" value={inrMoney.format(toInr(period.potentialSavings))} note={`${usdMoney.format(period.potentialSavings)} · estimate only`} tone="green"/><Kpi icon={PieIcon} label="Largest service" value={topService.label} note={`${formatCost(topService.amount)} · ${Math.round((topService.amount / total) * 100)}%`} tone="purple"/></div>

    <div className="grid gap-5 xl:grid-cols-2">
      <Card title="Cost breakdown" description="Estimated share by service for the selected range.">
        <div className="mb-3 flex items-center justify-between"><Badge tone="gray">Illustrative cost mix</Badge><span className="text-xs text-orbitra-muted">{period.label}</span></div>
        <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="relative mx-auto h-56 w-full max-w-64" role="img" aria-label={`${period.label} sample cost breakdown chart`}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={period.services} dataKey="amount" nameKey="label" cx="50%" cy="50%" innerRadius={58} outerRadius={88} paddingAngle={3} stroke="none">{period.services.map((item) => <Cell key={item.id} fill={item.color}/>)}</Pie><Tooltip formatter={(value, name) => [formatCost(Number(value)), name]} contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #243044', borderRadius: 12, color: '#e5e7eb' }}/></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-xs text-orbitra-muted">Estimated total</span><span className="mt-1 text-lg font-semibold text-orbitra-text">{inrMoney.format(toInr(total))}</span><span className="text-xs text-orbitra-muted">{usdMoney.format(total)}</span></div></div>
          <ul className="space-y-3" aria-label="Estimated costs by service">{period.services.map((item) => <li key={item.id} className="flex items-center justify-between gap-3 text-sm"><span className="flex min-w-0 items-center gap-2 text-orbitra-muted"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }}/><span className="truncate">{item.label}</span></span><span className="shrink-0 text-right"><span className="block font-medium tabular-nums text-orbitra-text">{inrMoney.format(toInr(item.amount))}</span><span className="block text-xs tabular-nums text-orbitra-muted">{usdMoney.format(item.amount)}</span></span></li>)}</ul>
        </div>
      </Card>
      <Card title="Service comparison" description="Sample estimated spend by service, highest first.">
        <div className="h-64 w-full" role="img" aria-label={`${period.label} sample service cost comparison in Indian rupees`}><ResponsiveContainer width="100%" height="100%"><BarChart data={sortedServices.map((item) => ({ ...item, amountInr: toInr(item.amount) }))} layout="vertical" margin={{ top: 6, right: 12, bottom: 0, left: 8 }}><XAxis type="number" tick={{ fill: '#8b9bb4', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Math.round(value).toLocaleString('en-IN')}`}/><YAxis type="category" dataKey="label" width={108} tick={{ fill: '#cbd5e1', fontSize: 11 }} tickLine={false} axisLine={false}/><Tooltip formatter={(value, _name, entry) => [formatCost(entry.payload.amount), 'Sample estimate']} contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #243044', borderRadius: 12, color: '#e5e7eb' }}/><Bar dataKey="amountInr" name="Estimated cost (INR)" radius={[0, 6, 6, 0]}>{sortedServices.map((item) => <Cell key={item.id} fill={item.color}/>)}</Bar></BarChart></ResponsiveContainer></div>
        <p className="mt-2 text-xs text-orbitra-muted">Values are estimates and may not match any cloud provider invoice.</p>
      </Card>
    </div>

    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <Card title="Budget progress" description={`Sample spend against the illustrative ${period.label.toLowerCase()} budget.`}>
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs text-orbitra-muted">Estimated spend</p><p className="mt-1 text-2xl font-semibold text-orbitra-text">{inrMoney.format(toInr(total))}</p><p className="text-xs text-orbitra-muted">{usdMoney.format(total)}</p></div><div className="text-right"><p className="text-xs text-orbitra-muted">Sample budget</p><p className="mt-1 text-lg font-medium text-orbitra-text">{inrMoney.format(toInr(period.budget))}</p><p className="text-xs text-orbitra-muted">{usdMoney.format(period.budget)}</p></div></div>
        <div className="mt-5"><div className="mb-2 flex justify-between text-xs"><span className="text-orbitra-muted">Budget used</span><span className="font-medium text-orbitra-text">{budgetPercent}%</span></div><div className="h-3 overflow-hidden rounded-full bg-orbitra-700" role="progressbar" aria-label={`${period.label} sample budget usage`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressValue} aria-valuetext={`${budgetPercent}% of illustrative budget`}><div className={`h-full rounded-full transition-all ${budgetPercent >= 100 ? 'bg-red-500' : budgetPercent >= 80 ? 'bg-accent-orange' : 'bg-accent-cyan'}`} style={{ width: `${progressValue}%` }}/></div></div>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-orbitra-border bg-orbitra-900/50 p-3 text-xs leading-5 text-orbitra-muted"><ArrowDownRight size={15} className="mt-0.5 shrink-0 text-accent-cyan"/><span>{budgetPercent >= 100 ? 'The illustrative budget is exceeded.' : `${formatCost(period.budget - total)} below the illustrative budget.`} This is sample math only, not a billing alert.</span></div>
      </Card>
      <Card title="Cost optimization suggestions" description="Potential savings are estimates for planning discussion, not guaranteed reductions.">
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-accent-green/20 bg-accent-green/5 p-4"><div className="flex items-start gap-3"><Lightbulb size={18} className="mt-0.5 shrink-0 text-accent-green"/><div><p className="text-sm font-medium text-orbitra-text">{period.recommendation}</p><p className="mt-1 text-xs text-orbitra-muted">Review the idea before taking any action.</p></div></div><Badge tone="success">Up to {inrMoney.format(toInr(period.potentialSavings))}</Badge></div>
        <ul className="space-y-3">{period.savingsSuggestions.map((item) => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orbitra-border bg-orbitra-900/50 p-4"><div className="min-w-0"><p className="text-sm font-medium text-orbitra-text">{item.title}</p><p className="mt-1 text-xs leading-5 text-orbitra-muted">{item.detail}</p></div><span className="text-right"><Badge tone={item.tone}>~{inrMoney.format(toInr(item.savings))} est.</Badge><span className="mt-1 block text-xs text-orbitra-muted">{usdMoney.format(item.savings)}</span></span></li>)}</ul>
      </Card>
    </div>
    <p className="rounded-lg border border-accent-orange/20 bg-accent-orange/5 p-3 text-xs leading-5 text-orbitra-muted">Demo only: Orbitra is not connected to AWS billing, a cost management API, an account, or a live exchange-rate feed. All spend, budgets, percentages, and savings are sample estimates. INR conversions use a fixed illustrative rate of ₹96.6149 per US$1 (9 Oct 2026) and should not be used for accounting.</p>
  </div>
}

function Kpi({ icon: Icon, label, value, note, tone }) { const iconClass = { cyan: 'bg-accent-cyan/10 text-accent-cyan', purple: 'bg-accent-purple/10 text-accent-purple', green: 'bg-accent-green/10 text-accent-green', warning: 'bg-accent-orange/10 text-accent-orange', danger: 'bg-red-500/10 text-red-400' }[tone] || 'bg-accent-blue/10 text-accent-blue'; return <Card className="p-4"><div className="flex items-center gap-3"><span className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}><Icon size={17}/></span><div className="min-w-0"><p className="text-xs text-orbitra-muted">{label}</p><p className="mt-1 truncate text-xl font-semibold text-orbitra-text">{value}</p></div></div><p className="mt-3 truncate text-xs text-orbitra-muted">{note}</p></Card> }
export default CostPage
