import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Input from '../common/Input.jsx'

function PasswordField({ id, label, error, hint, ...inputProps }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <Input
        id={id}
        label={label}
        type={visible ? 'text' : 'password'}
        error={error}
        hint={hint}
        className="pr-11"
        {...inputProps}
      />
      <button
        type="button"
        className="absolute top-[31px] right-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-orbitra-muted hover:bg-orbitra-800 hover:text-orbitra-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue"
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        onClick={() => setVisible((isVisible) => !isVisible)}
      >
        {visible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
      </button>
    </div>
  )
}

export default PasswordField
