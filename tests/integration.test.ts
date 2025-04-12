import { getAnimeById, getAnimeSearch, getRandomAnime } from '../src';

describe('requests integration tests', () => {
    let originalFetch: typeof global.fetch;

    beforeAll(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn((url) => {
            console.log('fetch called with URL:', url.toString());
            return originalFetch(url);
        });
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });
        const response = await getRandomAnime();

        console.log(response);
        expect(response).toBeDefined();
        expect(response.data).toBeDefined();
        expect(response.data?.mal_id).toBeGreaterThanOrEqual(1);
    });

    test('should call a method with simple args', async () => {
        const ANIME_ID = 1;

        const response = await getAnimeById({ id: ANIME_ID });
        console.log(response);
        expect(response.data).toBeDefined();
        expect(response.data?.mal_id).toEqual(ANIME_ID);
        expect(response.data?.titles?.at(0)?.title).toEqual('Cowboy Bebop');
    });

    test('should call a method with complex args', async () => {
        const response = await getAnimeSearch({
            q: 'Cowboy Bebop',
            limit: 3,
            page: 2,
            orderBy: 'mal_id',
            sort: 'asc',
        });
        console.log(response);

        expect(global.fetch).toHaveBeenCalledWith(
            new URL('https://api.jikan.moe/v4/anime?q=Cowboy+Bebop&limit=3&page=2&order_by=mal_id&sort=asc'),
        );
        expect(response).toBeDefined();
        expect(response.pagination?.last_visible_page).toBeGreaterThanOrEqual(5);
        expect(response.data?.at(0)?.mal_id).toEqual(2220);
        expect(response.data?.at(0)?.approved).toBeTruthy();
    });
});
