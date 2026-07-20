import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { getAnimeById, getAnimeGenres, getRecentAnimeReviews } from '../src';

const REQUEST_INTERVAL_MS = 1_100;
const TEST_TIMEOUT_MS = 15_000;

type ReviewCollection = { data: Array<{ mal_id?: number }> };

const isReviewCollection = (response: unknown): response is ReviewCollection =>
  typeof response === 'object' &&
  response !== null &&
  'data' in response &&
  Array.isArray(response.data);

describe.sequential('requests integration tests', () => {
  beforeAll(() => {
    const baseFetch = global.fetch;
    global.fetch = vi.fn((url) => baseFetch(url));
  });

  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, REQUEST_INTERVAL_MS));
  });

  test(
    'should call a method with no args',
    async () => {
      const response = await getRecentAnimeReviews();

      expect(global.fetch).toHaveBeenCalledWith(
        new URL('https://api.jikan.moe/v4/reviews/anime'),
      );
      expect(isReviewCollection(response)).toBeTruthy();
      if (!isReviewCollection(response)) {
        throw new Error('Expected Jikan to return a review collection');
      }
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.data.at(0)?.mal_id).toBeGreaterThanOrEqual(1);
    },
    TEST_TIMEOUT_MS,
  );

  test(
    'should call a method with a simple arg',
    async () => {
      const animeId = 1;
      const response = await getAnimeById(animeId);

      expect(global.fetch).toHaveBeenCalledWith(
        new URL(`https://api.jikan.moe/v4/anime/${animeId}`),
      );
      expect(response.data).toBeDefined();
      expect(response.data?.mal_id).toEqual(animeId);
      expect(response.data?.titles?.at(0)?.title).toEqual('Cowboy Bebop');
    },
    TEST_TIMEOUT_MS,
  );

  test(
    'should call a method with query args',
    async () => {
      const response = await getAnimeGenres({ filter: 'genres' });

      expect(global.fetch).toHaveBeenCalledWith(
        new URL('https://api.jikan.moe/v4/genres/anime?filter=genres'),
      );
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);
      expect(
        response.data?.every(
          ({ mal_id }) => typeof mal_id === 'number' && mal_id >= 1,
        ),
      ).toBeTruthy();
    },
    TEST_TIMEOUT_MS,
  );
});
