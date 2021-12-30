import { Accordion, Alert, Button, Card, Col, Container, Nav, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { decrementAmount, incrementAmount, removeProduct, selectCart } from "../../features/cart/cartSlice"
import deleteIcon from '../../deleteIcon.svg';

const Cart = () => {
  const cartState = useAppSelector(selectCart)
  const dispatch = useAppDispatch()

  const itemList = cartState.items.map(item => (
    <Card key={`cart-item-${item.id}`}>
      <Card.Header >
        <Row>
          <Col sm={9}>{item.title}</Col>
          <Col sm={3} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Button style={{width:'31px', height:'31px', margin: '5px'}} size='sm' onClick={() => dispatch(incrementAmount(item.id))}>+</Button>
            {item.amount}
            <Button style={{width:'31px', height:'31px', margin: '5px'}} size='sm' onClick={() => dispatch(decrementAmount(item.id))}>-</Button>
            <Button style={{width:'31px', height:'31px', margin: '5px'}} size='sm' onClick={() => dispatch(removeProduct(item.id))} variant='danger'><img src={deleteIcon} alt="delete" /></Button>
          </Col>
        </Row>
      </Card.Header>
      
      <Accordion.Collapse eventKey='0'>
        <Card.Body>
        <Card.Subtitle>{item.author}</Card.Subtitle>
        <Card.Text>Liczba stron: {item.pages}</Card.Text>
        <Card.Text>Cena: {item.price.toString().replace(/\d\d$/,".$&")}zł</Card.Text>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  ))
  return (
    <Container>
      <h2>Koszyk</h2>
      {itemList.length > 0 ? (<Accordion>{itemList}</Accordion>) : <Alert>Twój koszyk jest pusty</Alert>}

      <div className="d-flex justify-content-between align-items-center">
        <h3>Wartość zamówienia: {cartState.total.toString().replace(/\d\d$/,".$&")}zł</h3>
        <Nav.Link as={Link} to='/checkout' disabled={itemList.length < 1}><Button disabled={itemList.length < 1}>DALEJ</Button></Nav.Link>
      </div>
      
    </Container>
  )
}

export default Cart