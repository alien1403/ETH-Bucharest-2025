'use client';

/**
 * Service for interacting with the Rust API
 * This handles vote encryption and public key generation
 */

// API endpoint - replace with actual endpoint
const API_BASE_URL =
	process.env.NEXT_PUBLIC_RUST_API_URL || 'http://localhost:3001/api';

/**
 * Get the public key for a vote
 * @param voteId The ID of the vote
 * @returns The public key as a Uint8Array
 */
export async function getPublicKey(voteId: string): Promise<Uint8Array> {
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
		throw error;
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
	try {
		// Convert Uint8Array to hex string for API request
		const publicKeyHex = Array.from(publicKey)
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');

		const response = await fetch(`${API_BASE_URL}/encrypt-vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				publicKey: publicKeyHex,
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
		throw error;
	}
}
