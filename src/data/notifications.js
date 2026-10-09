export const SAMPLE_NOTIFICATIONS = [
  {
    id: 'n-1',
    category: 'deploymentFailures',
    title: 'api-gateway deploy completed',
    detail: 'Sample notification — staging environment',
    time: '2m ago',
    unread: true,
  },
  {
    id: 'n-2',
    category: 'deploymentFailures',
    title: 'Pod restart detected',
    detail: 'Sample notification — payments-service',
    time: '18m ago',
    unread: true,
  },
  {
    id: 'n-3',
    category: 'costBudgets',
    title: 'Weekly cost estimate ready',
    detail: 'Sample notification — not a live AWS bill',
    time: '1h ago',
    unread: false,
  },
  {
    id: 'n-4',
    category: 'securityFindings',
    title: 'Example credential finding needs review',
    detail: 'Illustrative security notification — no scan was run',
    time: '3h ago',
    unread: true,
  },
]
