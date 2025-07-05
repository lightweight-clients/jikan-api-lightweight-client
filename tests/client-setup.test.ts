import { describe, test, expect, vi, beforeEach } from 'vitest';
import { client_setBaseUrl, client_setFetch, getAnimeNews, getAnimeSearch, getRandomAnime } from '../src';

describe('client setup tests', () => {
    const fetchMock = global.fetch = vi.fn(url => {
        console.log('fetch called', String(url));
        return Promise.resolve({
            json: () => Promise.resolve({}),
        });
    }) as unknown as typeof global.fetch;

    beforeEach(() => vi.clearAllMocks());

    test('should correctly build URL', async () => {
        const ANIME_ID = 123;
        await getAnimeNews(ANIME_ID);
        expect(fetchMock).toHaveBeenCalledWith(
            new URL(`https://api.jikan.moe/v4/anime/${ANIME_ID}/news`),
        );
    });

    test('should handle no args correctly', async () => {
        await getRandomAnime();
        expect(fetchMock).toHaveBeenCalledWith(new URL('https://api.jikan.moe/v4/random/anime'));
    });

    test('should handle complex args correctly', async () => {
        await getAnimeSearch({
            q: 'Cowboy Bebop',
            limit: 3,
            page: 2,
            order_by: 'mal_id',
            sort: 'asc',
        });

        expect(fetchMock).toHaveBeenCalledWith(
            new URL('https://api.jikan.moe/v4/anime?q=Cowboy+Bebop&limit=3&page=2&order_by=mal_id&sort=asc'),
        );
    });

    test('should set base URL', async () => {
        const baseUrl = 'https://localhost:3000';
        client_setBaseUrl(baseUrl);
        await getRandomAnime();
        expect(fetchMock).toHaveBeenCalledWith(new URL(`${baseUrl}/random/anime`));
    });

    test('should set custom fetch', async () => {
        const animeId = 123;
        const customClient = vi.fn();
        client_setFetch(customClient);

        await getAnimeNews(animeId);

        expect(customClient).toHaveBeenCalledWith('anime/123/news');
    });
});
