import { Outlet } from 'react-router-dom'
import { DeploymentsProvider } from '../contexts/DeploymentsContext.jsx'
import { ProjectsProvider } from '../contexts/ProjectsContext.jsx'

function WorkspaceDataLayout() {
  return (
    <ProjectsProvider>
      <DeploymentsProvider>
        <Outlet />
      </DeploymentsProvider>
    </ProjectsProvider>
  )
}

export default WorkspaceDataLayout
