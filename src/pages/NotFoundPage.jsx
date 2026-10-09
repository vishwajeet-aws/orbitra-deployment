import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import PlaceholderPage from '../components/common/PlaceholderPage.jsx'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <PlaceholderPage
      title="Page not found"
      description="This route does not exist. Use the links below, or return home."
    >
      <Button onClick={() => navigate('/')}>Back to landing</Button>
    </PlaceholderPage>
  )
}

export default NotFoundPage
