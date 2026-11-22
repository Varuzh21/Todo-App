import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PALETTE } from '@/shared/config/theme';
import { PlusIcon } from '@/shared/ui/icons';

const FAB_OFFSET = 20;

interface CreateTaskFabProps {
	onPress: () => void;
}

export function CreateTaskFab({ onPress }: CreateTaskFabProps) {
	const insets = useSafeAreaInsets();

	return (
		<Pressable
			role='button'
			accessibilityLabel='Create a task'
			android_disableSound
			onPress={onPress}
			style={[styles.button, { right: insets.right + FAB_OFFSET }]}
		>
			<PlusIcon color={PALETTE.white} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		bottom: FAB_OFFSET,
		width: 56,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 28,
		backgroundColor: PALETTE.primary,
	},
});
