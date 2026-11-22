import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUserId } from '@/entities/session';
import type { Task } from '@/entities/task';
import { userQueries } from '@/entities/user';
import { CreateTaskSheet, useCreateTaskSheet } from '@/features/create-task';
import { ToggleTaskCard } from '@/features/toggle-task';
import { COLORS } from '@/shared/config/theme';
import { ListEmpty } from '@/shared/ui/list-empty';

import { useTaskSummary } from '../model/use-task-summary';
import { DashboardHeader } from './dashboard-header';
import { DashboardOverview } from './dashboard-overview';

const SCREEN_PADDING = 20;

const NO_CONTENT_ANCHORING = { disabled: true };

function getTaskKey(task: Task) {
	return task.id;
}

const renderTask: ListRenderItem<Task> = ({ item }) => (
	<ToggleTaskCard task={item} />
);

function TaskSeparator() {
	return <View style={styles.separator} />;
}

function getFirstName(fullName: string | undefined) {
	return fullName?.trim().split(/\s+/)[0] || null;
}

export function MenuScreen() {
	const userId = useUserId();
	const { sheetRef, openSheet } = useCreateTaskSheet();
	const { data: summary, isPending } = useTaskSummary(userId);
	const { data: profile } = useQuery(userQueries.profile(userId));

	return (
		<SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
			<View style={styles.header}>
				<DashboardHeader firstName={getFirstName(profile?.fullName)} />
			</View>

			<CreateTaskSheet sheetRef={sheetRef} />

			<FlashList
				data={summary?.todayTasks ?? []}
				keyExtractor={getTaskKey}
				renderItem={renderTask}
				ItemSeparatorComponent={TaskSeparator}
				maintainVisibleContentPosition={NO_CONTENT_ANCHORING}
				ListHeaderComponent={
					summary && (
						<DashboardOverview summary={summary} onAddTask={openSheet} />
					)
				}
				ListEmptyComponent={
					<ListEmpty isPending={isPending} message='No tasks for today' />
				}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		paddingHorizontal: SCREEN_PADDING,
		paddingTop: 12,
		paddingBottom: 20,
	},
	listContent: {
		paddingHorizontal: SCREEN_PADDING,
		paddingBottom: SCREEN_PADDING,
	},
	separator: {
		height: 16,
	},
});
