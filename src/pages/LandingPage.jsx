import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/common/Badge.jsx'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import Input from '../components/common/Input.jsx'
import Modal from '../components/common/Modal.jsx'
import PlaceholderPage from '../components/common/PlaceholderPage.jsx'
import Spinner from '../components/common/Spinner.jsx'

function LandingPage() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [sampleName, setSampleName] = useState('')

  return (
    <PlaceholderPage
      title="Landing"
      description="Public home page. The full marketing layout is built in Phase 5. This screen is here to prove routing, inputs, and modals work."
    >
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
        <Button variant="secondary" onClick={() => navigate('/register')}>
          Go to Register
        </Button>
        <Button variant="ghost" onClick={() => setModalOpen(true)}>
          Open sample modal
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <EmptyState
          title="No projects yet"
          description="Empty states will appear on list pages when there is nothing to show."
          action={<Badge tone="cyan">Sample empty state</Badge>}
        />
        <div className="flex items-center rounded-xl border border-orbitra-border bg-orbitra-850 px-6">
          <Spinner label="Sample loading state" />
        </div>
      </div>

      <Modal
        open={modalOpen}
        title="Sample project name"
        onClose={() => setModalOpen(false)}
      >
        <Input
          id="sample-project-name"
          label="Project name"
          placeholder="orbitra-web"
          value={sampleName}
          onChange={(event) => setSampleName(event.target.value)}
          hint="This does not create a real project. It only tests the Input component."
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setModalOpen(false)}>Save sample</Button>
        </div>
      </Modal>
    </PlaceholderPage>
  )
}

export default LandingPage
