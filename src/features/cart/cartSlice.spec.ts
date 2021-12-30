import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react";
import cartReducer, { addProduct, decrementAmount, incrementAmount, removeProduct, ShoppingCartState } from "./cartSlice";

const book = {
  "id": 457,
  "title": "Matematyka 1. Podręcznik. Zakres podstawowy",
  "author": "M. Karpiński, M. Dobrowolska, M. Braun, J. Lech",
  "cover_url": "http://localhost:3001/static/cover/book/457.jpg",
  "pages": 280,
  "price": 3200,
  "currency": "PLN"
}
describe('cart reducer', () => {
  const initialState: ShoppingCartState = {
    total: 0,
    items: []
  }

  it('should handle initial state', () => {
    expect(cartReducer(undefined, {type: 'unknown'})).toEqual({
      total: 0,
      items: []
    })
  })

  it('should handle item addition', () => {
    const actual = cartReducer(initialState, addProduct(book))
    expect(actual.items).toEqual([book])
    expect(actual.total).toEqual(3200)
  })

  it('should handle item removal', () => {
    const book = {
      "id": 457,
      "title": "Matematyka 1. Podręcznik. Zakres podstawowy",
      "author": "M. Karpiński, M. Dobrowolska, M. Braun, J. Lech",
      "cover_url": "http://localhost:3001/static/cover/book/457.jpg",
      "pages": 280,
      "price": 3200,
      "currency": "PLN",
      "amount": 1
    }
    const actual = cartReducer({total: 3200, items: [book]}, removeProduct(book.id))
    expect(actual.items).toEqual([])
    expect(actual.total).toEqual(0)
  })

  it('should handle item amount decreement', () => {
    const book = {
      "id": 457,
      "title": "Matematyka 1. Podręcznik. Zakres podstawowy",
      "author": "M. Karpiński, M. Dobrowolska, M. Braun, J. Lech",
      "cover_url": "http://localhost:3001/static/cover/book/457.jpg",
      "pages": 280,
      "price": 3200,
      "currency": "PLN",
      "amount": 2
    }
    const actual = cartReducer({total: 6400, items: [book]}, decrementAmount(book.id))
    expect(actual.items[0].amount).toEqual(1)
    expect(actual.total).toEqual(3200)
  })
  it('should handle item amount increment', () => {
    const book = {
      "id": 457,
      "title": "Matematyka 1. Podręcznik. Zakres podstawowy",
      "author": "M. Karpiński, M. Dobrowolska, M. Braun, J. Lech",
      "cover_url": "http://localhost:3001/static/cover/book/457.jpg",
      "pages": 280,
      "price": 3200,
      "currency": "PLN",
      "amount": 1
    }
    const actual = cartReducer({total: 3200, items: [book]}, incrementAmount(book.id))
    expect(actual.items[0].amount).toEqual(2)
    expect(actual.total).toEqual(6400)
  })
})