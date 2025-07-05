# Jikan API Lightweight Client

[![NPM Version](https://img.shields.io/npm/v/jikan-api-lightweight-client)](https://www.npmjs.com/package/@lightweight-clients/jikan-api-lightweight-client)
[![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Frepos%2Flightweight-clients%2Fjikan-api-lightweight-client%2Factions%2Fworkflows%2Fcreate-new-version-when-it-is-released.yml%2Fruns%3Fstatus%3Dcompleted%26per_page%3D1&query=%24.workflow_runs%5B0%5D.run_started_at&style=flat&label=Last%20API%20version%20check)](https://github.com/lightweight-clients/jikan-api-lightweight-client/actions/workflows/create-new-version-when-it-is-released.yml)
![NPM Downloads](https://img.shields.io/npm/dm/@lightweight-clients/jikan-api-lightweight-client)
![GitHub License](https://img.shields.io/github/license/lightweight-clients/jikan-api-lightweight-client)

This is a typed lightweight client for Jikan API. It contains only methods and types
and exports only `fetch` calls to make requests.

## Installation

```bash
npm install @lightweight-clients/jikan-api-lightweight-client
```

## Usage

### Examples

```typescript
import { getRandomAnime, getAnimeById, getAnimeSearch } from 'jikan-api-lightweight-client';

const randomAnime = await getRandomAnime();

const cowboyBebop = await getAnimeById({ id: 1 });

const allCowboyBebop = await getAnimeSearch({
    q: 'Cowboy Bebop',
    limit: 3,
    page: 2,
    orderBy: 'mal_id',
    sort: 'asc',
});
```

The library provides 2 groups of methods:

- request methods: `getAnimeById`, `getMangaById`, `getCharacterById`, etc. These methods are used to make requests to the Jikan API.
- `client_*`: methods for configuring the client.

#### Request Methods

They return a promise that resolves to the response from the API.
You can find all request methods in the 'client.ts' file.
The request methods are named as in Jikan API documentation, so you can easily find them.

#### `client_*` Methods

The methods starting with `client_` are used to configure the client. They are:

- `client_setBaseUrl(endpoint: string)`: sets the endpoint.  
  Defaults to `https://api.jikan.moe/v4/`.
  If you want to use a different endpoint (e.g., for a self-hosted Jikan API server or a proxy), you can set it here.
- `client_setFetch(customFetch: <Request, Result>(path: string, args?: Request): Promise<Result>)`: sets the fetch function for all requests.
  Defaults to the `fetch` function from the `node-fetch` package.
  If you want to use a different fetch function (e.g., for browser or Node.js), you can set it here.

## Features

- No dependencies.
- When using code minifiers, only the fetch command is exported.
- Can be used in browser and Node.js.
- Fully compatible with AWS LLRT.
- Fully typed API.

## Versioning

The versioning of this library is based on Jikan API versioning. So, if Jikan API
version is 4.0, then this library version will be 4.0.1. The last number is for bug fixes and
small changes in the library.

## Schema

The schema for the Jikan API is available in the
[lightweight-clients/schemas](https://github.com/lightweight-clients/schemas) repository.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
Types are generated from [Jikan API](https://docs.api.jikan.moe/) documentation.
by [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts).
