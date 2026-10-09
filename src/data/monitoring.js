// Synthetic time-series values and alert examples for the monitoring frontend.
const series = {
  '1h': [
    { time: '09:00', cpu: 31, memory: 48, network: 22 }, { time: '09:10', cpu: 35, memory: 49, network: 26 },
    { time: '09:20', cpu: 29, memory: 50, network: 20 }, { time: '09:30', cpu: 42, memory: 52, network: 31 },
    { time: '09:40', cpu: 39, memory: 51, network: 28 }, { time: '09:50', cpu: 47, memory: 54, network: 35 },
    { time: '10:00', cpu: 44, memory: 55, network: 29 },
  ],
  '6h': [
    { time: '04:00', cpu: 24, memory: 43, network: 18 }, { time: '05:00', cpu: 29, memory: 45, network: 21 },
    { time: '06:00', cpu: 38, memory: 47, network: 26 }, { time: '07:00', cpu: 34, memory: 49, network: 24 },
    { time: '08:00', cpu: 51, memory: 53, network: 33 }, { time: '09:00', cpu: 42, memory: 52, network: 31 },
    { time: '10:00', cpu: 44, memory: 55, network: 29 },
  ],
  '24h': [
    { time: '00:00', cpu: 21, memory: 42, network: 14 }, { time: '04:00', cpu: 26, memory: 44, network: 18 },
    { time: '08:00', cpu: 51, memory: 53, network: 33 }, { time: '12:00', cpu: 43, memory: 56, network: 29 },
    { time: '16:00', cpu: 58, memory: 61, network: 41 }, { time: '20:00', cpu: 36, memory: 54, network: 24 },
    { time: 'Now', cpu: 44, memory: 55, network: 29 },
  ],
  '7d': [
    { time: 'Mon', cpu: 32, memory: 47, network: 22 }, { time: 'Tue', cpu: 38, memory: 49, network: 25 },
    { time: 'Wed', cpu: 41, memory: 53, network: 28 }, { time: 'Thu', cpu: 36, memory: 51, network: 24 },
    { time: 'Fri', cpu: 57, memory: 60, network: 39 }, { time: 'Sat', cpu: 34, memory: 52, network: 23 },
    { time: 'Sun', cpu: 44, memory: 55, network: 29 },
  ],
}

export const SAMPLE_MONITORING_RANGES = {
  '1h': { label: 'Last hour', points: series['1h'] },
  '6h': { label: 'Last 6 hours', points: series['6h'] },
  '24h': { label: 'Last 24 hours', points: series['24h'] },
  '7d': { label: 'Last 7 days', points: series['7d'] },
}

export const SAMPLE_ALERTS = [
  { id: 'alert-001', severity: 'Critical', service: 'billing-worker', message: 'Container restart count is above the sample threshold.', time: '10:18 AM', state: 'Open' },
  { id: 'alert-002', severity: 'Warning', service: 'orbitra-api', message: 'CPU usage peaked at 82% in an illustrative interval.', time: '09:54 AM', state: 'Investigating' },
  { id: 'alert-003', severity: 'Info', service: 'console-web', message: 'Sample deployment completed and service returned to normal.', time: '09:21 AM', state: 'Resolved' },
]
