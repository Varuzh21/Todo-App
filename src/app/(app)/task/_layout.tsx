import { TopTabs } from 'expo-router/js-top-tabs';
import { StyleSheet } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

export const unstable_settings = {
	anchor: 'index',
};

export default function TaskLayout() {
	return (
		<TopTabs
			backBehavior='initialRoute'
			screenOptions={{
				tabBarScrollEnabled: true,
				tabBarGap: 24,
				tabBarActiveTintColor: PALETTE.primary,
				tabBarInactiveTintColor: PALETTE.neutral50,
				tabBarPressColor: 'transparent',
				tabBarStyle: styles.tabBar,
				tabBarContentContainerStyle: styles.tabBarContent,
				tabBarItemStyle: styles.tabBarItem,
				tabBarLabelStyle: styles.tabBarLabel,
				tabBarIndicatorStyle: styles.tabBarIndicator,
			}}
		>
			<TopTabs.Screen name='index' options={{ title: 'Behind Schedule' }} />
			<TopTabs.Screen name='upcoming' options={{ title: 'Upcoming' }} />
			<TopTabs.Screen name='completed' options={{ title: 'Completed' }} />
		</TopTabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: COLORS.background,
		borderBottomWidth: 1,
		borderBottomColor: PALETTE.grayLight,
		elevation: 0,
		shadowOpacity: 0,
		paddingTop: 50,
	},
	tabBarContent: {
		paddingHorizontal: 20,
	},
	tabBarItem: {
		width: 'auto',
		paddingHorizontal: 0,
	},
	tabBarLabel: {
		fontFamily: FONTS.galanoMedium,
		fontSize: 16,
		textTransform: 'none',
		margin: 0,
	},
	tabBarIndicator: {
		height: 2,
		backgroundColor: PALETTE.primary,
	},
});
