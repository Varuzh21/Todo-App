import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Calendar } from 'react-native-calendars';

import { GradientView } from '@/components/GradientView';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Wrapper } from '@/components/Wrapper';

import { useTodo } from '@/hooks/useTodo';
import { formatDate } from '@/utils/dateFormatter';

function CalendarScreen() {
	const today = new Date().toISOString().split('T')[0];
	const [selected, setSelected] = useState(today);
	const [form, setForm] = useState({
		title: '',
		description: '',
	});

	const { createTodo } = useTodo();

	const handleCreateTodo = useCallback(() => {
		if (!form.title.trim() || !form.description.trim()) {
			return;
		}

		const date = new Date();
		const hour = date.toTimeString();

		const time = `${hour.split(' ')[0].substring(0, 5)}`;

		const fullDate = `${formatDate(selected)} `;

		createTodo(form.title, form.description, fullDate, time);
		setForm({ title: '', description: '' });
	}, [selected, form]);

	return (
		<GradientView>
			<Wrapper>
				<View style={styles.container}>
					<View style={styles.contentStack}>
						<Calendar
							minDate={today}
							initialDate={new Date().toISOString().split('T')[0]}
							onDayPress={day => {
								setSelected(day.dateString);
							}}
							theme={{
								textDisabledColor: '#d9e1e8',
								selectedDayBackgroundColor: '#0EA5E9',
								selectedDayTextColor: '#ffffff',
							}}
							markedDates={{
								[selected]: {
									selected: true,
									disableTouchEvent: true,
								},
							}}
							style={{ borderRadius: 10 }}
						/>
						<View style={styles.card}>
							<View style={styles.innerStack}>
								<Text style={styles.title}>
									Set task for {formatDate(selected)}
								</Text>
								<View style={styles.formGroup}>
									<Input
										variant='task'
										placeholder='Task'
										value={form.title}
										onChange={text => setForm({ ...form, title: text })}
									/>
									<Input
										variant='description'
										placeholder='Description'
										value={form.description}
										onChange={text => setForm({ ...form, description: text })}
									/>
									<Button
										variant='button'
										title='Add task'
										onClick={handleCreateTodo}
									/>
								</View>
							</View>
						</View>
					</View>
				</View>
			</Wrapper>
		</GradientView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 25,
	},
	contentStack: {
		flexDirection: 'column',
		gap: 16,
	},
	card: {
		width: '100%',
		borderRadius: 10,
		backgroundColor: '#fff',
		paddingTop: 10,
		paddingBottom: 20,
		paddingLeft: 15,
		paddingRight: 11,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	innerStack: {
		flexDirection: 'column',
		gap: 12,
	},
	formGroup: {
		flexDirection: 'column',
		gap: 12,
	},
	title: {
		fontFamily: 'Medium',
		fontSize: 14,
		color: '#000',
	},
});

export default CalendarScreen;
