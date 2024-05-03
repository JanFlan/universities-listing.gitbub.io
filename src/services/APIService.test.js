import APIService from './APIService';

describe('APIService', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('fetches items from the API and caches them in localStorage', async () => {
        // mock fetch to return sample data
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([{ name: 'University A' }, { name: 'University B' }])
        });

        await APIService.fetchItems();
        expect(localStorage.getItem('items')).toEqual(JSON.stringify([{ name: 'University A' }, { name: 'University B' }]));
    });

    it('retrieves cached data from localStorage if API fetch fails', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch data'));

        localStorage.setItem('items', JSON.stringify([{ name: 'University A' }, { name: 'University B' }]));

        const data = await APIService.fetchItems();
        expect(data).toEqual([{ name: 'University A' }, { name: 'University B' }]);
    });

    it('throws error if both API fetch and localStorage retrieval fail', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch data'));

        await expect(APIService.fetchItems()).rejects.toThrow('Failed to fetch data');
    });
});
