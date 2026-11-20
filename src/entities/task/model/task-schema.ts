import { z } from 'zod';

// The API calls the text `todo` and the flag `completed`; the app uses clearer names.
export const taskSchema = z
	.object({
		id: z.number(),
		todo: z.string(),
		completed: z.boolean(),
		userId: z.number(),
	})
	.transform(({ id, todo, completed, userId }) => ({
		id,
		title: todo,
		isCompleted: completed,
		userId,
	}));

export const tasksResponseSchema = z.object({
	todos: z.array(taskSchema),
	total: z.number(),
});

export type Task = z.infer<typeof taskSchema>;
