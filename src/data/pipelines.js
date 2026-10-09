// Sample CI/CD pipelines and runs. Nothing here is connected to a repository or runner.
export const SAMPLE_PIPELINES = [
  {
    id: 'pipe-api-release', name: 'API release', repository: 'orbitra/orbitra-api', branch: 'main',
    status: 'Succeeded', updatedAt: '2026-10-10T09:42:00+05:30',
    stages: [
      { name: 'Checkout', status: 'Succeeded', duration: '8s' },
      { name: 'Install', status: 'Succeeded', duration: '24s' },
      { name: 'Test', status: 'Succeeded', duration: '1m 12s' },
      { name: 'Build image', status: 'Succeeded', duration: '48s' },
      { name: 'Deploy preview', status: 'Succeeded', duration: '31s' },
    ],
    runs: [
      { id: '#1042', status: 'Succeeded', commit: 'c84f2a1', actor: 'Maya Chen', when: 'Today, 09:42', duration: '3m 08s' },
      { id: '#1039', status: 'Succeeded', commit: '8f192d0', actor: 'Alex Rivera', when: 'Yesterday, 16:10', duration: '2m 54s' },
    ],
  },
  {
    id: 'pipe-console-ci', name: 'Console web CI', repository: 'orbitra/console-web', branch: 'develop',
    status: 'Running', updatedAt: '2026-10-10T10:31:00+05:30',
    stages: [
      { name: 'Checkout', status: 'Succeeded', duration: '6s' },
      { name: 'Install', status: 'Succeeded', duration: '19s' },
      { name: 'Test', status: 'Running', duration: '—' },
      { name: 'Build image', status: 'Queued', duration: '—' },
      { name: 'Deploy preview', status: 'Queued', duration: '—' },
    ],
    runs: [{ id: '#0876', status: 'Running', commit: 'a2d91bc', actor: 'Sam Patel', when: 'Today, 10:31', duration: '1m 16s' }],
  },
  {
    id: 'pipe-billing-checks', name: 'Billing checks', repository: 'orbitra/billing-worker', branch: 'main',
    status: 'Failed', updatedAt: '2026-10-10T08:58:00+05:30',
    stages: [
      { name: 'Checkout', status: 'Succeeded', duration: '7s' },
      { name: 'Install', status: 'Succeeded', duration: '28s' },
      { name: 'Test', status: 'Failed', duration: '42s' },
      { name: 'Build image', status: 'Skipped', duration: '—' },
      { name: 'Deploy preview', status: 'Skipped', duration: '—' },
    ],
    runs: [{ id: '#0318', status: 'Failed', commit: '6bc4e09', actor: 'Alex Rivera', when: 'Today, 08:58', duration: '1m 17s' }],
  },
]
