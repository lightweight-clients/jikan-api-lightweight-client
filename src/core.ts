// noinspection JSUnusedGlobalSymbols

let baseUrl: string = 'https://api.jikan.moe/v4/';

const createUrl = (
  path: string,
  args?: Record<string, string | number | boolean>,
): URL => {
  // The 'path' parameters are placed to both the path and the query string.
  // This is an expected behavior to simplify the client.
  const url = new URL(path, baseUrl);
  for (const key in args) {
    const camelKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    url.searchParams.append(camelKey, String(args[key]));
  }

  return url;
};

/**
 * @internal
 * Fetches data from the Telegram Bot API.
 *
 * @param path - The API endpoint to fetch data from, e.g., 'getMe'.
 * @param args - The input arguments for the API call, which will be sent as JSON in the request body.
 *
 * @returns A promise that resolves to the output data from the API call, parsed as JSON.
 */
export let client_fetch = async <In, Out>(
  path: string,
  args?: In & Record<string, string | number | boolean>,
): Promise<Out> => {
  const url = createUrl(path, args);
  const response = await fetch(url);

  return (await response.json()) as unknown as Out;
};

/**
 * Sets the base URL for the client.
 * This is useful if you want to use a different Telegram Bot API server or a mock server.
 *
 * @param url - The base URL to use for the client.
 */
export const client_setBaseUrl = (url: string): void => {
  baseUrl = url;
};

/**
 * Sets a custom fetch function to be used by the client.
 * This can be useful for testing or when you want to use a different HTTP client.
 *
 * @param customFetch - The custom fetch function to use.
 */
export const client_setFetch = (customFetch: typeof client_fetch): void => {
  client_fetch = customFetch;
};
