import { TopTabs } from 'expo-router/js-top-tabs';
import { StyleSheet, View } from 'react-native';

import {
	CreateTaskFab,
	CreateTaskSheet,
	useCreateTaskSheet,
} from '@/features/create-task';
import { TopTabBar } from '@/widgets/top-tab-bar';

export const unstable_settings = {
	anchor: 'index',
};

export default function TaskLayout() {
	const { sheetRef, openSheet } = useCreateTaskSheet();

	return (
		<View style={styles.container}>
			<TopTabs
				backBehavior='initialRoute'
				tabBar={props => <TopTabBar {...props} />}
			>
				<TopTabs.Screen name='index' options={{ title: 'Behind Schedule' }} />
				<TopTabs.Screen name='upcoming' options={{ title: 'Upcoming' }} />
				<TopTabs.Screen name='completed' options={{ title: 'Completed' }} />
			</TopTabs>
			<CreateTaskFab onPress={openSheet} />
			<CreateTaskSheet sheetRef={sheetRef} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
