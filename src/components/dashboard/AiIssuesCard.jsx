import { useState } from 'react'
import { AlertTriangle, Bot, CircleAlert, Lightbulb, SearchCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../common/Badge.jsx'
import Button from '../common/Button.jsx'
import Card from '../common/Card.jsx'
import Modal from '../common/Modal.jsx'
import { SAMPLE_DASHBOARD_ISSUES } from '../../data/dashboardIssues.js'

const toneIconClasses = {
  danger: 'text-red-400',
  warning: 'text-accent-orange',
  purple: 'text-accent-purple',
}

function AiIssuesCard() {
  const [analysisOpen, setAnalysisOpen] = useState(false)

  return (
    <Card
      title="AI DevOps Assistant"
      description="Example findings and troubleshooting suggestions based on mock data."
      className="h-full"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge tone="purple">
          <Bot size={14} className="mr-1" aria-hidden="true" />
          Mock AI preview
        </Badge>
        <Badge tone="warning">{SAMPLE_DASHBOARD_ISSUES.length} sample findings</Badge>
      </div>

      <ul className="space-y-3">
        {SAMPLE_DASHBOARD_ISSUES.map((issue) => {
          const IssueIcon = issue.tone === 'danger' ? CircleAlert : AlertTriangle

          return (
            <li key={issue.id} className="flex items-start gap-3 rounded-xl border border-orbitra-border bg-orbitra-900/50 p-3">
              <IssueIcon
                size={17}
                className={`mt-0.5 shrink-0 ${toneIconClasses[issue.tone]}`}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-orbitra-muted">{issue.category}</p>
                <p className="mt-1 text-sm font-medium text-orbitra-text">{issue.title}</p>
                <p className="mt-1 text-xs leading-5 text-orbitra-muted">{issue.suggestion}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex flex-col gap-3 border-t border-orbitra-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs leading-5 text-orbitra-muted">
          <Lightbulb size={15} className="mt-0.5 shrink-0 text-accent-cyan" aria-hidden="true" />
          Suggestions are examples. No live resources were analyzed.
        </p>
        <Button onClick={() => setAnalysisOpen(true)} className="shrink-0">
          <SearchCheck size={16} aria-hidden="true" />
          Analyze Issues
        </Button>
      </div>

      <Modal
        open={analysisOpen}
        title="Mock issue analysis"
        onClose={() => setAnalysisOpen(false)}
        className="max-h-[85vh] overflow-y-auto"
      >
        <div className="mb-4 rounded-xl border border-accent-purple/20 bg-accent-purple/5 p-3 text-sm text-orbitra-muted">
          <p className="font-medium text-orbitra-text">Demonstration response</p>
          <p className="mt-1 text-xs leading-5">
            This analysis uses only the sample issues shown on the dashboard. Orbitra has not inspected a real deployment, log, or cloud account.
          </p>
        </div>

        <ol className="space-y-4">
          {SAMPLE_DASHBOARD_ISSUES.map((issue, index) => (
            <li key={issue.id} className="rounded-xl border border-orbitra-border bg-orbitra-900/50 p-4">
              <p className="text-xs font-medium text-accent-cyan">Suggestion {index + 1} · {issue.category}</p>
              <h3 className="mt-1 text-sm font-semibold text-orbitra-text">{issue.title}</h3>
              <p className="mt-2 text-sm leading-6 text-orbitra-muted">{issue.detail}</p>
              <p className="mt-2 text-sm leading-6 text-orbitra-text">
                <span className="font-medium">Try:</span> {issue.suggestion}
              </p>
            </li>
          ))}
        </ol>

        <Link
          to="/ai-assistant"
          onClick={() => setAnalysisOpen(false)}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan hover:text-cyan-300"
        >
          Open AI DevOps Assistant
          <SearchCheck size={15} aria-hidden="true" />
        </Link>
      </Modal>
    </Card>
  )
}

export default AiIssuesCard
