import { beforeAll, describe, expect, test } from 'vitest';
import { client_setBaseUrl, getAnimeById, getAnimeGenres, getRecentAnimeReviews } from '../src';

const MOCK_SERVER_BASE_URL = process.env.JIKAN_MOCK_SERVER_URL ?? 'http://127.0.0.1:1080/v4/';
type ReviewCollection = { data: Array<{ mal_id?: number }> };
const isReviewCollection = (response: unknown): response is ReviewCollection =>
  typeof response === 'object' && response !== null && 'data' in response && Array.isArray(response.data);

describe('requests integration tests', () => {
  beforeAll(() => client_setBaseUrl(MOCK_SERVER_BASE_URL));
  test('should call a method with no args', async () => {
    const response = await getRecentAnimeReviews();
    expect(isReviewCollection(response)).toBeTruthy();
    if (!isReviewCollection(response)) throw new Error('Expected Jikan to return a review collection');
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data.at(0)?.mal_id).toBeGreaterThanOrEqual(1);
  });
  test('should call a method with a simple arg', async () => {
    const animeId = 1;
    const response = await getAnimeById(animeId);
    expect(response.data?.mal_id).toEqual(animeId);
    expect(response.data?.titles?.at(0)?.title).toEqual('Cowboy Bebop');
  });
  test('should call a method with query args', async () => {
    const response = await getAnimeGenres({ filter: 'genres' });
    expect(response.data?.length).toBeGreaterThan(0);
    expect(response.data?.every(({ mal_id }) => typeof mal_id === 'number' && mal_id >= 1)).toBeTruthy();
  });
});
