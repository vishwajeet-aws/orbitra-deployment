// Illustrative security examples for the frontend demo. No scanner or cloud account is queried.
export const SAMPLE_SECURITY_FINDINGS = [
  {
    id: 'SEC-1042',
    severity: 'Critical',
    category: 'Secrets',
    title: 'Example API token appears in a sample environment file',
    resource: 'web-api / .env.example',
    detected: '18 minutes ago',
    summary: 'A demonstration token pattern is included in the sample repository fixture.',
    remediation: ['Remove the token from the example file and rotate it if it was ever real.', 'Load secrets from a managed secret store at runtime.', 'Add a repository secret scan to the pull request workflow.'],
  },
  {
    id: 'SEC-1038',
    severity: 'High',
    category: 'Container',
    title: 'Container image example uses a floating latest tag',
    resource: 'worker-image:latest',
    detected: '2 hours ago',
    summary: 'A mutable image tag makes it harder to reproduce and review releases.',
    remediation: ['Pin the example image to a reviewed version or immutable digest.', 'Rebuild from a maintained base image.', 'Record the image provenance with the build output.'],
  },
  {
    id: 'SEC-1029',
    severity: 'Medium',
    category: 'IAM',
    title: 'Sample deployment role has broader permissions than needed',
    resource: 'orbitra-demo-deploy-role',
    detected: 'Yesterday',
    summary: 'The mock policy includes wildcard actions as a teaching example.',
    remediation: ['Replace wildcard actions with the smallest required action set.', 'Scope resources to the specific application environment.', 'Review role trust relationships and session duration.'],
  },
  {
    id: 'SEC-1021',
    severity: 'Low',
    category: 'Configuration',
    title: 'Sample storage policy does not show an encryption setting',
    resource: 'artifact-store-demo',
    detected: '2 days ago',
    summary: 'The illustrative configuration leaves at-rest encryption unspecified.',
    remediation: ['Set an explicit encryption policy in the configuration example.', 'Document key ownership and rotation expectations.', 'Validate the setting in a future authorized cloud review.'],
  },
]

export const SAMPLE_SECURITY_CONTROLS = [
  { id: 'iam', name: 'IAM configuration', icon: 'iam', status: 'Review suggested', detail: 'Example deployment role contains a broad permission pattern.', score: '2 of 3 examples configured' },
  { id: 'container', name: 'Container security', icon: 'container', status: 'Needs review', detail: 'Floating tag and base image examples need pinning.', score: '1 example needs attention' },
  { id: 'secrets', name: 'Secrets management', icon: 'secrets', status: 'Needs review', detail: 'Example token pattern is shown in a fixture file.', score: 'Use a managed secret store' },
  { id: 'encryption', name: 'Encryption defaults', icon: 'encryption', status: 'Example configured', detail: 'Transport encryption is shown in the sample policy.', score: 'At-rest setting needs review' },
]
