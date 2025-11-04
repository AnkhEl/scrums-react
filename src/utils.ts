import { Asset } from './Challenge'; // Assuming types are exported

// Mock data to simulate an API response
const mockAssets: Asset[] = [
  { id: 1, name: 'Apple Inc.', value: 15000, type: 'STOCK', status: 'ACTIVE' },
  { id: 2, name: 'Ethereum', value: 8000, type: 'CRYPTO', status: 'ACTIVE' },
  {
    id: 3,
    name: 'Tesla Motors',
    value: 9500,
    type: 'STOCK',
    status: 'PENDING',
  },
  {
    id: 4,
    name: 'US Treasury Bond',
    value: 20000,
    type: 'BOND',
    status: 'ACTIVE',
  },
  {
    id: 5,
    name: 'Bitcoin',
    value: 32000,
    type: 'CRYPTO',
    status: 'LIQUIDATED',
  },
];

/**
 * Simulates an API call with a random chance of failure and a delay.
 * @returns A Promise resolving to an array of Assets.
 */
export async function mockFetchAssets(): Promise<Asset[]> {
  const isError = Math.random() < 0.1; // 10% chance of failure

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isError) {
        reject(new Error('Failed to fetch assets. Server offline.'));
      } else {
        resolve(mockAssets);
      }
    }, 1000); // 1 second delay
  });
}
