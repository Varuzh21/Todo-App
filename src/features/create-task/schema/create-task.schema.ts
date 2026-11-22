import { z } from 'zod';

export const createTaskSchema = z.object({
	title: z
		.string({ error: 'Enter a task title' })
		.trim()
		.min(1, 'Enter a task title'),
	dueDate: z.date({ error: 'Pick a date' }),
});

export type CreateTaskValues = z.infer<typeof createTaskSchema>;
