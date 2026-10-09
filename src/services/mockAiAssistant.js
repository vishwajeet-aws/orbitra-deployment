// Frontend-only response adapter. Replace with a secure backend request when a real model is connected.
const DEMO_DELAY_MS = 700

const responses = [
  {
    match: /deploy|roll ?out|release|deployment/i,
    topic: 'Deployment troubleshooting example',
    answer: 'I cannot see your deployment system, but a safe first pass is to: (1) compare the current release with the last healthy version, (2) check rollout events and readiness/liveness probe failures, (3) inspect the affected service logs around the first failing timestamp, and (4) verify environment variables and image tags. Avoid retrying repeatedly until you understand whether the change is safe to roll back.',
  },
  {
    match: /log|502|error|exception|trace/i,
    topic: 'Log explanation example',
    answer: 'For a 502 pattern, start by correlating the proxy and application timestamps, then check whether upstream targets were healthy and accepting connections. Compare error frequency before and after the last release, and inspect a small redacted sample around one request ID. Check timeout and connection-pool settings before changing them. This is general guidance; no logs were read here.',
  },
  {
    match: /kubernetes|pod|crashloop|kubectl|namespace/i,
    topic: 'Kubernetes troubleshooting example',
    answer: 'A safe CrashLoopBackOff workflow is: inspect pod events and previous-container logs, verify the command and required configuration, check readiness/liveness probes, then compare resource requests with observed limits. Suggested read-only commands include `kubectl describe pod <name> -n <namespace>` and `kubectl logs <name> -n <namespace> --previous`. These commands are suggestions only; Orbitra did not connect to a cluster or run them.',
  },
  {
    match: /terraform|plan|infrastructure as code/i,
    topic: 'Terraform explanation example',
    answer: 'Before applying a Terraform plan, review every create, update, and destroy action; confirm the workspace and target account; inspect provider and variable changes; and look for replacements that could cause downtime or data loss. Save and peer-review the plan where your team workflow supports it. Orbitra will not execute Terraform from this interface.',
  },
  {
    match: /cost|bill|spend|saving|optimi[sz]/i,
    topic: 'Cost optimization example',
    answer: 'Start with the largest cost categories, then compare actual utilization with requested capacity. Common review areas include idle non-production schedules, unattached storage, retention policies, data transfer, and oversized databases. Treat savings as hypotheses and validate against your provider’s billing data. The cost figures in this project are sample estimates only.',
  },
  {
    match: /health|status|infrastructure|service/i,
    topic: 'Infrastructure health summary example',
    answer: 'The demo dashboard shows illustrative service health indicators and sample resource metrics. A useful real-world summary would combine availability, latency, error rates, saturation, and recent changes, then link each alert to its source. I have not queried any cloud account or monitoring service, so I cannot confirm the actual health of your infrastructure.',
  },
]

export async function askMockAssistant(message) {
  const prompt = message.trim()
  if (!prompt) throw new Error('Enter a question before sending it.')

  await new Promise((resolve) => window.setTimeout(resolve, DEMO_DELAY_MS))
  // Type [demo-error] in a prompt to preview the chat's retry state.
  if (prompt.toLowerCase().includes('[demo-error]')) throw new Error('The demonstration assistant is temporarily unavailable. Please try again.')

  const response = responses.find((item) => item.match.test(prompt))
  return {
    id: `mock-${Date.now()}`,
    role: 'assistant',
    topic: response?.topic || 'DevOps guidance example',
    content: response?.answer || 'I can help with deployment troubleshooting, log explanations, Kubernetes workflows, Terraform plan reviews, cost ideas, and infrastructure-health concepts. Share a little more context (with secrets and customer data removed) and I will suggest a safe next step. My response is a demonstration and is not based on live system access.',
    createdAt: new Date().toISOString(),
    mock: true,
  }
}
