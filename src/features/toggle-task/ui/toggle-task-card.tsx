import { memo } from 'react';

import { type Task, TaskCard } from '@/entities/task';

import { useToggleTask } from '../model/use-toggle-task';

interface ToggleTaskCardProps {
	task: Task;
}

export const ToggleTaskCard = memo(function ToggleTaskCard({
	task,
}: ToggleTaskCardProps) {
	const { setTaskCompleted } = useToggleTask();

	function toggleTask() {
		setTaskCompleted({
			userId: task.userId,
			taskId: task.id,
			isCompleted: !task.isCompleted,
		});
	}

	return (
		<TaskCard
			title={task.title}
			isCompleted={task.isCompleted}
			onPress={toggleTask}
		/>
	);
});
