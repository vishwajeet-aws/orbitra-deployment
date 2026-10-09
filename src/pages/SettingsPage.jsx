import { useState } from 'react'
import { CheckCircle2, LayoutDashboard, Moon, Palette, RotateCcw, Save, Sun } from 'lucide-react'
import Badge from '../components/common/Badge.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import Input from '../components/common/Input.jsx'
import Modal from '../components/common/Modal.jsx'
import { DEFAULT_PREFERENCES, readPreferences, savePreferences } from '../services/preferences.js'

const themes = [
  { id: 'dark', name: 'Dark', description: 'Orbitra’s dark workspace', icon: Moon },
  { id: 'light', name: 'Light', description: 'A bright, high-contrast workspace', icon: Sun },
  { id: 'system', name: 'System', description: 'Follow this device preference', icon: Palette },
]

function SettingsPage() {
  const [settings, setSettings] = useState(() => readPreferences())
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [resetOpen, setResetOpen] = useState(false)

  const updateSection = (section, key, value) => {
    setSettings((current) => ({ ...current, [section]: { ...current[section], [key]: value } }))
    setStatus('')
  }

  const save = (event) => {
    event.preventDefault()
    const nextErrors = {}
    const name = settings.profile.name.trim()
    const email = settings.profile.email.trim()
    if (name.length < 2) nextErrors.name = 'Enter a name with at least 2 characters.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email address.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) { setStatus('Fix the highlighted fields before saving.'); return }

    const nextSettings = { ...settings, profile: { name, email } }
    setSettings(nextSettings)
    const saved = savePreferences(nextSettings)
    setStatus(saved ? 'Preferences saved on this device.' : 'Preferences applied for this session, but browser storage is unavailable.')
  }

  const reset = () => {
    const defaults = structuredClone(DEFAULT_PREFERENCES)
    setSettings(defaults)
    setErrors({})
    const saved = savePreferences(defaults)
    setStatus(saved ? 'Preferences reset to the Orbitra demo defaults.' : 'Defaults applied for this session, but browser storage is unavailable.')
    setResetOpen(false)
  }

  return <div className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-accent-cyan">Workspace</p><h1 className="mt-1 text-2xl font-semibold text-orbitra-text">Settings</h1><p className="mt-2 max-w-2xl text-sm text-orbitra-muted">Manage your local profile, appearance, notification preferences, and dashboard layout.</p></div><Badge tone="orange">Saved on this device</Badge></header>

    {status && <div role={Object.keys(errors).length ? 'alert' : 'status'} className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${Object.keys(errors).length ? 'border-red-500/20 bg-red-500/5 text-red-300' : 'border-accent-green/20 bg-accent-green/5 text-accent-green'}`}><CheckCircle2 size={16}/>{status}</div>}

    <form onSubmit={save} className="space-y-5" noValidate>
      <Card title="Profile settings" description="These display details are stored in your browser only. This is not an authenticated account profile.">
        <div className="grid gap-4 sm:grid-cols-2"><Input id="settings-name" label="Display name" autoComplete="name" value={settings.profile.name} onChange={(event) => { updateSection('profile', 'name', event.target.value); setErrors((items) => ({ ...items, name: '' })) }} error={errors.name}/><Input id="settings-email" label="Email address" type="email" autoComplete="email" value={settings.profile.email} onChange={(event) => { updateSection('profile', 'email', event.target.value); setErrors((items) => ({ ...items, email: '' })) }} error={errors.email}/></div>
        <p className="mt-3 text-xs text-orbitra-muted">No passwords or authentication tokens are stored by this settings page.</p>
      </Card>

      <Card title="Appearance" description="Preview a theme after saving. Reduced motion and density settings are applied to the workspace UI.">
        <fieldset><legend className="mb-3 text-sm font-medium text-orbitra-text">Theme</legend><div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Theme selection">{themes.map((theme) => { const Icon = theme.icon; const selected = settings.appearance.theme === theme.id; return <button key={theme.id} type="button" role="radio" aria-checked={selected} onClick={() => updateSection('appearance', 'theme', theme.id)} className={`rounded-xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue ${selected ? 'border-accent-blue/60 bg-accent-blue/5' : 'border-orbitra-border bg-orbitra-900/40 hover:bg-orbitra-900'}`}><span className="flex items-center justify-between"><Icon size={17} className={selected ? 'text-accent-cyan' : 'text-orbitra-muted'}/><span className={`h-4 w-4 rounded-full border ${selected ? 'border-4 border-accent-blue' : 'border-orbitra-500'}`}/></span><span className="mt-3 block text-sm font-medium text-orbitra-text">{theme.name}</span><span className="mt-1 block text-xs text-orbitra-muted">{theme.description}</span></button> })}</div></fieldset>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="block"><span className="mb-1.5 block text-sm font-medium text-orbitra-text">Workspace density</span><select aria-label="Workspace density" value={settings.appearance.density} onChange={(event) => updateSection('appearance', 'density', event.target.value)} className="w-full rounded-lg border border-orbitra-border bg-orbitra-900 px-3 py-2.5 text-sm text-orbitra-text outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/70"><option value="comfortable">Comfortable</option><option value="compact">Compact</option></select><span className="mt-1 block text-xs text-orbitra-muted">Compact density slightly reduces spacing across the interface.</span></label><div className="flex items-center rounded-xl border border-orbitra-border bg-orbitra-900/40 p-4"><Toggle checked={settings.appearance.reduceMotion} onChange={(value) => updateSection('appearance', 'reduceMotion', value)} label="Reduce motion" description="Limit transitions and animations."/></div></div>
      </Card>

      <Card title="Notification preferences" description="Choose which demo notification categories you would like Orbitra to show. These settings do not send messages.">
        <div className="divide-y divide-orbitra-border">{[
          ['deploymentFailures', 'Deployment failures', 'Show a preference for failed deployment alerts.'],
          ['costBudgets', 'Cost and budget notices', 'Show a preference for sample budget threshold alerts.'],
          ['securityFindings', 'Security findings', 'Show a preference for example finding notifications.'],
          ['weeklySummary', 'Weekly workspace summary', 'Show a preference for a weekly overview.'],
        ].map(([key, label, description]) => <div key={key} className="py-3 first:pt-0 last:pb-0"><Toggle checked={settings.notifications[key]} onChange={(value) => updateSection('notifications', key, value)} label={label} description={description}/></div>)}</div>
      </Card>

      <Card title="Dashboard preferences" description="Choose which optional sections are visible on the dashboard page.">
        <div className="divide-y divide-orbitra-border">{[
          ['welcome', 'Welcome and date card', 'Show your greeting and the current date.'],
          ['costOverview', 'Cloud cost overview', 'Show the sample cost chart on the dashboard.'],
          ['assistantCard', 'AI DevOps assistant card', 'Show the issues preview and assistant shortcut.'],
        ].map(([key, label, description]) => <div key={key} className="py-3 first:pt-0 last:pb-0"><Toggle checked={settings.dashboard[key]} onChange={(value) => updateSection('dashboard', key, value)} label={label} description={description}/></div>)}</div>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-orbitra-border bg-orbitra-900/50 p-3 text-xs leading-5 text-orbitra-muted"><LayoutDashboard size={15} className="mt-0.5 shrink-0 text-accent-cyan"/>The dashboard section choices take effect after you save and open the Dashboard page.</div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-orbitra-muted">Local demo preferences only · no backend account settings are changed.</p><div className="flex gap-2"><Button type="button" variant="secondary" onClick={() => setResetOpen(true)}><RotateCcw size={15}/>Reset defaults</Button><Button type="submit"><Save size={15}/>Save preferences</Button></div></div>
    </form>

    <Modal open={resetOpen} title="Reset local preferences?" onClose={() => setResetOpen(false)}><p className="text-sm leading-6 text-orbitra-muted">This restores the sample profile, dark theme, and default notification and dashboard options on this device.</p><div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={() => setResetOpen(false)}>Keep current settings</Button><Button variant="danger" onClick={reset}><RotateCcw size={15}/>Reset preferences</Button></div></Modal>
  </div>
}

function Toggle({ checked, onChange, label, description }) {
  return <div className="flex items-center justify-between gap-4"><span className="min-w-0"><span className="block text-sm font-medium text-orbitra-text">{label}</span><span className="mt-1 block text-xs leading-5 text-orbitra-muted">{description}</span></span><button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue ${checked ? 'bg-accent-blue' : 'bg-orbitra-600'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}/></button></div>
}

export default SettingsPage
