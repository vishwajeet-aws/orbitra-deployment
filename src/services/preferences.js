import { SAMPLE_CURRENT_USER } from '../data/currentUser.js'

export const PREFERENCES_STORAGE_KEY = 'orbitra-local-preferences'

export const DEFAULT_PREFERENCES = {
  profile: { name: SAMPLE_CURRENT_USER.name, email: SAMPLE_CURRENT_USER.email },
  appearance: { theme: 'dark', density: 'comfortable', reduceMotion: false },
  notifications: { deploymentFailures: true, costBudgets: true, securityFindings: true, weeklySummary: false },
  dashboard: { welcome: true, costOverview: true, assistantCard: true },
}

export function readPreferences() {
  try {
    const stored = window.localStorage.getItem(PREFERENCES_STORAGE_KEY)
    if (!stored) return structuredClone(DEFAULT_PREFERENCES)
    const parsed = JSON.parse(stored)
    return {
      profile: { ...DEFAULT_PREFERENCES.profile, ...parsed.profile },
      appearance: { ...DEFAULT_PREFERENCES.appearance, ...parsed.appearance },
      notifications: { ...DEFAULT_PREFERENCES.notifications, ...parsed.notifications },
      dashboard: { ...DEFAULT_PREFERENCES.dashboard, ...parsed.dashboard },
    }
  } catch {
    return structuredClone(DEFAULT_PREFERENCES)
  }
}

export function savePreferences(preferences) {
  try {
    window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences))
    applyPreferences(preferences)
    window.dispatchEvent(new CustomEvent('orbitra:preferences-changed', { detail: preferences }))
    return true
  } catch {
    applyPreferences(preferences)
    window.dispatchEvent(new CustomEvent('orbitra:preferences-changed', { detail: preferences }))
    return false
  }
}

export function applyPreferences(preferences) {
  if (typeof document === 'undefined') return
  const appearance = preferences.appearance || DEFAULT_PREFERENCES.appearance
  const prefersLight = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches
  const theme = appearance.theme === 'system' ? (prefersLight ? 'light' : 'dark') : appearance.theme
  document.documentElement.dataset.orbitraTheme = theme
  document.documentElement.dataset.density = appearance.density || 'comfortable'
  document.documentElement.dataset.reduceMotion = String(Boolean(appearance.reduceMotion))
}
