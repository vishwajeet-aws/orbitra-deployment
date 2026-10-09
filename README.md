# Orbitra Deploy

Orbitra Deploy is a frontend-only cloud-native application deployment dashboard built with React and Vite. It demonstrates a dark SaaS workspace for projects, deployments, infrastructure, monitoring, costs, security, and AI-assisted DevOps workflows.

> **Demo only:** the app uses local mock data and simulated actions. It has no backend, database, cloud account connection, real authentication, deployment engine, Kubernetes cluster, Terraform execution, or security scanner. Cost figures, infrastructure health, notifications, security findings, and AI replies are examples—not live analysis. Never enter secrets or API keys.

## Requirements

- macOS with zsh (other operating systems can use equivalent shell commands)
- Node.js `^20.19.0` or `>=22.12.0` (required by the installed Vite version)
- npm
- Git

## Run locally

From the project folder in Terminal or the VS Code integrated terminal:

```zsh
npm ci
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available commands

```zsh
npm run dev      # Start the local development server
npm run lint     # Run ESLint across the project
npm run build    # Create the production frontend build in dist/
npm run preview  # Preview the production build locally
```

## Pages

| Page | Route | What it demonstrates |
| --- | --- | --- |
| Landing | `/` | Orbitra overview and links to the demo workspace and mock auth pages |
| Login | `/login` | Client-side validation and mock sign-in state |
| Registration | `/register` | Client-side registration form validation |
| Dashboard | `/dashboard` | Sample KPIs, deployments, projects, infrastructure, cost, and quick actions |
| Projects | `/projects` | Search, visibility filtering, creation, editing, deletion, and project details |
| Project details | `/projects/:projectId` | Sample project information and deployment history |
| Deployments | `/deployments` | Search and status/environment filters for illustrative release records |
| Deployment details | `/deployments/:deploymentId` | Sample deployment information and simulated workflow actions |
| Containers | `/containers` | Example container inventory and local simulated controls |
| Kubernetes | `/kubernetes` | Example cluster, node, pod, namespace, and resource information |
| Terraform / Infrastructure | `/infrastructure` | Example configuration and simulated plan/apply interface; Terraform is never executed |
| CI/CD Pipelines | `/pipelines` | Example pipelines, stages, runs, and workflow creation interface |
| Monitoring | `/monitoring` | Sample resource charts, service states, and filterable alerts |
| Logs | `/logs` | Searchable sample logs with severity/service filters and sample export |
| Cost Management | `/costs` | Estimated service costs, budgets, recommendations, and INR display conversion |
| Security | `/security` | Example findings, severity filters, control indicators, and remediation guidance |
| AI DevOps Assistant | `/ai-assistant` | Local keyword-based response examples and in-memory conversation history |
| Settings | `/settings` | Local profile, appearance, notification, and dashboard preferences |

Project and deployment detail routes are additional views beyond the 16 primary pages.

## Technology

- React 19 with JavaScript and functional components/hooks
- Vite 8
- Tailwind CSS 4
- React Router 7
- Lucide React icons
- Recharts
- ESLint

## Project structure

```text
src/
  components/    Shared UI, layout, and dashboard components
  contexts/      In-memory workspace data state
  data/          Clearly labeled sample records and chart data
  hooks/         Reusable UI hooks
  layouts/       Public and dashboard layouts
  pages/         Route-level screens
  services/      Mock authentication, preferences, and AI response adapter
  utils/         Small shared helpers
  App.jsx        Route definitions
  index.css      Tailwind import and global design tokens
  main.jsx       React entry point
```

## Demo behavior and privacy

- Login and registration are frontend demonstrations, not production authentication.
- Project, container, deployment, Terraform, and pipeline actions update or preview local UI state only; no real infrastructure is changed.
- The AI assistant uses `src/services/mockAiAssistant.js`. A future model should be called through a secure backend; never put model API keys in browser code.
- Settings are stored in browser local storage. Profile display name and email are demo preferences only. Passwords are not stored by the settings page.
- INR cost equivalents use a fixed illustrative conversion rate shown in the Cost Management page. The conversion is not live and is not for accounting.
- Sample datasets live under `src/data/` so they can later be replaced by API responses.

## Before connecting a backend

Keep API credentials on a trusted server, replace sample data with authenticated API responses, and review authorization, validation, error handling, and destructive-action safeguards before exposing real infrastructure operations. This repository intentionally does not implement those backend capabilities.
