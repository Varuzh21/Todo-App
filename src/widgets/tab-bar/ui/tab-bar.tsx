import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { PALETTE } from '@/shared/config/theme';

import { TabBarItem } from './tab-bar-item';

const ICON_SIZE = 20;

export function TabBar({
	state,
	descriptors,
	emitter,
	navigateToTab,
}: BottomTabBarProps) {
	return (
		<SafeAreaView edges={['bottom']} role='tablist' style={styles.container}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const isFocused = index === state.index;
				const color = isFocused ? PALETTE.primary : PALETTE.neutral40;
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
					<TabBarItem
						key={route.key}
						label={label}
						icon={options.tabBarIcon?.({
							focused: isFocused,
							color,
							size: ICON_SIZE,
						})}
						color={color}
						isFocused={isFocused}
						accessibilityLabel={`${label}, tab, ${index + 1} of ${state.routes.length}`}
						onPress={handlePress}
						onLongPress={handleLongPress}
					/>
				);
			})}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingVertical: 20,
		paddingHorizontal: 23,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: PALETTE.grayLight,
		backgroundColor: PALETTE.white,
	},
});
