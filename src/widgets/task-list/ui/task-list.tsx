import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
	isTaskInStatus,
	type Task,
	TaskCard,
	type TaskStatus,
	taskQueries,
} from '@/entities/task';

import { COLORS, PALETTE } from '@/shared/config/theme';
import { EmptyState } from '@/shared/ui/empty-state';

const LIST_PADDING = 20;

interface TaskListProps {
	status: TaskStatus;
}

function getTaskKey(task: Task) {
	return String(task.id);
}

const renderTask: ListRenderItem<Task> = ({ item }) => (
	<TaskCard title={item.title} isCompleted={item.isCompleted} />
);

function TaskSeparator() {
	return <View style={styles.separator} />;
}

export function TaskList({ status }: TaskListProps) {
	const insets = useSafeAreaInsets();
	const selectByStatus = useCallback(
		(tasks: Task[]) => tasks.filter(task => isTaskInStatus(task, status)),
		[status],
	);

	const { data: tasks, isPending } = useQuery({
		...taskQueries.list(),
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
