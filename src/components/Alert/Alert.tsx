import { useEffect, useState } from "react"
import { Alert, Button, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const AlertPopup: React.FC<{status: string | undefined}> = ({status}) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    status !== undefined && setShow(true)
  }, [status])

  if(show) {
    return (
      <Alert className="d-flex flex-column align-items-center" variant={status === 'success' ? 'success' : 'danger'} >
        <Alert.Heading>{status === 'success' ? 'Zamówienie Przyjęte' : 'Błąd zamówienia'}</Alert.Heading>
        {status === 'success' ?
        (<>
          <p>Twoje zamówienie zostało przyjęte do realizacji.</p>
          <Nav.Link as={Link} to='/'><Button>POWRÓT DO SKLEPU</Button></Nav.Link>
        </>
        ) : (
          <>
            <p>{status}</p>
            <Button onClick={()=>setShow(false)}>ZAMKNIJ</Button>
          </>
        )}
      </Alert>
    )
  } else return null
}

export default AlertPopup