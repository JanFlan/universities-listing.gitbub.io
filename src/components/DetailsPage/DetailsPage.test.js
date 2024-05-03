/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailsPage from './DetailsPage';

describe('DetailsPage Component', () => {
    it('renders details page correctly', async () => {
        const { getByText } = render(
            <MemoryRouter>
                <DetailsPage />
            </MemoryRouter>
        );
        expect(getByText('Country:')).toBeInTheDocument();
        expect(getByText('Web Pages:')).toBeInTheDocument();
        expect(getByText('Alpha Two Code:')).toBeInTheDocument();
    });
});
