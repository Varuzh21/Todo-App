import { focusManager, onlineManager } from '@tanstack/react-query';
import { addNetworkStateListener, getNetworkStateAsync } from 'expo-network';
import { AppState } from 'react-native';

export function setupQueryManagers() {
	focusManager.setEventListener(setFocused => {
		const subscription = AppState.addEventListener('change', status => {
			setFocused(status === 'active');
		});

		return () => subscription.remove();
	});

	onlineManager.setEventListener(setOnline => {
		getNetworkStateAsync().then(state => setOnline(Boolean(state.isConnected)));

		const subscription = addNetworkStateListener(state => {
			setOnline(Boolean(state.isConnected));
		});

		return () => subscription.remove();
	});
}
