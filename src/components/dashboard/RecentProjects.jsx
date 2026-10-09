import { useEffect, useRef, useState } from 'react'
import { Clock3, ExternalLink, FolderKanban, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../common/Badge.jsx'
import Card from '../common/Card.jsx'
import Modal from '../common/Modal.jsx'
import { useProjects } from '../../contexts/ProjectsContext.jsx'

const updateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function RecentProjectCard({ project }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnOutsideClick = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <article className="rounded-xl border border-orbitra-border bg-orbitra-900/50 p-4 transition-colors hover:border-orbitra-600">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-blue/15 text-accent-cyan">
            <FolderKanban size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-medium text-orbitra-text">{project.name}</h3>
            <p className="mt-0.5 truncate text-xs text-orbitra-muted">{project.description}</p>
          </div>
        </div>

        <div ref={cardRef} className="relative shrink-0">
          <button
            type="button"
            className="rounded-lg p-2 text-orbitra-muted hover:bg-orbitra-800 hover:text-orbitra-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue"
            aria-label={`Actions for ${project.name}`}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MoreHorizontal size={18} aria-hidden="true" />
          </button>

          {menuOpen ? (
            <div
              className="absolute top-full right-0 z-20 mt-1 w-48 rounded-xl border border-orbitra-border bg-orbitra-850 p-1 shadow-xl"
            >
              <button
                type="button"
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-orbitra-text hover:bg-orbitra-800"
                onClick={() => {
                  setMenuOpen(false)
                  setDetailsOpen(true)
                }}
              >
                View project summary
              </button>
              <Link
                to="/deployments"
                className="block rounded-lg px-3 py-2 text-sm text-orbitra-text hover:bg-orbitra-800"
                onClick={() => setMenuOpen(false)}
              >
                Browse deployments
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge tone={project.visibility === 'Public' ? 'blue' : 'gray'}>{project.visibility}</Badge>
        <Badge tone={project.statusTone}>{project.status}</Badge>
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-orbitra-muted">
        <Clock3 size={14} aria-hidden="true" />
        <span>Updated </span>
        <time dateTime={project.updatedAt}>
          {updateFormatter.format(new Date(project.updatedAt))}
        </time>
      </p>

      <Modal
        open={detailsOpen}
        title={`${project.name} · Project summary`}
        onClose={() => setDetailsOpen(false)}
      >
        <p className="text-sm leading-6 text-orbitra-muted">{project.description}</p>
        <dl className="mt-5 grid grid-cols-2 gap-4 rounded-xl border border-orbitra-border bg-orbitra-900/60 p-4 text-sm">
          <div>
            <dt className="text-xs text-orbitra-muted">Visibility</dt>
            <dd className="mt-1 font-medium text-orbitra-text">{project.visibility}</dd>
          </div>
          <div>
            <dt className="text-xs text-orbitra-muted">Sample status</dt>
            <dd className="mt-1 font-medium text-orbitra-text">{project.status}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-orbitra-muted">Last updated</dt>
            <dd className="mt-1 font-medium text-orbitra-text">
              {updateFormatter.format(new Date(project.updatedAt))}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-orbitra-muted">
          This project summary uses local sample data and is not connected to a repository.
        </p>
      </Modal>
    </article>
  )
}

function RecentProjects() {
  const { projects } = useProjects()
  return (
    <Card
      title="Recent projects"
      description="A sample overview of projects in your workspace."
    >
      <div className="mb-4 flex justify-end">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-accent-cyan hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-cyan"
        >
          View all projects
          <ExternalLink size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {projects.slice(0, 4).map((project) => (
          <RecentProjectCard key={project.id} project={project} />
        ))}
      </div>
      <p className="mt-4 text-xs text-orbitra-muted">
        Project names, visibility, status, and timestamps above are illustrative sample data.
      </p>
    </Card>
  )
}

export default RecentProjects
