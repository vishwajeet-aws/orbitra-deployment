import AiIssuesCard from '../components/dashboard/AiIssuesCard.jsx'
import CloudCostOverview from '../components/dashboard/CloudCostOverview.jsx'
import DeploymentActivity from '../components/dashboard/DeploymentActivity.jsx'
import InfrastructureHealth from '../components/dashboard/InfrastructureHealth.jsx'
import QuickActions from '../components/dashboard/QuickActions.jsx'
import RecentProjects from '../components/dashboard/RecentProjects.jsx'
import StatisticsGrid from '../components/dashboard/StatisticsGrid.jsx'
import WelcomeSection from '../components/dashboard/WelcomeSection.jsx'
import { readPreferences } from '../services/preferences.js'

function DashboardPage() {
  const { dashboard } = readPreferences()
  return (
    <div className="space-y-6">
      {dashboard.welcome && <WelcomeSection />}
      <StatisticsGrid />
      <DeploymentActivity />
      <InfrastructureHealth />
      <RecentProjects />
      <div className={`grid grid-cols-1 items-stretch gap-6 ${dashboard.costOverview ? '2xl:grid-cols-2' : ''}`}>
        {dashboard.costOverview && <CloudCostOverview />}
        <QuickActions />
      </div>
      {dashboard.assistantCard && <AiIssuesCard />}
    </div>
  )
}

export default DashboardPage
