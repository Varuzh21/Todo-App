import { ReactNode, createContext, useCallback, useMemo } from 'react';
import { ToastAndroid } from 'react-native';

import { useMMKVObject } from 'react-native-mmkv';

interface Todo {
	id: number;
	title: string;
	description: string;
	date: string;
	time: string;
	completed: boolean;
}

interface TodoStoreProps {
	todos: Todo[];
	createTodo: (
		title: string,
		description: string,
		date: string,
		time: string,
	) => void;
	updateTodo: (id: number) => void;
	deleteTodo: (id: number) => void;
	getOneTodo: (id: number) => Todo | undefined;
	searchTodos: (query: string) => Todo[];
}

export const TodoStore = createContext<TodoStoreProps>({
	todos: [],
	createTodo: () => {},
	updateTodo: () => {},
	deleteTodo: () => {},
	getOneTodo: () => undefined as unknown as Todo,
	searchTodos: () => [],
});

export function TodoProvider({ children }: { children: ReactNode }) {
	const [todos, setTodos] = useMMKVObject<Todo[]>('todos');

	const createTodo = useCallback(
		(title: string, description: string, date: string, time: string) => {
			const newRow = {
				id: Date.now(),
				title: title,
				description: description,
				date: date,
				time: time,
				completed: false,
			};

			setTodos(prevRows => [...(prevRows || []), newRow]);
		},
		[],
	);

	const updateTodo = useCallback((id: number) => {
		setTodos(prev =>
			(prev || []).map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
		ToastAndroid.show('Todo updated successfully', ToastAndroid.SHORT);
	}, []);

	const deleteTodo = useCallback((id: number) => {
		setTodos(prev => (prev || []).filter(todo => todo.id !== id));
		ToastAndroid.show('Todo deleted successfully', ToastAndroid.SHORT);
	}, []);

	const getOneTodo = useCallback((id: number) => {
		return (todos || []).find(todo => todo.id === id) || undefined;
	}, []);

	const searchTodos = useCallback((query: string) => {
		if (!query.trim()) return todos || [];
		const lowerCaseQuery = query.toLowerCase();

		return (todos || []).filter(
			todo =>
				todo.title.toLowerCase().includes(lowerCaseQuery) ||
				todo.description.toLowerCase().includes(lowerCaseQuery),
		);
	}, []);

	const value = useMemo(
		() => ({
			todos: todos || [],
			createTodo,
			deleteTodo,
			updateTodo,
			getOneTodo,
			searchTodos,
		}),
		[todos, createTodo, deleteTodo, updateTodo, getOneTodo, searchTodos],
	);

	return <TodoStore.Provider value={value}>{children}</TodoStore.Provider>;
}
