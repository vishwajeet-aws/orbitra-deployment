// Sample cluster inventory for the frontend demo; no Kubernetes cluster is queried.
export const SAMPLE_CLUSTER = {
  name: 'orbitra-demo-cluster',
  region: 'us-west-2',
  version: 'v1.31.2',
  provider: 'AWS EKS · illustrative',
  nodes: [
    { name: 'node-a1', zone: 'us-west-2a', status: 'Ready', cpu: 43, memory: 58, pods: 12 },
    { name: 'node-a2', zone: 'us-west-2b', status: 'Ready', cpu: 67, memory: 72, pods: 15 },
    { name: 'node-b1', zone: 'us-west-2c', status: 'Ready', cpu: 31, memory: 49, pods: 9 },
  ],
  pods: [
    { name: 'orbitra-api-6fd8c7f9b4-q2k4p', namespace: 'production', status: 'Running', restarts: 0, node: 'node-a1', age: '2d 4h' },
    { name: 'orbitra-api-6fd8c7f9b4-r9w7x', namespace: 'production', status: 'Running', restarts: 0, node: 'node-a2', age: '2d 4h' },
    { name: 'console-web-7b89479c55-v8l2j', namespace: 'production', status: 'Running', restarts: 1, node: 'node-a2', age: '1d 8h' },
    { name: 'billing-worker-5dbbc64b4f-mk9c2', namespace: 'production', status: 'Pending', restarts: 0, node: '—', age: '3m' },
    { name: 'metrics-agent-28401', namespace: 'observability', status: 'Running', restarts: 0, node: 'node-b1', age: '6d 2h' },
    { name: 'cache-0', namespace: 'data', status: 'Running', restarts: 2, node: 'node-a1', age: '3d 1h' },
  ],
  namespaces: [
    { name: 'production', workloads: 8, pods: 4, status: 'Active' },
    { name: 'observability', workloads: 5, pods: 1, status: 'Active' },
    { name: 'data', workloads: 3, pods: 1, status: 'Active' },
    { name: 'staging', workloads: 2, pods: 0, status: 'Active' },
  ],
}
