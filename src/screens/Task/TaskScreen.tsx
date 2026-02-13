import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, Text, View } from 'react-native';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { useTodo } from '@/hooks/useTodo';

import { Button } from '@/components/Button';
import { GradientView } from '@/components/GradientView';
import { Input } from '@/components/Input';
import { Search } from '@/components/Search';
import { Select } from '@/components/Select';
import { TaskItem } from '@/components/TaskItem';
import { Wrapper } from '@/components/Wrapper';

function TaskScreen() {
	const [form, setForm] = useState({
		title: '',
		description: '',
	});
	const { todos, createTodo } = useTodo();

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['60%', '90%'], []);

	const date = new Date();
	const hour = date.toTimeString();
	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'short' });
	const year = date.getFullYear();

	const fullDate = `${month} ${day} ${year}`;
	const time = `${hour.split(' ')[0].substring(0, 5)}`;

	const handleCreateTodo = useCallback(() => {
		if (!form.title.trim() || !form.description.trim()) {
			return;
		}
		
		createTodo(form.title, form.description, fullDate, time);

		setForm({ title: '', description: '' });
		handleClose();
	}, [form]);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleInputFocus = useCallback(() => {
		bottomSheetModalRef.current?.snapToIndex(2);
	}, []);

	const handleClose = useCallback(() => {
		bottomSheetModalRef.current?.close();
		Keyboard.dismiss();
	}, []);

	const ListHeader = useCallback(
		() => (
			<View>
				<View style={styles.header}>
					<Search value='' />
					<Select />
				</View>
				<Text style={styles.sectionTitle}>Tasks List</Text>
			</View>
		),
		[],
	);

	return (
		<>
			<GradientView>
				<Wrapper>
					<View style={styles.container}>
						<FlatList
							data={todos}
							keyExtractor={item => item.id.toString()}
							ListHeaderComponent={ListHeader}
							contentContainerStyle={styles.listContent}
							renderItem={({ item }) => (
								<TaskItem
									title={item.title}
									subTitle={`${item.date} | ${item.time}`}
									onClick={() => {}}
								/>
							)}
						/>
						<View style={styles.buttonContainer}>
							<Button variant='add' onClick={handlePresentModalPress} />
						</View>
					</View>
				</Wrapper>
			</GradientView>

			<BottomSheetModal
				enablePanDownToClose={true}
				ref={bottomSheetModalRef}
				snapPoints={snapPoints}
				index={1}
				onDismiss={() => Keyboard.dismiss()}
				keyboardBehavior='extend'
				keyboardBlurBehavior='none'
				android_keyboardInputMode='adjustResize'
			>
				<BottomSheetView style={styles.contentContainer}>
					<View style={styles.formContainer}>
						<View style={styles.inputGroup}>
							<Input
								variant='task'
								placeholder='task'
								onFocus={handleInputFocus}
								value={form.title}
								onChange={text => setForm({ ...form, title: text })}
							/>
							<Input
								variant='description'
								placeholder='Description'
								onFocus={handleInputFocus}
								value={form.description}
								onChange={text => setForm({ ...form, description: text })}
							/>
						</View>
						<View style={styles.bottomSection}>
							<View style={styles.row}>
								<View style={styles.halfInput}>
									<Input
										variant='date'
										placeholder='Date'
										value={fullDate}
										disabled={false}
									/>
								</View>
								<View style={styles.halfInput}>
									<Input
										variant='time'
										placeholder='Time'
										value={time}
										disabled={false}
									/>
								</View>
							</View>
							<View style={styles.row}>
								<View style={styles.halfInput}>
									<Button
										variant='cancel'
										title='cancel'
										onClick={handleClose}
									/>
								</View>
								<View style={styles.halfInput}>
									<Button
										variant='button'
										title='create'
										onClick={handleCreateTodo}
									/>
								</View>
							</View>
						</View>
					</View>
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBlock: 45,
	},
	wrapper: {
		flex: 1,
		backgroundColor: 'red',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 46,
	},
	sectionTitle: {
		fontFamily: 'Regular',
		fontSize: 16,
		color: '#fff',
	},
	listContent: {
		gap: 20,
	},
	buttonContainer: {
		alignItems: 'flex-end',
	},
	contentContainer: {
		flex: 1,
		paddingTop: 54,
		paddingInline: 26.5,
		paddingBottom: 25,
	},
	formContainer: {
		flexDirection: 'column',
		rowGap: 22,
	},
	inputGroup: {
		flexDirection: 'column',
		rowGap: 34,
	},
	bottomSection: {
		flexDirection: 'column',
		gap: 20,
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 24,
	},
	halfInput: {
		width: '47%',
	},
});

export default TaskScreen;
