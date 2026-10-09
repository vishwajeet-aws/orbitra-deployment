/* eslint-disable react-refresh/only-export-components -- Context providers and their matching hooks belong together. */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { SAMPLE_RECENT_PROJECTS } from '../data/recentProjects.js'

const ProjectsContext = createContext(null)

function createProjectId(name) {
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `proj-${slug || 'new'}-${Date.now().toString(36)}`
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(() => SAMPLE_RECENT_PROJECTS.map((project) => ({
    ...project,
    repository: `github.com/orbitra/${project.name.toLowerCase().replaceAll(' ', '-')}`,
    framework: project.id === 'proj-docs-site' ? 'Vite' : 'React',
  })))

  const createProject = useCallback((values) => {
    const project = {
      id: createProjectId(values.name),
      name: values.name.trim(),
      description: values.description.trim() || 'No description provided.',
      visibility: values.visibility,
      status: 'Healthy',
      statusTone: 'success',
      repository: values.repository.trim() || 'Not connected',
      framework: values.framework || 'Not specified',
      updatedAt: new Date().toISOString(),
    }
    setProjects((current) => [project, ...current])
    return project
  }, [])

  const updateProject = useCallback((projectId, values) => {
    setProjects((current) => current.map((project) => (
      project.id === projectId
        ? {
            ...project,
            ...values,
            name: values.name.trim(),
            description: values.description.trim() || 'No description provided.',
            repository: values.repository.trim() || 'Not connected',
            updatedAt: new Date().toISOString(),
          }
        : project
    )))
  }, [])

  const deleteProject = useCallback((projectId) => {
    setProjects((current) => current.filter((project) => project.id !== projectId))
  }, [])

  const value = useMemo(() => ({ projects, createProject, updateProject, deleteProject }), [
    projects,
    createProject,
    updateProject,
    deleteProject,
  ])

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) throw new Error('useProjects must be used inside ProjectsProvider')
  return context
}
