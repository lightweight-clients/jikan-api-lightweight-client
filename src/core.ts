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

export let client_fetch = async <In, Out>(
    path: string,
    args?: In & Record<string, string | number | boolean>,
): Promise<Out> => {
    const url = createUrl(path, args);
    const response = await fetch(url);

    return (await response.json()) as unknown as Out;
};

/*
 * Set the base URL for the client.
 */
export const client_setBaseUrl = (url: string): void => {
    baseUrl = url;
};

/*
 * Set a custom fetch function for the client.
 */
export const client_setFetch = (customFetch: typeof client_fetch): void => {
    client_fetch = customFetch;
};
