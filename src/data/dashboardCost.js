// Sample estimates only. These amounts are not read from a cloud provider.
export const SAMPLE_COST_PERIODS = {
  '7d': {
    label: 'Last 7 days',
    budget: 700,
    services: [
      { id: 'compute', label: 'Compute', amount: 180, color: '#3b82f6' },
      { id: 'storage', label: 'Storage', amount: 28, color: '#8b5cf6' },
      { id: 'network', label: 'Network', amount: 14, color: '#22d3ee' },
      { id: 'database', label: 'Database', amount: 42, color: '#22c55e' },
      { id: 'other', label: 'Other services', amount: 8, color: '#f97316' },
    ],
    recommendation: 'Review idle development instances and schedule them to stop outside working hours.',
    potentialSavings: 47,
  },
  '30d': {
    label: 'Last 30 days',
    budget: 2000,
    services: [
      { id: 'compute', label: 'Compute', amount: 820, color: '#3b82f6' },
      { id: 'storage', label: 'Storage', amount: 142, color: '#8b5cf6' },
      { id: 'network', label: 'Network', amount: 76, color: '#22d3ee' },
      { id: 'database', label: 'Database', amount: 183, color: '#22c55e' },
      { id: 'other', label: 'Other services', amount: 43, color: '#f97316' },
    ],
    recommendation: 'Compare sample compute requests with usage and right-size the largest worker pool.',
    potentialSavings: 225,
  },
  '90d': {
    label: 'Last 90 days',
    budget: 6000,
    services: [
      { id: 'compute', label: 'Compute', amount: 2460, color: '#3b82f6' },
      { id: 'storage', label: 'Storage', amount: 426, color: '#8b5cf6' },
      { id: 'network', label: 'Network', amount: 228, color: '#22d3ee' },
      { id: 'database', label: 'Database', amount: 549, color: '#22c55e' },
      { id: 'other', label: 'Other services', amount: 129, color: '#f97316' },
    ],
    recommendation: 'Review reserved capacity assumptions and clean up unattached sample storage volumes.',
    potentialSavings: 676,
  },
}
