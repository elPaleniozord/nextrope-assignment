import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Cart from './Cart';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addProduct } from '../../features/cart/cartSlice';
import { MemoryRouter } from 'react-router';

const book = {
  "id": 457,
  "title": "Matematyka 1. Podręcznik. Zakres podstawowy",
  "author": "M. Karpiński, M. Dobrowolska, M. Braun, J. Lech",
  "cover_url": "http://localhost:3001/static/cover/book/457.jpg",
  "pages": 280,
  "price": 3200,
  "currency": "PLN"
}

export function renderWithStore (
  ui, {
    preloadedState, 
    store = configureStore({reducer: {cart: cartReducer}, preloadedState}),
    ...renderOptions
  } = {}
) {
  function Wrapper({children}) {
    store.dispatch(addProduct(book))
    return <Provider store={store}>{children}</Provider>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions})
}

test('should render cart component', () => {
  const { getByText, getAllByText, asFragment } = renderWithStore(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );
  
  expect(asFragment()).toMatchSnapshot()
});
