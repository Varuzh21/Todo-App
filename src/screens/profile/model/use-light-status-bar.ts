import { useFocusEffect } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { useCallback } from 'react';

export function useLightStatusBar() {
	useFocusEffect(
		useCallback(() => {
			setStatusBarStyle('light');

			return () => setStatusBarStyle('dark');
		}, []),
	);
}
