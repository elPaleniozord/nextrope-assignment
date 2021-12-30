import { Container, Navbar, Nav, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectCart } from "../../features/cart/cartSlice"

const Menu = () => {
  const {items} = useAppSelector(selectCart)

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href='/'>Logo</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/'>Książki</Nav.Link>
          <Nav.Link as={Link} to='/cart'>
            Koszyk {items.length ? <Badge bg='warning' text='dark'>{items.length}</Badge> : null}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Menu