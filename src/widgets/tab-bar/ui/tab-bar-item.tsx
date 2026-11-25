import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const TOUCH_TARGET_HIT_SLOP = { top: 6, bottom: 6, left: 12, right: 12 };

interface TabBarItemProps {
	label: string;
	icon: ReactNode;
	color: string;
	isFocused: boolean;
	accessibilityLabel: string;
	onPress: () => void;
	onLongPress: () => void;
}

export function TabBarItem({
	label,
	icon,
	color,
	isFocused,
	accessibilityLabel,
	onPress,
	onLongPress,
}: TabBarItemProps) {
	return (
		<Pressable
			role='tab'
			accessibilityState={{ selected: isFocused }}
			accessibilityLabel={accessibilityLabel}
			hitSlop={TOUCH_TARGET_HIT_SLOP}
			onPress={onPress}
			onLongPress={onLongPress}
			android_disableSound
			style={styles.item}
		>
			{icon}
			<Text style={[styles.label, { color }]}>{label}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	item: {
		alignItems: 'center',
		gap: 4,
	},
	label: {
		fontSize: 10,
		fontWeight: 500,
	},
});
