import { z } from 'zod';

export const taskSchema = z.object({
	id: z.string(),
	title: z.string(),
	isCompleted: z.boolean(),
	dueDate: z.iso.date(),
	userId: z.number(),
	createdAt: z.iso.datetime(),
});

export const tasksSchema = z.array(taskSchema);

export type Task = z.infer<typeof taskSchema>;
