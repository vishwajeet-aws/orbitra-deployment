// Example log lines for local UI behavior only; not sourced from running services.
export const SAMPLE_LOGS = [
  { id: 'log-001', timestamp: '2026-10-10T10:42:18+05:30', severity: 'INFO', service: 'orbitra-api', message: 'GET /v1/projects 200 42ms request_id=req_7fd83' },
  { id: 'log-002', timestamp: '2026-10-10T10:41:52+05:30', severity: 'WARN', service: 'billing-worker', message: 'Retry attempt 4 scheduled after simulated upstream timeout' },
  { id: 'log-003', timestamp: '2026-10-10T10:40:09+05:30', severity: 'ERROR', service: 'billing-worker', message: 'Sample invoice job failed validation: missing currency field' },
  { id: 'log-004', timestamp: '2026-10-10T10:38:41+05:30', severity: 'DEBUG', service: 'console-web', message: 'Hydration completed for route /projects' },
  { id: 'log-005', timestamp: '2026-10-10T10:36:03+05:30', severity: 'INFO', service: 'console-web', message: 'User session mock refreshed successfully' },
  { id: 'log-006', timestamp: '2026-10-10T10:33:26+05:30', severity: 'FATAL', service: 'data-sync', message: 'Example worker could not reach configured sample endpoint' },
  { id: 'log-007', timestamp: '2026-10-10T10:30:17+05:30', severity: 'WARN', service: 'orbitra-api', message: 'Response latency reached 840ms in sample request trace' },
  { id: 'log-008', timestamp: '2026-10-10T10:27:44+05:30', severity: 'INFO', service: 'data-sync', message: 'Sample sync batch completed: 128 records processed' },
  { id: 'log-009', timestamp: '2026-10-10T10:24:30+05:30', severity: 'ERROR', service: 'orbitra-api', message: 'Example dependency health check returned unavailable' },
  { id: 'log-010', timestamp: '2026-10-10T10:21:11+05:30', severity: 'DEBUG', service: 'billing-worker', message: 'Dequeued sample message id=msg_14c9' },
]
