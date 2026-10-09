// Example infrastructure inventory and Terraform text. Never executed by the frontend.
export const SAMPLE_INFRASTRUCTURE = [
  { id: 'vpc-main', name: 'orbitra-demo-vpc', type: 'Virtual network', provider: 'AWS', status: 'Healthy', region: 'us-west-2' },
  { id: 'cluster-apps', name: 'orbitra-demo-cluster', type: 'Kubernetes cluster', provider: 'AWS EKS', status: 'Healthy', region: 'us-west-2' },
  { id: 'db-primary', name: 'orbitra-demo-db', type: 'PostgreSQL database', provider: 'AWS RDS', status: 'Attention', region: 'us-west-2' },
  { id: 'bucket-assets', name: 'orbitra-demo-assets', type: 'Object storage', provider: 'AWS S3', status: 'Healthy', region: 'us-west-2' },
]

export const SAMPLE_TERRAFORM = `# Illustrative configuration only — never executed by Orbitra's frontend\nterraform {\n  required_version = ">= 1.6.0"\n\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"\n      version = "~> 5.0"\n    }\n  }\n}\n\nprovider "aws" {\n  region = var.region\n}\n\nresource "aws_s3_bucket" "assets" {\n  bucket = "orbitra-demo-assets"\n\n  tags = {\n    Environment = "demo"\n    ManagedBy   = "terraform-example"\n  }\n}`

export const SAMPLE_PLAN_OUTPUT = [
  { action: 'add', address: 'aws_s3_bucket.logs', description: 'Create a sample log archive bucket' },
  { action: 'change', address: 'aws_eks_node_group.workers', description: 'Adjust illustrative worker group capacity' },
  { action: 'destroy', address: 'aws_db_instance.legacy', description: 'Remove a retired example database resource' },
]
