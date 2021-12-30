import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Products from './Products';

test('should match snapshot', () => {
  const { getByText,asFragment } = render(
    <Provider store={store}>
      <Products />
    </Provider>
  )

  expect(getByText(/Książki/)).toBeInTheDocument()

  expect(asFragment()).toMatchSnapshot()
})