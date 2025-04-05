'use client';

import { useState, useEffect } from 'react';
import { getCurrentEnvironment, getContractAddress, getRpcUrl } from './config';

// Environment switcher component for development
export function useEnvironmentInfo() {
	const [environment, setEnvironment] = useState(getCurrentEnvironment());
	const [contractAddress, setContractAddress] = useState(getContractAddress());
	const [rpcUrl, setRpcUrl] = useState(getRpcUrl());

	// Function to manually switch environment (for development purposes)
	const switchEnvironment = (
		newEnv: 'local' | 'development' | 'test' | 'production'
	) => {
		// This is a hack for development only - it modifies the localStorage
		localStorage.setItem('preferred-environment', newEnv);
		setEnvironment(newEnv);
		setContractAddress(getContractAddress());
		setRpcUrl(getRpcUrl());

		// Reload the page to apply changes
		window.location.reload();
	};

	// Check for preferred environment in localStorage on mount
	useEffect(() => {
		const preferredEnv = localStorage.getItem('preferred-environment');
		if (preferredEnv) {
			setEnvironment(preferredEnv as any);
		}
	}, []);

	return {
		environment,
		contractAddress,
		rpcUrl,
		switchEnvironment,
	};
}
