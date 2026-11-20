import type { MaterialTopTabBarProps } from 'expo-router/js-top-tabs';
import { StyleSheet, View } from 'react-native';

import { COLORS, PALETTE } from '@/shared/config/theme';

import { TopTabBarItem } from './top-tab-bar-item';

export function TopTabBar({
	state,
	descriptors,
	emitter,
	navigateToTab,
	insets,
}: MaterialTopTabBarProps) {
	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<View role='tablist' style={styles.tabs}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const isFocused = index === state.index;
					const label = options.title ?? route.name;

					function handlePress() {
						const event = emitter.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigateToTab(route.key);
						}
					}

					function handleLongPress() {
						emitter.emit({ type: 'tabLongPress', target: route.key });
					}

					return (
						<TopTabBarItem
							key={route.key}
							label={label}
							isFocused={isFocused}
							accessibilityLabel={`${label}, tab, ${index + 1} of ${state.routes.length}`}
							onPress={handlePress}
							onLongPress={handleLongPress}
						/>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.background,
	},
	tabs: {
		flexDirection: 'row',
		gap: 24,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: PALETTE.grayLight,
	},
});
