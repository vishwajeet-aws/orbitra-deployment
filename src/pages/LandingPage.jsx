import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  ChartNoAxesCombined,
  CircleCheck,
  Cloud,
  MessageSquareText,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../components/common/Badge.jsx'

const features = [
  {
    icon: Workflow,
    title: 'Deployment workflows',
    description: 'Keep project releases and pipeline activity visible in one workspace.',
    tone: 'text-accent-blue bg-accent-blue/15',
  },
  {
    icon: Boxes,
    title: 'Infrastructure visibility',
    description: 'Review containers, clusters, and infrastructure examples from one dashboard.',
    tone: 'text-accent-cyan bg-accent-cyan/15',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Cost and health signals',
    description: 'Explore resource trends and illustrative cost estimates at a glance.',
    tone: 'text-accent-green bg-accent-green/15',
  },
  {
    icon: MessageSquareText,
    title: 'AI DevOps assistance',
    description: 'Try guided troubleshooting examples using a clearly labeled mock assistant.',
    tone: 'text-accent-purple bg-accent-purple/15',
  },
]

const technologies = ['React', 'Vite', 'Tailwind CSS', 'Docker', 'Kubernetes', 'Terraform', 'Recharts']

function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <section className="grid items-center gap-10 py-8 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <Badge tone="cyan">
            <Cloud size={14} className="mr-1" aria-hidden="true" />
            Cloud-native workspace · frontend demo
          </Badge>
          <h1 className="mt-5 max-w-2xl text-4xl leading-tight font-semibold tracking-tight text-orbitra-text sm:text-5xl lg:text-6xl">
            Cloud operations, brought into focus.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-orbitra-muted sm:text-lg">
            Orbitra Deploy brings projects, deployments, infrastructure signals, and cost insights into one clear workspace.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-orbitra-muted">
            Explore a frontend demonstration built with sample data. It does not connect to cloud accounts or run deployments.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
            >
              Explore the demo
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg border border-orbitra-border bg-orbitra-850 px-5 py-3 text-sm font-semibold text-orbitra-text transition-colors hover:bg-orbitra-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan"
            >
              Sign in
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-orbitra-muted">
            <span className="inline-flex items-center gap-2">
              <CircleCheck size={14} className="text-accent-green" aria-hidden="true" />
              No cloud credentials needed
            </span>
            <span className="inline-flex items-center gap-2">
              <CircleCheck size={14} className="text-accent-green" aria-hidden="true" />
              Mock authentication only
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-accent-blue/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-orbitra-border bg-orbitra-850 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-orbitra-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-blue/15 text-accent-cyan">
                  <Cloud size={15} aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold text-orbitra-text">Orbitra workspace</span>
              </div>
              <Badge tone="gray">Sample preview</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 sm:p-5">
              <div className="rounded-xl border border-orbitra-border bg-orbitra-900 p-4">
                <p className="text-xs text-orbitra-muted">Projects</p>
                <p className="mt-2 text-2xl font-semibold text-orbitra-text">12</p>
                <p className="mt-1 text-[11px] text-accent-green">Illustrative sample</p>
              </div>
              <div className="rounded-xl border border-orbitra-border bg-orbitra-900 p-4">
                <p className="text-xs text-orbitra-muted">Deployments</p>
                <p className="mt-2 text-2xl font-semibold text-orbitra-text">4</p>
                <p className="mt-1 text-[11px] text-accent-cyan">Illustrative sample</p>
              </div>
              <div className="col-span-2 rounded-xl border border-orbitra-border bg-orbitra-900 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-orbitra-muted">Infrastructure health</p>
                    <p className="mt-2 text-xl font-semibold text-orbitra-text">98 / 100</p>
                  </div>
                  <ChartNoAxesCombined size={22} className="text-accent-purple" aria-hidden="true" />
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-orbitra-700">
                  <div className="h-full w-[82%] rounded-full bg-linear-to-r from-accent-blue to-accent-cyan" />
                </div>
                <p className="mt-2 text-[11px] text-orbitra-muted">Sample metrics · not connected to live resources</p>
              </div>
              <div className="col-span-2 flex items-center gap-3 rounded-xl border border-orbitra-border bg-orbitra-900 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-purple/15 text-accent-purple">
                  <MessageSquareText size={17} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-orbitra-text">AI DevOps Assistant</p>
                  <p className="mt-1 text-xs text-orbitra-muted">Mock troubleshooting examples</p>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-orbitra-muted" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14" aria-labelledby="features-heading">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent-cyan uppercase">One workspace</p>
          <h2 id="features-heading" className="mt-3 text-2xl font-semibold text-orbitra-text sm:text-3xl">
            The signals your team needs, together.
          </h2>
          <p className="mt-3 text-sm leading-6 text-orbitra-muted">
            Navigate common cloud operations from a single, approachable interface.
          </p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <article key={feature.title} className="rounded-2xl border border-orbitra-border bg-orbitra-850 p-5 transition-colors hover:border-orbitra-600">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${feature.tone}`}>
                  <Icon size={19} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-orbitra-text">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-orbitra-muted">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-y border-orbitra-border py-8 md:py-10" aria-labelledby="stack-heading">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="stack-heading" className="text-lg font-semibold text-orbitra-text">Designed for a modern cloud stack</h2>
            <p className="mt-1 text-sm text-orbitra-muted">Technology areas represented in this frontend demo.</p>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
            {technologies.map((technology) => (
              <li key={technology}>
                <Badge tone="gray">{technology}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="my-10 flex flex-col justify-between gap-5 rounded-2xl border border-accent-blue/20 bg-linear-to-br from-accent-blue/10 via-orbitra-850 to-accent-purple/10 p-6 sm:p-8 md:my-14 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-accent-cyan">Take a look around</p>
          <h2 className="mt-2 text-2xl font-semibold text-orbitra-text">See how the Orbitra workspace comes together.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-orbitra-muted">
            This frontend preview uses sample data and mock interactions. No deployment or infrastructure action will run.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-accent-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500">
            Create demo account <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link to="/login" className="inline-flex items-center rounded-lg border border-orbitra-border bg-orbitra-900/70 px-4 py-2.5 text-sm font-medium text-orbitra-text hover:bg-orbitra-800">
            Login
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
