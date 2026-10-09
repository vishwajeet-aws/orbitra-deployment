// Illustrative container inventory. These records are not connected to a Docker daemon.
export const SAMPLE_CONTAINERS = [
  { id: 'ctr-01', name: 'orbitra-api', image: 'orbitra/api:1.8.2', status: 'Running', cpu: 42, memory: 61, ports: '8080:8080', host: 'worker-a1', created: '2026-10-10T08:20:00+05:30' },
  { id: 'ctr-02', name: 'console-web', image: 'orbitra/console:2.4.0', status: 'Running', cpu: 28, memory: 46, ports: '3000:3000', host: 'worker-a2', created: '2026-10-10T07:52:00+05:30' },
  { id: 'ctr-03', name: 'billing-worker', image: 'orbitra/billing:0.9.7', status: 'Restarting', cpu: 84, memory: 88, ports: '—', host: 'worker-b1', created: '2026-10-10T06:38:00+05:30' },
  { id: 'ctr-04', name: 'redis-cache', image: 'redis:7.4-alpine', status: 'Running', cpu: 16, memory: 38, ports: '6379:6379', host: 'worker-a1', created: '2026-10-09T14:12:00+05:30' },
  { id: 'ctr-05', name: 'docs-preview', image: 'orbitra/docs:3.2.1', status: 'Stopped', cpu: 0, memory: 0, ports: '—', host: 'worker-b2', created: '2026-10-08T10:02:00+05:30' },
]
