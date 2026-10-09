import { useEffect } from 'react'
import { X } from 'lucide-react'
import Button from './Button.jsx'
import { cn } from '../../utils/cn.js'

function Modal({
  open,
  title,
  children,
  onClose,
  className = '',
}) {
  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close dialog overlay"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="orbitra-modal-title"
        className={cn(
          'relative z-10 w-full max-w-lg rounded-2xl border border-orbitra-border bg-orbitra-850 p-6 shadow-2xl',
          className,
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="orbitra-modal-title" className="text-lg font-semibold text-orbitra-text">
            {title}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close dialog">
            <X size={16} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
