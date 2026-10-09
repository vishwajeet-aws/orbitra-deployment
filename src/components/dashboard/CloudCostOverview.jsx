import { useState } from 'react'
import { Lightbulb } from 'lucide-react'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import Badge from '../common/Badge.jsx'
import Card from '../common/Card.jsx'
import { SAMPLE_COST_PERIODS } from '../../data/dashboardCost.js'

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function formatCurrency(amount) {
  return currencyFormatter.format(amount)
}

function CloudCostOverview() {
  const [periodKey, setPeriodKey] = useState('30d')
  const period = SAMPLE_COST_PERIODS[periodKey]
  const total = period.services.reduce((sum, service) => sum + service.amount, 0)
  const budgetPercent = Math.min(Math.round((total / period.budget) * 100), 100)

  return (
    <Card
      title="Cloud cost overview"
      description="Estimated service costs · sample figures only"
      className="h-full"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Badge tone="gray">Sample estimate</Badge>
        <label className="flex items-center gap-2 text-xs text-orbitra-muted">
          <span>Date range</span>
          <select
            value={periodKey}
            onChange={(event) => setPeriodKey(event.target.value)}
            className="rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2 text-sm text-orbitra-text outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/70"
          >
            {Object.entries(SAMPLE_COST_PERIODS).map(([key, range]) => (
              <option key={key} value={key}>{range.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="relative mx-auto h-52 w-full max-w-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={period.services}
                dataKey="amount"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={82}
                paddingAngle={3}
                stroke="none"
              >
                {period.services.map((service) => (
                  <Cell key={service.id} fill={service.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [formatCurrency(Number(value)), name]}
                contentStyle={{
                  backgroundColor: '#0b1220',
                  border: '1px solid #1e293b',
                  borderRadius: '12px',
                  color: '#e5e7eb',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-orbitra-muted">Estimated total</span>
            <span className="mt-1 text-xl font-semibold text-orbitra-text">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <ul className="space-y-3" aria-label="Sample costs by service">
          {period.services.map((service) => (
            <li key={service.id} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex min-w-0 items-center gap-2 text-orbitra-muted">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: service.color }}
                  aria-hidden="true"
                />
                <span className="truncate">{service.label}</span>
              </span>
              <span className="shrink-0 font-medium tabular-nums text-orbitra-text">
                {formatCurrency(service.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-orbitra-border pt-4">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-orbitra-muted">Sample budget progress</span>
          <span className="font-medium text-orbitra-text">
            {formatCurrency(total)} / {formatCurrency(period.budget)}
          </span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-orbitra-700"
          role="progressbar"
          aria-label={`${period.label} sample budget progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={budgetPercent}
        >
          <div
            className="h-full rounded-full bg-accent-blue"
            style={{ width: `${budgetPercent}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-accent-green/20 bg-accent-green/5 p-4">
        <Lightbulb size={17} className="mt-0.5 shrink-0 text-accent-green" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-orbitra-text">Sample cost recommendation</p>
          <p className="mt-1 text-xs leading-5 text-orbitra-muted">{period.recommendation}</p>
          <p className="mt-2 text-xs font-medium text-accent-green">
            Potential sample savings: {formatCurrency(period.potentialSavings)}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default CloudCostOverview
