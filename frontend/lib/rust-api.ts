'use client';

/**
 * Service for interacting with the Rust API
 * This handles vote encryption and public key generation
 */

// API endpoint - replace with actual endpoint
const API_BASE_URL =
	process.env.NEXT_PUBLIC_RUST_API_URL || 'http://localhost:3001/api';

// Flag to use mock implementation when API is not available
const USE_MOCK_IMPLEMENTATION = true;

/**
 * Get the public key for a vote
 * @param voteId The ID of the vote
 * @returns The public key as a Uint8Array
 */
export async function getPublicKey(voteId: string): Promise<Uint8Array> {
	// If mock implementation is enabled, return a mock public key
	if (USE_MOCK_IMPLEMENTATION) {
		console.log('Using mock public key implementation');
		// Return a mock public key (32 bytes of random data)
		const mockPublicKey = new Uint8Array(32);
		for (let i = 0; i < 32; i++) {
			mockPublicKey[i] = Math.floor(Math.random() * 256);
		}
		return mockPublicKey;
	}

	try {
		const response = await fetch(`${API_BASE_URL}/public-key/${voteId}`);

		if (!response.ok) {
			throw new Error(`Failed to get public key: ${response.statusText}`);
		}

		const data = await response.json();

		// Convert the public key from base64 or hex to Uint8Array
		// This depends on how the Rust API returns the data
		// Assuming it returns a hex string
		const hexString = data.publicKey;
		const bytes = new Uint8Array(hexString.length / 2);

		for (let i = 0; i < hexString.length; i += 2) {
			bytes[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
		}

		return bytes;
	} catch (error) {
		console.error('Error getting public key:', error);
		// Fallback to mock implementation if API call fails
		console.log('Falling back to mock public key implementation');
		const mockPublicKey = new Uint8Array(32);
		for (let i = 0; i < 32; i++) {
			mockPublicKey[i] = Math.floor(Math.random() * 256);
		}
		return mockPublicKey;
	}
}

/**
 * Encrypt a vote using the Rust API
 * @param publicKey The public key for the vote
 * @param voteChoice The choice number (1-based index)
 * @param optionCount The total number of options
 * @returns The encrypted vote as a Uint8Array
 */
export async function encryptVote(
	publicKey: Uint8Array,
	voteChoice: number,
	optionCount: number
): Promise<Uint8Array> {
	// If mock implementation is enabled, return a mock encrypted vote
	if (USE_MOCK_IMPLEMENTATION) {
		console.log('Using mock encrypted vote implementation');
		// Return a mock encrypted vote (64 bytes of random data)
		const mockEncryptedVote = new Uint8Array(64);
		for (let i = 0; i < 64; i++) {
			mockEncryptedVote[i] = Math.floor(Math.random() * 256);
		}
		return mockEncryptedVote;
	}

	try {
		const response = await fetch(`${API_BASE_URL}/encrypt-vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				publicKey: Array.from(publicKey),
				voteChoice,
				optionCount,
			}),
		});

		if (!response.ok) {
			throw new Error(`Failed to encrypt vote: ${response.statusText}`);
		}

		const data = await response.json();

		// Convert the encrypted vote from base64 or hex to Uint8Array
		// This depends on how the Rust API returns the data
		// Assuming it returns a hex string
		const hexString = data.encryptedVote;
		const bytes = new Uint8Array(hexString.length / 2);

		for (let i = 0; i < hexString.length; i += 2) {
			bytes[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
		}

		return bytes;
	} catch (error) {
		console.error('Error encrypting vote:', error);
		// Fallback to mock implementation if API call fails
		console.log('Falling back to mock encrypted vote implementation');
		const mockEncryptedVote = new Uint8Array(64);
		for (let i = 0; i < 64; i++) {
			mockEncryptedVote[i] = Math.floor(Math.random() * 256);
		}
		return mockEncryptedVote;
	}
}
