// Demonstration findings only. No infrastructure or application was inspected.
export const SAMPLE_DASHBOARD_ISSUES = [
  {
    id: 'deployment-failure',
    category: 'Deployment issue',
    title: 'Sample billing-worker deployment failed',
    detail: 'The mock run stopped at its health-check stage.',
    suggestion: 'Review the readiness probe path and inspect the sample application logs.',
    tone: 'danger',
  },
  {
    id: 'api-latency',
    category: 'Infrastructure warning',
    title: 'API latency is elevated in the sample snapshot',
    detail: 'The illustrative API service is marked for attention.',
    suggestion: 'Compare response-time trends with the recent release and dependency health.',
    tone: 'warning',
  },
  {
    id: 'high-cpu',
    category: 'High resource usage',
    title: 'worker-node-02 CPU is at 91%',
    detail: 'This is a simulated resource reading.',
    suggestion: 'Check workload distribution and consider whether another replica is needed.',
    tone: 'warning',
  },
  {
    id: 'container-restarts',
    category: 'Container restarts',
    title: 'worker-queue restarted 4 times',
    detail: 'The restart count is mock data for this dashboard.',
    suggestion: 'Review the previous container exit reason and memory limits.',
    tone: 'warning',
  },
  {
    id: 'configuration',
    category: 'Configuration suggestion',
    title: 'Sample API container has no memory limit',
    detail: 'The example configuration is missing a resource limit.',
    suggestion: 'Set a memory request and limit in the example container configuration.',
    tone: 'purple',
  },
]
