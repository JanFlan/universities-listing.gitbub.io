const API_URL = 'http://universities.hipolabs.com/search?country=United%20Arab%20Emirates';

const APIService = {
    /**
     * Fetches items from the universities API and caches them in localStorage
     * @returns {Promise<Array>} A Promise that resolves with the fetched items or rejects with an error.
     */
    fetchItems: async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            // cache data in local storage
            localStorage.setItem('items', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            // try to retrieve data from local storage in case of API failure
            const cachedData = localStorage.getItem('items');
            if (cachedData) {
                return JSON.parse(cachedData);
            }
            throw error;
        }
    }
};

export default APIService;
