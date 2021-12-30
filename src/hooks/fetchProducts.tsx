import { useEffect, useReducer, useState } from "react"
import { Book } from "../features/cart/cartSlice"

interface FetchProductsState {
  page: number,
  products: Book[],
  hasMore: boolean,
  loading: boolean
}
const useFetchProducts = () : [FetchProductsState, () => void] => {
  const [state, setState] = useState<FetchProductsState>({loading: false, page: 1, products: [], hasMore: true})

  useEffect(() => {
    if(state.loading) return
    const endpoint = 'http://localhost:3001/api'
    setState({...state, loading: true})
    fetch(`${endpoint}/book?page=${state.page}`)
      .then(res => res.ok && res.json())
      .then(json => {
        const pagesLeft = json.metadata.total_records - (state.page * json.metadata.records_per_page)
        const productsUpdate = [...state.products, ...json.data]

        setState({
          ...state,
          loading: false, 
          products: productsUpdate, 
          hasMore: pagesLeft > 0
        })
      })
      .catch(err => console.log(err))
  }, [state.page])

  const loadMore = () => {
    setState({...state, page: state.page + 1})}

  return [state, loadMore]
}

export default useFetchProducts