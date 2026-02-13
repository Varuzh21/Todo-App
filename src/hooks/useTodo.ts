import { useContext } from 'react';
import { TodoStore } from '@/contexts/TodoStore';

export function useTodo() {
	const todo = useContext(TodoStore);

	if (!todo)
		throw new Error('useTodo mot be used with in TodoStore');

	return todo;
}
