import React from 'react';
import { render } from '@testing-library/react';
import FourOhFour from './FourOhFour';

test('should render 404 page', () => {
  const { getByText,  asFragment } = render(
    <FourOhFour />
  );

  expect(getByText(/404/)).toBeInTheDocument()
  expect(getByText(/Strona nie została odnaleziona/)).toBeInTheDocument()
  expect(getByText(/Powrót na stronę główną/)).toBeInTheDocument()
  
  expect(asFragment()).toMatchSnapshot()
});
