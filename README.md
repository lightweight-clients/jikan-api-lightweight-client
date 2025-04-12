# Jikan API Lightweight Client

This is typed lightweight client for Jikan API. It contains only methods and types
and exports only `fetch` calls to make requests.

## Installation

```bash
npm install jikan-api-lightweight-client
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

- request methods: `getAnimeById`, `getMangaById`, `getCharacterById`, etc.
- `client_*`: methods for configuring the client.

### Request methods

The request methods are named as in [Jikan API](https://docs.api.jikan.moe/) documentation.

### `client_` methods

The methods starting with `client_` are used to configure the client. They are:

- `client_setBaseUrl(endpoint: string)`: sets endpoint for all requests.
  It can be used to set custom endpoint if you need to use local server or proxy.  
  The string should end with `/`.  
  Default value: `https://api.jikan.moe/v4/`.
- `client_setFetch(customFetch: <Request, Result>(path: string, args?: Request): Promise<Result>)`:
  sets fetch function for all requests.  
  It can be used to set custom fetch function if you need to use custom request library.

## Features

- No dependencies.
- When using code minifiers, only the fetch command is exported.
- Can be used in browser and Node.js.
- Fully compatible with AWS LLRT.
- Fully typed API.

## Versioning

The versioning of this library is based on Jikan API versioning. So, if Jikan API
version is 4.0.0, then this library version will be 4.0.0-X. The last number is for bug fixes and
small changes in the library.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
Types are generated from [Jikan API](https://docs.api.jikan.moe/) documentation.
by [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts).
