import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FONTS, PALETTE } from '@/shared/config/theme';

interface TopTabBarItemProps {
	label: string;
	isFocused: boolean;
	accessibilityLabel: string;
	onPress: () => void;
	onLongPress: () => void;
}

export function TopTabBarItem({
	label,
	isFocused,
	accessibilityLabel,
	onPress,
	onLongPress,
}: TopTabBarItemProps) {
	return (
		<Pressable
			role='tab'
			accessibilityState={{ selected: isFocused }}
			accessibilityLabel={accessibilityLabel}
			onPress={onPress}
			onLongPress={onLongPress}
			android_disableSound
			style={styles.item}
		>
			<Text style={[styles.label, isFocused && styles.labelFocused]}>
				{label}
			</Text>
			{isFocused && <View style={styles.indicator} />}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	item: {
		paddingVertical: 12,
	},
	label: {
		fontFamily: FONTS.galanoMedium,
		fontSize: 14,
		color: PALETTE.neutral50,
	},
	labelFocused: {
		color: PALETTE.primary,
	},
	indicator: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: -1,
		height: 2,
		backgroundColor: PALETTE.primary,
	},
});
