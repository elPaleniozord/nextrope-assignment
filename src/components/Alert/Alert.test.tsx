import React from 'react';
import { render } from '@testing-library/react';
import AlertPopup from './Alert';
import { MemoryRouter } from 'react-router';

test('should render alert success variant', () => {
  const { getByText, container } = render(
    <MemoryRouter>
      <AlertPopup status='success' />
    </MemoryRouter>
  );

  expect(getByText(/POWRÓT DO SKLEPU/)).toBeInTheDocument()
  
  expect(container).toMatchSnapshot()
});

test('should render alert warning variant', () => {
  const { getByText, container } = render(
    <AlertPopup status='Error message' />
  );

  expect(getByText(/ZAMKNIJ/)).toBeInTheDocument()
  
  expect(container).toMatchSnapshot()
});

test('should prevent render if status is undefined', () => {
  const { container}  = render(
    <AlertPopup status={undefined} />
  );
  
  expect(container.childElementCount).toBe(0)
});