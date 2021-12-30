import { Button, Container } from "react-bootstrap"

const FourOhFour = () => {
  return (
    <Container>
      <h1>404</h1>
      <h2>Strona nie została odnaleziona</h2>
      <Button href='/'>Powrót na stronę główną</Button>
    </Container>
  )
}

export default FourOhFour