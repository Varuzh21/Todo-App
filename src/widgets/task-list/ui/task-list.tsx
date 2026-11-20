import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import {
	ActivityIndicator,
	FlatList,
	type ListRenderItem,
	StyleSheet,
	View,
} from 'react-native';

import {
	isTaskInStatus,
	type Task,
	TaskCard,
	type TaskStatus,
	taskQueries,
} from '@/entities/task';

import { COLORS, PALETTE } from '@/shared/config/theme';
import { EmptyState } from '@/shared/ui/empty-state';

interface TaskListProps {
	status: TaskStatus;
}

function getTaskKey(task: Task) {
	return String(task.id);
}

const renderTask: ListRenderItem<Task> = ({ item }) => (
	<TaskCard title={item.title} isCompleted={item.isCompleted} />
);

export function TaskList({ status }: TaskListProps) {
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
			<View style={styles.loader}>
				<ActivityIndicator color={PALETTE.primary} />
			</View>
		);
	}

	return (
		<FlatList
			data={tasks}
			keyExtractor={getTaskKey}
			renderItem={renderTask}
			ListEmptyComponent={<EmptyState message='Nothing to show here' />}
			style={styles.list}
			contentContainerStyle={styles.content}
		/>
	);
}

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.background,
	},
	list: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	content: {
		flexGrow: 1,
		gap: 20,
		padding: 20,
	},
});
