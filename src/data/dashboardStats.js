import {
  Activity,
  Box,
  CircleCheck,
  FolderKanban,
  Rocket,
  WalletCards,
} from 'lucide-react'

// Illustrative dashboard values only. Replace this file with API data later.
export const SAMPLE_DASHBOARD_STATS = [
  {
    id: 'projects',
    label: 'Total projects',
    value: '12',
    detail: '2 added this month',
    icon: FolderKanban,
    color: 'blue',
  },
  {
    id: 'deployments',
    label: 'Active deployments',
    value: '4',
    detail: 'Across 3 sample environments',
    icon: Rocket,
    color: 'purple',
  },
  {
    id: 'success-rate',
    label: 'Deployment success rate',
    value: '98.2%',
    detail: 'Sample rate over the last 30 days',
    icon: CircleCheck,
    color: 'green',
    progress: 98.2,
  },
  {
    id: 'containers',
    label: 'Running containers',
    value: '26 / 30',
    detail: '4 stopped · simulated runtime',
    icon: Box,
    color: 'cyan',
    progress: 86.7,
  },
  {
    id: 'cloud-cost',
    label: 'Estimated cloud cost',
    value: 'US$1,284.60',
    detail: 'Illustrative monthly estimate',
    icon: WalletCards,
    color: 'orange',
  },
  {
    id: 'infrastructure-health',
    label: 'Infrastructure health',
    value: '98 / 100',
    detail: 'Mock service health score',
    icon: Activity,
    color: 'blue',
    progress: 98,
  },
]
