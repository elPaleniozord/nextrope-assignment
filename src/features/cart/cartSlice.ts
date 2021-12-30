import { createSlice, current } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export type Book = {
  id: number
  title: string
  author: string
  cover_url: string
  pages: number
  price: number
  currency: string
  amount: number
}

export interface ShoppingCartState {
  items: Book[]
  total: number
}

const initialState: ShoppingCartState = {
  items: [],
  total: 0
}

export type CartAction = {
  type: CartActionType,
  book: Book[]
}

export const enum CartActionType {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const id = action.payload.id
      const product = state.items.find(item => item.id === id)
      if(product) product.amount ++
      else {
        action.payload.amount = 1
        state.items = [...state.items, action.payload]
      }
      state.total += action.payload.price
    },
    removeProduct: (state, action) => {
      const idx = state.items.findIndex(item => item.id === action.payload)
      state.total -= state.items[idx].price * state.items[idx].amount
      state.items.splice(idx, 1)
    },
    incrementAmount: (state, action) => {
      const product = state.items.find(item => item.id === action.payload)
      if(product) {
        product.amount ++
        state.total += product.price
      }
    },
    decrementAmount: (state, action) => {
      const idx = state.items.findIndex(item => item.id === action.payload)
      const product = state.items[idx]
      if(product.amount > 1) {
        product.amount --
        state.total -= product.price
      }
      else {
        state.total -= product.price * product.amount
        state.items.splice(idx, 1)
      }
    }
  }
})

export const {addProduct, removeProduct, incrementAmount, decrementAmount} = cartSlice.actions

export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer