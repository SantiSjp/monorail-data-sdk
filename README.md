# Monorail Data SDK

SDK for integrating with the Monorail API, focused on token, wallet, and price data in the Monad ecosystem. Developed in TypeScript.

## Installation

```bash
npm install @santi-dev/monorail-data-sdk
```

## Requirements
- Node.js >= 14
- TypeScript >= 5.2

## Build

To compile the SDK:

```bash
npm run build
```

## Basic Usage

```typescript
import { Client, Category } from '@santi-dev/monorail-data-sdk';

const client = new Client(); // Uses the default testnet endpoint

// Get total portfolio value for a wallet
const value = await client.value('0x...');

// Get MON token price in USD
const price = await client.mONUSD();

// Fetch token metadata
const token = await client.token('0x...');

// Search tokens by name, ticker, or address
const tokens = await client.tokens('monorail', undefined);

// List tokens by category
const stableTokens = await client.category(Category.Stable, undefined);

// List all token balances for a wallet
const balances = await client.balances('0x...');
```

## Main Methods

- `value(address: string)`: Returns the total portfolio value in USD for the given EVM address.
- `mONUSD()`: Returns the price of the MON token in USD.
- `token(contractAddress: string)`: Returns metadata for a token by contract address.
- `tokens(find?: string, address?: string)`: Searches tokens by name, ticker, or address, optionally including balance for an address.
- `category(category: Category, address?: string)`: Lists tokens by category, optionally including balance for an address.
- `balances(address: string)`: Lists all token balances for an EVM address.

## Exported Types

- `Client`: Main class for API interaction.
- `Category`: Enum for token categories (`Wallet`, `Verified`, `Stable`, `Lst`, `Bridged`, `Meme`).
- `TokenResult`, `USDValueResponse`, `PriceResponse`: Response types for the methods.

## Advanced Configuration

You can customize the endpoint or use your own Axios instance:

```typescript
const client = new Client('https://api.monorail.xyz/v1', customAxiosInstance);
```

## License

MIT

## Author

Santi 