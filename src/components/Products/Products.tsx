import { Button, Card, CardGroup, Container, Spinner } from "react-bootstrap"
import { useAppDispatch } from "../../app/hooks"
import { addProduct } from "../../features/cart/cartSlice"
import useFetchProducts from "../../hooks/fetchProducts"

const Products = () => {
  const [data, loadMore] = useFetchProducts()
  const dispatch = useAppDispatch()

  const debounce = (fn: (...params: any[]) => any, wait:number) => {
    let timer: NodeJS.Timeout | undefined = undefined
    return function (this: any, ...args: any[]) {
      if(timer === undefined) fn.apply(this, args)
      //@ts-ignore
      clearTimeout(timer)
      timer = setTimeout(() => fn.apply(this, args), wait)
      return timer
    }
  }

  const handlePagination = (e: React.WheelEvent<HTMLElement>) => {
    if((e.deltaY > 0 && window.innerHeight + window.scrollY + 100) >= document.body.offsetHeight && data.hasMore) loadMore()
  }

  const productList = data.products.map(product => (
    <Card style={{minWidth: '18rem', maxWidth: '18rem', margin: '1rem'}} key={`item-${product.id}`}>
      <Card.Img variant="top" src={product.cover_url} />
      <Card.Body >
        <Card.Title >{product.title}</Card.Title>
        <Card.Subtitle>{product.author}</Card.Subtitle>
        <Card.Text>Liczba stron: {product.pages}</Card.Text>
        <Card.Text>Cena: {product.price.toString().replace(/\d\d$/,".$&")}zł</Card.Text>
        <Button onClick={() => dispatch(addProduct(product))} variant="primary">DODAJ DO KOSZYKA</Button>
      </Card.Body>
    </Card>
  )) 

  return (
    <Container onWheel={debounce(handlePagination, 100)} >
      <h2>Książki</h2>
      <CardGroup className="d-flex justify-content-center">
        {productList}   
      </CardGroup>
      {data.loading ? (<Spinner animation="border" />) : null}
    </Container>
  )
}

export default Products