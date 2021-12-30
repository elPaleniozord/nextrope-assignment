import { SyntheticEvent, useState } from "react"
import { Button, Container, Form, Spinner } from "react-bootstrap"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectCart } from "../../features/cart/cartSlice"
import AlertPopup from "../Alert/Alert"

interface ReqStatus {
  pending: boolean
  message: string | undefined
}

const Checkout = () => {
  const [state, setState] = useState({
    name: '',
    surname: '',
    town: '',
    postalCode: ''
  })
  const [valid, setValid] = useState(false)
  const [status, setStatus] = useState<ReqStatus>({
    pending: false, 
    message: undefined
  })
  const cart = useAppSelector(selectCart)

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if(!valid) return
    else {
      const order = {
        order: cart.items.map(item => ({id: item.id, quantity: item.amount})),
        first_name: state.name, last_name: state.name, city: state.town, zip_code: state.postalCode
      }
      //disable form controls while request is pending
      setStatus({...status, pending: true})

      fetch('http://localhost:3001/api/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        if(res.ok) { 
          setStatus({pending: false, message: 'success'})
        } else {
          //task failed successfully
          setStatus({pending: false, message: 'Błędny format zamówienia'})
        }
      }).catch(err => {
        setStatus({pending: false, message: 'Błąd serwera '})
      })
    }
  }

  const handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const regex = new RegExp(target.pattern)
    setState({...state, [target.id]: target.value})

    if(target.value.match(regex)) setValid(true)
    else setValid(false)
  }

  if(cart.total === 0 || cart.items.length === 0) return <Navigate to='/' replace={true}  />

  return (
    <Container>
      <h2>Podumowanie</h2>
      <Form validated={valid} onSubmit={handleFormSubmit}>
        <h3>Dane do wysyłki</h3>
        <fieldset disabled={status.pending || status.message === 'success'}>
          <Form.Group controlId="name">
            <Form.Label>Imię</Form.Label>
            <Form.Control required type='text' minLength={3} pattern="^[A-Za-z]+$" placeholder="Imię" onChange={handleInputChange} value={state.name}/>
            <Form.Control.Feedback type='invalid'>Imię powinno być dłuższe niż 2 litery oraz zawierać tylko litery alfabetu</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="surname">
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control required type='text' minLength={2} pattern="^[A-Za-z]+$" placeholder="Nazwisko" onChange={handleInputChange} value={state.surname}></Form.Control>
            <Form.Control.Feedback type='invalid'>Nazwisko powinno być dłuższe niż 2 litery oraz zawierać tylko litery alfabetu</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="town">
            <Form.Label>Miejscowość</Form.Label>
            <Form.Control required type='text' minLength={2} placeholder="Miejscowość" pattern="^[a-zA-Z0-9-\s]+$" onChange={handleInputChange} value={state.town}></Form.Control>
            <Form.Control.Feedback type='invalid'>Nazwa miejscowości powinna składać się z co najmniej 2 znaków alfanumerycznych</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label>Kod pocztowy</Form.Label>
            <Form.Control required type='postalCode' pattern="^[0-9]{2}-[0-9]{3}$" placeholder="dd-ddd" onChange={handleInputChange} value={state.postalCode}></Form.Control>
            <Form.Text></Form.Text>
            <Form.Control.Feedback type="invalid">Poprawny format kodu pocztowego to dd-ddd (d oznacza cyfrę)</Form.Control.Feedback>
          </Form.Group>
        </fieldset>

        <Button style={{width: '100%', marginTop: "2rem"}} type='submit' disabled={status.pending || status.message === 'success'}>
          {status.pending ? (<Spinner animation="border" />) : 'ZAMAWIAM I PŁACĘ'}
        </Button>
      </Form>

      <AlertPopup status={status.message}></AlertPopup>
    </Container>
  )
}

export default Checkout