import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import PublicLayout from './layouts/PublicLayout.jsx'
import WorkspaceDataLayout from './layouts/WorkspaceDataLayout.jsx'
import Spinner from './components/common/Spinner.jsx'
import { applyPreferences, readPreferences } from './services/preferences.js'

const AiAssistantPage = lazy(() => import('./pages/AiAssistantPage.jsx'))
const ContainersPage = lazy(() => import('./pages/ContainersPage.jsx'))
const CostPage = lazy(() => import('./pages/CostPage.jsx'))
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))
const DeploymentsPage = lazy(() => import('./pages/DeploymentsPage.jsx'))
const DeploymentDetailsPage = lazy(() => import('./pages/DeploymentDetailsPage.jsx'))
const KubernetesPage = lazy(() => import('./pages/KubernetesPage.jsx'))
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const LogsPage = lazy(() => import('./pages/LogsPage.jsx'))
const MonitoringPage = lazy(() => import('./pages/MonitoringPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))
const PipelinesPage = lazy(() => import('./pages/PipelinesPage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage.jsx'))
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'))
const SecurityPage = lazy(() => import('./pages/SecurityPage.jsx'))
const SettingsPage = lazy(() => import('./pages/SettingsPage.jsx'))
const TerraformPage = lazy(() => import('./pages/TerraformPage.jsx'))

function App() {
  useEffect(() => { applyPreferences(readPreferences()) }, [])

  return (
    <Suspense
      fallback={(
        <div className="flex min-h-screen items-center justify-center bg-orbitra-900">
          <Spinner label="Loading page" />
        </div>
      )}
    >
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route element={<WorkspaceDataLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
            <Route path="/deployments" element={<DeploymentsPage />} />
            <Route path="/deployments/:deploymentId" element={<DeploymentDetailsPage />} />
            <Route path="/containers" element={<ContainersPage />} />
            <Route path="/kubernetes" element={<KubernetesPage />} />
            <Route path="/infrastructure" element={<TerraformPage />} />
            <Route path="/pipelines" element={<PipelinesPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/costs" element={<CostPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/ai-assistant" element={<AiAssistantPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
