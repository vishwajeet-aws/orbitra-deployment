import { ArrowUpRight, CalendarDays, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SAMPLE_CURRENT_USER } from '../../data/currentUser.js'
import { readPreferences } from '../../services/preferences.js'

function getGreeting(hour) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function WelcomeSection() {
  const now = new Date()
  const greeting = getGreeting(now.getHours())
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(now)
  const profileName = readPreferences().profile.name || SAMPLE_CURRENT_USER.name

  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-orbitra-border bg-orbitra-850 p-5 sm:p-7 lg:p-8">
      <div
        aria-hidden="true"
        className="absolute -top-24 right-0 -z-10 h-64 w-64 rounded-full bg-accent-blue/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-12 bottom-0 -z-10 h-40 w-40 rounded-full bg-accent-purple/10 blur-3xl"
      />

      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1 text-xs font-medium text-accent-cyan">
            <Sparkles size={14} aria-hidden="true" />
            Orbitra workspace overview
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-orbitra-text sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm leading-6 text-orbitra-muted sm:text-base">
            {greeting}, {profileName.split(' ')[0]}. Here’s a snapshot of your cloud workspace.
            All metrics shown in this demo are sample data.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-orbitra-muted">
            <CalendarDays size={16} aria-hidden="true" />
            <time dateTime={now.toISOString().slice(0, 10)}>{formattedDate}</time>
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-accent-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue sm:self-auto"
        >
          Explore projects
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default WelcomeSection
