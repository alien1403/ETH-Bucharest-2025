import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Convert a Uint8Array to a hex string
 * @param bytes The Uint8Array to convert
 * @returns A hex string
 */
export function bytesToHex(bytes: Uint8Array): string {
	return Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

/**
 * Convert a hex string to a Uint8Array
 * @param hex The hex string to convert
 * @returns A Uint8Array
 */
export function hexToBytes(hex: string): Uint8Array {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
	}
	return bytes;
}

/**
 * Format an Ethereum address for display
 * @param address The Ethereum address to format
 * @returns A formatted address (e.g., 0x1234...5678)
 */
export function formatAddress(address: string): string {
	if (!address) return '';
	return `${address.substring(0, 6)}...${address.substring(
		address.length - 4
	)}`;
}

/**
 * Get an Arbiscan URL for a transaction
 * @param txHash The transaction hash
 * @returns The Arbiscan URL
 */
export function getArbiscanUrl(txHash: string): string {
	return `https://arbiscan.io/tx/${txHash}`;
}
