import { ReactNode, createContext, useCallback, useMemo } from 'react';

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
}

export const TodoStore = createContext<TodoStoreProps>({
	todos: [],
	createTodo: () => {},
	updateTodo: () => {},
	deleteTodo: () => {},
	getOneTodo: () => undefined as unknown as Todo,
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
		[todos, setTodos],
	);

	const updateTodo = useCallback(
		(id: number) => {
			setTodos(prev =>
				(prev || []).map(todo =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo,
				),
			);
		},
		[todos, setTodos],
	);

	const deleteTodo = useCallback(
		(id: number) => {
			setTodos(prev => (prev || []).filter(todo => todo.id !== id));
		},
		[todos, setTodos],
	);

	const getOneTodo = useCallback(
		(id: number) => {
			return (todos || []).find(todo => todo.id === id) || undefined;
		},
		[todos],
	);

	const value = useMemo(
		() => ({
			todos: todos || [],
			createTodo,
			deleteTodo,
			updateTodo,
			getOneTodo,
		}),
		[todos, createTodo, deleteTodo, updateTodo, getOneTodo],
	);

	return <TodoStore.Provider value={value}>{children}</TodoStore.Provider>;
}
