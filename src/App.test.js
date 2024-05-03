/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders ListingPage component for "/" route', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(getByText('Universities')).toBeInTheDocument();
  });

  it('redirects to ListingPage component for any other route', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/random']}>
        <App />
      </MemoryRouter>
    );

    expect(getByText('Universities')).toBeInTheDocument();
  });
});
