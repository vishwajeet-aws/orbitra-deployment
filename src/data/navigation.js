import {
  Activity,
  Box,
  Boxes,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  MessageSquareText,
  Rocket,
  ScrollText,
  Settings,
  Shield,
  Workflow,
  Wallet,
} from 'lucide-react'

export const publicNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
]

export const appNavItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', path: '/projects', icon: FolderKanban },
  { label: 'Deployments', path: '/deployments', icon: Rocket },
  { label: 'Containers', path: '/containers', icon: Box },
  { label: 'Kubernetes', path: '/kubernetes', icon: Boxes },
  { label: 'Terraform / Infrastructure', path: '/infrastructure', icon: ClipboardList },
  { label: 'CI/CD Pipelines', path: '/pipelines', icon: Workflow },
  { label: 'Monitoring', path: '/monitoring', icon: Activity },
  { label: 'Logs', path: '/logs', icon: ScrollText },
  { label: 'Cost Management', path: '/costs', icon: Wallet },
  { label: 'Security', path: '/security', icon: Shield },
  { label: 'AI DevOps Assistant', path: '/ai-assistant', icon: MessageSquareText },
  { label: 'Settings', path: '/settings', icon: Settings },
]
