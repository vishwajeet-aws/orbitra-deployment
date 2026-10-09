import { useState } from 'react'
import { ArrowRight, KeyRound, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/auth/AuthShell.jsx'
import PasswordField from '../components/auth/PasswordField.jsx'
import Button from '../components/common/Button.jsx'
import Input from '../components/common/Input.jsx'
import Modal from '../components/common/Modal.jsx'
import {
  clearRememberedEmail,
  readRememberedEmail,
  requestPasswordResetDemo,
  saveRememberedEmail,
  signInDemo,
} from '../services/mockAuth.js'
import { isValidEmail } from '../utils/authValidation.js'

function LoginPage() {
  const [remembered] = useState(() => readRememberedEmail())
  const navigate = useNavigate()
  const [email, setEmail] = useState(remembered.email)
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(Boolean(remembered.email))
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [storageMessage, setStorageMessage] = useState('')
  const [forgotOpen, setForgotOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState(remembered.email)
  const [resetError, setResetError] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [resetSubmitting, setResetSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!isValidEmail(email)) nextErrors.email = 'Enter a valid email address.'
    if (!password) nextErrors.password = 'Enter your password.'

    setErrors(nextErrors)
    setSuccessMessage('')
    setStorageMessage('')
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      const result = await signInDemo({ email: email.trim() })
      setSuccessMessage(result.message)
      setPassword('')
      const saved = rememberMe
        ? saveRememberedEmail(email.trim())
        : clearRememberedEmail()
      if (!saved && rememberMe) {
        setStorageMessage('Your browser blocked email remembering. You can still continue with the demo.')
      }
    } catch {
      setErrors({ form: 'The demo sign-in could not finish. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResetSubmit(event) {
    event.preventDefault()
    setResetError('')
    setResetMessage('')
    if (!resetEmail.trim()) {
      setResetError('Enter the email address you use for this demo.')
      return
    }
    if (!isValidEmail(resetEmail)) {
      setResetError('Enter a valid email address.')
      return
    }

    setResetSubmitting(true)
    try {
      const result = await requestPasswordResetDemo({ email: resetEmail.trim() })
      setResetMessage(result.message)
    } catch {
      setResetError('The demo request could not finish. Please try again.')
    } finally {
      setResetSubmitting(false)
    }
  }

  return (
    <>
      <AuthShell
        eyebrow="Demo sign in"
        title="Welcome back."
        description="Sign in to explore the Orbitra workspace. This frontend uses mock authentication and accepts any valid email with a non-empty password."
        footer={(
          <p className="text-center text-sm text-orbitra-muted">
            New to Orbitra?{' '}
            <Link to="/register" className="font-medium text-accent-cyan hover:text-cyan-300">
              Create a demo account
            </Link>
          </p>
        )}
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-orbitra-text">Sign in</h2>
          <p className="mt-1 text-sm text-orbitra-muted">Use any email and password to preview the sign-in state.</p>
        </div>

        <div className="mb-5 rounded-lg border border-accent-orange/20 bg-accent-orange/5 p-3 text-xs leading-5 text-orbitra-muted">
          Demo only: this form does not authenticate a real account. Passwords stay in the form and are never saved.
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <Input
            id="login-email"
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={errors.email}
            required
          />

          <PasswordField
            id="login-password"
            name="password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter any demo password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
            required
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-orbitra-muted">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-orbitra-border bg-orbitra-900 accent-accent-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
              />
              Remember my email
            </label>
            <button
              type="button"
              className="text-sm font-medium text-accent-cyan hover:text-cyan-300"
              onClick={() => {
                setResetEmail(email)
                setResetMessage('')
                setResetError('')
                setForgotOpen(true)
              }}
            >
              Forgot password?
            </button>
          </div>

          {errors.form ? <p role="alert" className="text-sm text-red-400">{errors.form}</p> : null}
          {successMessage ? (
            <div role="status" className="rounded-lg border border-accent-green/20 bg-accent-green/5 p-3 text-sm text-accent-green">
              {successMessage}
            </div>
          ) : null}
          {storageMessage ? <p role="status" className="text-xs text-orbitra-muted">{storageMessage}</p> : null}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Signing in to demo…' : 'Sign in'}
            {!submitting ? <ArrowRight size={16} aria-hidden="true" /> : null}
          </Button>

          {successMessage ? (
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => navigate('/dashboard')}
            >
              Continue to dashboard
            </Button>
          ) : null}
        </form>

        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-orbitra-muted">
          <Mail size={14} aria-hidden="true" />
          No real account lookup or email verification occurs.
        </p>
      </AuthShell>

      <Modal
        open={forgotOpen}
        title="Reset password"
        onClose={() => setForgotOpen(false)}
      >
        <p className="mb-4 text-sm leading-6 text-orbitra-muted">
          Try the password reset interaction. This demo does not send email or change a password.
        </p>
        {resetMessage ? (
          <div role="status" className="rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 p-3 text-sm text-orbitra-text">
            {resetMessage}
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleResetSubmit} noValidate>
            <Input
              id="reset-email"
              label="Email address"
              type="email"
              autoComplete="email"
              value={resetEmail}
              onChange={(event) => setResetEmail(event.target.value)}
              error={resetError}
              required
            />
            <Button type="submit" className="w-full" disabled={resetSubmitting}>
              <KeyRound size={16} aria-hidden="true" />
              {resetSubmitting ? 'Preparing demo response…' : 'Request demo reset'}
            </Button>
          </form>
        )}
      </Modal>
    </>
  )
}

export default LoginPage
