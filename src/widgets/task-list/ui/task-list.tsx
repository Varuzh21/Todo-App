import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUserId } from '@/entities/session';
import {
	isTaskInStatus,
	type Task,
	type TaskStatus,
	taskQueries,
} from '@/entities/task';
import { ToggleTaskCard } from '@/features/toggle-task';

import { COLORS, PALETTE } from '@/shared/config/theme';
import { toDateKey } from '@/shared/lib/date';
import { EmptyState } from '@/shared/ui/empty-state';

const LIST_PADDING = 20;

// FlashList v2 anchors the visible items by default (built for chat). New tasks
// are prepended, so anchoring would push them above the viewport.
const NO_CONTENT_ANCHORING = { disabled: true };

interface TaskListProps {
	status: TaskStatus;
}

function getTaskKey(task: Task) {
	return String(task.id);
}

const renderTask: ListRenderItem<Task> = ({ item }) => (
	<ToggleTaskCard task={item} />
);

function TaskSeparator() {
	return <View style={styles.separator} />;
}

export function TaskList({ status }: TaskListProps) {
	const insets = useSafeAreaInsets();
	const userId = useUserId();
	const todayKey = toDateKey(new Date());

	const selectByStatus = useCallback(
		(tasks: Task[]) =>
			tasks.filter(task => isTaskInStatus(task, status, todayKey)),
		[status, todayKey],
	);

	const { data: tasks, isPending } = useQuery({
		...taskQueries.list(userId),
		select: selectByStatus,
	});

	if (isPending) {
		return (
			<View style={styles.screen}>
				<ActivityIndicator color={PALETTE.primary} />
			</View>
		);
	}

	if (!tasks?.length) {
		return (
			<View style={styles.screen}>
				<EmptyState message='Nothing to show here' />
			</View>
		);
	}

	return (
		<FlashList
			data={tasks}
			keyExtractor={getTaskKey}
			renderItem={renderTask}
			ItemSeparatorComponent={TaskSeparator}
			maintainVisibleContentPosition={NO_CONTENT_ANCHORING}
			style={styles.list}
			contentContainerStyle={{
				paddingVertical: LIST_PADDING,
				paddingLeft: insets.left + LIST_PADDING,
				paddingRight: insets.right + LIST_PADDING,
			}}
			showsVerticalScrollIndicator={false}
		/>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.background,
	},
	list: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	separator: {
		height: LIST_PADDING,
	},
});
