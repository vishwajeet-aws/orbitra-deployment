// Illustrative readings only; no cloud, cluster, or service health checks run here.
export const SAMPLE_RESOURCE_USAGE = [
  { id: 'cpu', label: 'CPU', value: 42, detail: 'Average across sample services', color: 'cyan' },
  { id: 'memory', label: 'Memory', value: 68, detail: 'Of simulated available memory', color: 'purple' },
  { id: 'storage', label: 'Storage', value: 54, detail: 'Of sample allocated storage', color: 'blue' },
  { id: 'network', label: 'Network', value: 31, detail: 'Of sample throughput capacity', color: 'green' },
]

export const SAMPLE_SERVICE_HEALTH = [
  { id: 'aws', name: 'AWS', detail: 'Demo connection', status: 'Healthy', tone: 'success' },
  { id: 'docker', name: 'Docker', detail: 'Demo runtime', status: 'Healthy', tone: 'success' },
  { id: 'kubernetes', name: 'Kubernetes', detail: 'Demo cluster', status: 'Healthy', tone: 'success' },
  { id: 'terraform', name: 'Terraform', detail: 'Configuration ready', status: 'Ready', tone: 'cyan' },
  { id: 'database', name: 'Database', detail: 'Sample service', status: 'Healthy', tone: 'success' },
  { id: 'api', name: 'API service', detail: 'Sample latency elevated', status: 'Attention', tone: 'warning' },
]
