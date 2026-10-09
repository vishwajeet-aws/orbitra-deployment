// Demo adapter only. It never receives, stores, or sends a password.
function waitForDemoResponse() {
  return new Promise((resolve) => window.setTimeout(resolve, 350))
}

export async function signInDemo({ email }) {
  await waitForDemoResponse()
  return {
    success: true,
    user: { email },
    message: 'Demo sign-in accepted. No real account was checked.',
  }
}

export async function registerDemo({ name, email }) {
  await waitForDemoResponse()
  return {
    success: true,
    user: { name, email },
    message: 'Your form is valid. This demo does not create or save an account.',
  }
}

export async function requestPasswordResetDemo({ email }) {
  await waitForDemoResponse()
  return {
    success: true,
    message: `Password reset is a demonstration only. No email was sent to ${email}.`,
  }
}

const REMEMBERED_EMAIL_KEY = 'orbitra-demo-remembered-email'

export function readRememberedEmail() {
  try {
    return { email: window.localStorage.getItem(REMEMBERED_EMAIL_KEY) || '', available: true }
  } catch {
    return { email: '', available: false }
  }
}

export function saveRememberedEmail(email) {
  try {
    window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email)
    return true
  } catch {
    return false
  }
}

export function clearRememberedEmail() {
  try {
    window.localStorage.removeItem(REMEMBERED_EMAIL_KEY)
    return true
  } catch {
    return false
  }
}
