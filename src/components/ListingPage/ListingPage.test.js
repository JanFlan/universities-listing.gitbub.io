/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ListingPage from './ListingPage';
import APIService from '../../services/APIService';

jest.mock('../../services/APIService');

describe('ListingPage Component', () => {
    const mockItems = [
        { name: 'University A' },
        { name: 'University B' },
        { name: 'University C' }
    ];

    it('renders listing page with correct data', async () => {


        // mock the fetchItems method
        APIService.fetchItems.mockResolvedValue(mockItems);

        const { getByText } = render(
            <MemoryRouter>
                <ListingPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            // ensure all item names are rendered on the page
            mockItems.forEach(item => {
                expect(getByText(item.name)).toBeInTheDocument();
            });
        });
    });
    it('displays error message when no data is found', async () => {
        APIService.fetchItems.mockResolvedValue([]);

        const { getByText } = render(
            <MemoryRouter>
                <ListingPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(getByText('No data found')).toBeInTheDocument();
        });
    });

    it('filters items based on search term', async () => {
        APIService.fetchItems.mockResolvedValue(mockItems);

        const { getByText, getByPlaceholderText, queryByText } = render(
            <MemoryRouter>
                <ListingPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            mockItems.forEach(item => {
                expect(getByText(item.name)).toBeInTheDocument();
            });
        });

        fireEvent.change(getByPlaceholderText('Search'), { target: { value: 'University A' } });

        expect(getByText('University A')).toBeInTheDocument();
        expect(queryByText('University B')).not.toBeInTheDocument();
        expect(queryByText('University C')).not.toBeInTheDocument();
    });
});
