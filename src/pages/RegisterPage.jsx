import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthShell from '../components/auth/AuthShell.jsx'
import PasswordField from '../components/auth/PasswordField.jsx'
import Button from '../components/common/Button.jsx'
import Input from '../components/common/Input.jsx'
import { registerDemo } from '../services/mockAuth.js'
import { isValidEmail } from '../utils/authValidation.js'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (name.trim().length < 2) nextErrors.name = 'Enter your name (at least 2 characters).'
    if (!email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!isValidEmail(email)) nextErrors.email = 'Enter a valid email address.'
    if (password.length < 8) nextErrors.password = 'Use at least 8 characters.'
    else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      nextErrors.password = 'Include at least one letter and one number.'
    }
    if (!confirmPassword) nextErrors.confirmPassword = 'Confirm your password.'
    else if (confirmPassword !== password) nextErrors.confirmPassword = 'Passwords do not match.'

    setErrors(nextErrors)
    setSuccessMessage('')
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      const result = await registerDemo({ name: name.trim(), email: email.trim() })
      setSuccessMessage(result.message)
      setPassword('')
      setConfirmPassword('')
    } catch {
      setErrors({ form: 'The demo registration could not finish. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Create a demo profile"
      title="Make room for better cloud workflows."
      description="Set up a local form preview to explore Orbitra. The registration is not sent to a server and will not create an account."
      footer={(
        <p className="text-center text-sm text-orbitra-muted">
          Already have a demo profile?{' '}
          <Link to="/login" className="font-medium text-accent-cyan hover:text-cyan-300">
            Sign in
          </Link>
        </p>
      )}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-orbitra-text">Create your profile</h2>
        <p className="mt-1 text-sm text-orbitra-muted">All fields are validated in this browser demo.</p>
      </div>

      <div className="mb-5 rounded-lg border border-accent-orange/20 bg-accent-orange/5 p-3 text-xs leading-5 text-orbitra-muted">
        Demo only: no account is created, and passwords are cleared after successful form validation.
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Input
          id="register-name"
          name="name"
          label="Name"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
          required
        />
        <Input
          id="register-email"
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
          id="register-password"
          name="password"
          label="Password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
          hint="Use 8 or more characters, including a letter and a number."
          required
        />
        <PasswordField
          id="register-confirm-password"
          name="confirmPassword"
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Enter the password again"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={errors.confirmPassword}
          required
        />

        {errors.form ? <p role="alert" className="text-sm text-red-400">{errors.form}</p> : null}
        {successMessage ? (
          <div role="status" className="rounded-lg border border-accent-green/20 bg-accent-green/5 p-3 text-sm leading-5 text-accent-green">
            {successMessage}
          </div>
        ) : null}

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Checking demo form…' : 'Create demo profile'}
          {!submitting ? <ArrowRight size={16} aria-hidden="true" /> : null}
        </Button>
      </form>
    </AuthShell>
  )
}

export default RegisterPage
