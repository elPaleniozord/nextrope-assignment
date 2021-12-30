import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { store } from '../../app/store';
import Menu from './Navbar';

test('should render navbar component', () => {
  const { getByText, asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    </Provider>
  )
  expect(getByText(/Logo/)).toBeInTheDocument()
  expect(getByText(/Książki/)).toBeInTheDocument()
  expect(getByText(/Koszyk/)).toBeInTheDocument()

  expect(asFragment()).toMatchSnapshot()
})

// test('should handle navigation', () => {
//   let mockHistory, mockLocation
//   const { getByText } = render(
//     <Provider store={store}>
//       <MemoryRouter initialEntries={["/my-initial-route"]}>
//         <Menu />
//         <Routes >
//           <Route path="*" render={({history, location}) => {
//             mockHistory = history
//             mockLocation = location
//             return null
//           }} />
//         </Routes>
//       </MemoryRouter>
//     </Provider>
//   )
//   userEvent.click(getByText(/Koszyk/))
//   console.log(getByText(/Koszyk/))
//   expect(mockLocation.pathname).toBe("/cart")
// })