import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock3, FolderKanban, Globe2, LockKeyhole, MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import Input from '../components/common/Input.jsx'
import Modal from '../components/common/Modal.jsx'
import { useProjects } from '../contexts/ProjectsContext.jsx'

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })
const initialForm = { name: '', description: '', visibility: 'Private', repository: '', framework: 'React' }

function ProjectsPage() {
  const { projects, createProject, updateProject, deleteProject } = useProjects()
  const [query, setQuery] = useState('')
  const [visibility, setVisibility] = useState('All visibility')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [formError, setFormError] = useState('')

  const filteredProjects = useMemo(() => projects.filter((project) => {
    const matchesQuery = `${project.name} ${project.description} ${project.framework}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (visibility === 'All visibility' || project.visibility === visibility)
  }), [projects, query, visibility])

  const openCreate = () => { setForm(initialForm); setFormError(''); setModal({ type: 'create' }) }
  const openEdit = (project) => {
    setForm({ name: project.name, description: project.description, visibility: project.visibility, repository: project.repository, framework: project.framework })
    setFormError('')
    setModal({ type: 'edit', project })
  }
  const saveProject = (event) => {
    event.preventDefault()
    if (form.name.trim().length < 2) { setFormError('Enter a project name with at least 2 characters.'); return }
    if (modal.type === 'edit') updateProject(modal.project.id, form)
    else createProject(form)
    setModal(null)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm text-accent-cyan">Workspace</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">Projects</h1><p className="mt-2 text-sm text-orbitra-muted">Organize applications and explore their deployment history.</p></div>
        <Button onClick={openCreate}><Plus size={16} /> New project</Button>
      </header>

      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search projects</span><Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-orbitra-muted" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects..." className="w-full rounded-lg border border-orbitra-border bg-orbitra-900 py-2.5 pr-3 pl-9 text-sm text-orbitra-text outline-none focus:ring-2 focus:ring-accent-blue/70" />
          </label>
          <label className="text-sm text-orbitra-muted"><span className="sr-only">Filter by visibility</span><select value={visibility} onChange={(event) => setVisibility(event.target.value)} className="w-full rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2.5 text-orbitra-text sm:w-48"><option>All visibility</option><option>Private</option><option>Public</option></select></label>
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-orbitra-muted"><span>{filteredProjects.length} projects</span><Badge tone="gray">Frontend demo data · session only</Badge></div>
      {filteredProjects.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onEdit={() => openEdit(project)} onDelete={() => setModal({ type: 'delete', project })} />)}</div> : <EmptyState title={projects.length ? 'No matching projects' : 'No projects yet'} description={projects.length ? 'Try another search or change the visibility filter.' : 'Create a project to begin organizing your sample workspace.'} action={<Button onClick={openCreate}><Plus size={16} /> Create project</Button>} />}
      <p className="text-xs text-orbitra-muted">Project changes are held in page memory for this session. No repository or cloud resource is created.</p>

      <Modal open={modal?.type === 'create' || modal?.type === 'edit'} title={modal?.type === 'edit' ? 'Edit project' : 'Create project'} onClose={() => setModal(null)}>
        <form onSubmit={saveProject} className="space-y-4">
          <Input label="Project name" name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required autoFocus placeholder="e.g. Customer portal" />
          <div><label htmlFor="project-description" className="mb-1.5 block text-sm font-medium text-orbitra-text">Description</label><textarea id="project-description" rows="3" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="w-full rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2 text-sm text-orbitra-text outline-none focus:ring-2 focus:ring-accent-blue/70" placeholder="What does this project do?" /></div>
          <Input label="Repository URL (optional)" name="repository" value={form.repository} onChange={(event) => setForm({ ...form, repository: event.target.value })} placeholder="https://github.com/org/repo" />
          <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium text-orbitra-text">Visibility<select value={form.visibility} onChange={(event) => setForm({ ...form, visibility: event.target.value })} className="mt-1.5 w-full rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2 text-sm"><option>Private</option><option>Public</option></select></label><label className="text-sm font-medium text-orbitra-text">Framework<select value={form.framework} onChange={(event) => setForm({ ...form, framework: event.target.value })} className="mt-1.5 w-full rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2 text-sm"><option>React</option><option>Vite</option><option>Node.js</option><option>Next.js</option><option>Other</option></select></label></div>
          {formError && <p role="alert" className="text-sm text-red-400">{formError}</p>}
          <div className="flex justify-end gap-2 pt-2"><Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button><Button type="submit">{modal?.type === 'edit' ? 'Save changes' : 'Create project'}</Button></div>
        </form>
      </Modal>
      <Modal open={modal?.type === 'delete'} title="Delete this project?" onClose={() => setModal(null)}>
        <p className="text-sm leading-6 text-orbitra-muted">Remove <strong className="text-orbitra-text">{modal?.project.name}</strong> from this demo session? This cannot be undone in the current view.</p>
        <div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={() => setModal(null)}>Keep project</Button><Button variant="danger" onClick={() => { deleteProject(modal.project.id); setModal(null) }}><Trash2 size={15} /> Delete project</Button></div>
      </Modal>
    </div>
  )
}

function ProjectCard({ project, onEdit, onDelete }) {
  return <Card className="p-5 transition-colors hover:border-orbitra-600">
    <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/15 text-accent-cyan"><FolderKanban size={18} /></span><div className="flex gap-1"><Button variant="ghost" size="sm" onClick={onEdit} aria-label={`Edit ${project.name}`}><Pencil size={15} /></Button><Button variant="ghost" size="sm" onClick={onDelete} aria-label={`Delete ${project.name}`}><Trash2 size={15} /></Button></div></div>
    <Link to={`/projects/${project.id}`} className="mt-4 block rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"><h2 className="font-semibold text-orbitra-text hover:text-accent-cyan">{project.name}</h2><p className="mt-1 line-clamp-2 min-h-10 text-sm text-orbitra-muted">{project.description}</p></Link>
    <div className="mt-4 flex flex-wrap gap-2"><Badge tone={project.statusTone}>{project.status}</Badge><Badge tone="gray">{project.framework}</Badge><Badge tone={project.visibility === 'Public' ? 'blue' : 'gray'}>{project.visibility === 'Public' ? <Globe2 size={12} className="mr-1" /> : <LockKeyhole size={12} className="mr-1" />}{project.visibility}</Badge></div>
    <div className="mt-5 flex items-center justify-between border-t border-orbitra-border pt-4 text-xs text-orbitra-muted"><span className="flex items-center gap-1.5"><Clock3 size={13} />Updated {dateFormatter.format(new Date(project.updatedAt))}</span><Link to={`/projects/${project.id}`} aria-label={`Open ${project.name}`} className="rounded p-1 hover:text-accent-cyan"><MoreHorizontal size={18} /></Link></div>
  </Card>
}

export default ProjectsPage
