import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { useTodo } from '@/hooks/useTodo';

type TaskDetailRouteProp = RouteProp<
	{ TaskDetail: { taskId: number } },
	'TaskDetail'
>;

import { GradientView } from '@/components/GradientView';
import { Wrapper } from '@/components/Wrapper';

import Calendar from '@/assets/icons/calendar.svg';
import Clock from '@/assets/icons/clock.svg';
import Delete from '@/assets/icons/delete.svg';
import Pin from '@/assets/icons/pin.svg';
import Success from '@/assets/icons/success.svg';

function TaskDetail() {
	const { getOneTodo, deleteTodo, updateTodo } = useTodo();
	const navigation = useNavigation();
	const route = useRoute<TaskDetailRouteProp>();
	const { taskId } = route.params;

	const task = getOneTodo(Number(taskId));

	const handleDelete = useCallback(() => {
		deleteTodo(Number(taskId));
		navigation.goBack();
	}, []);

	return (
		<GradientView>
			<Wrapper>
				<View style={styles.container}>
					<View style={styles.header}>
						<View style={styles.headerContent}>
							<Text style={styles.title}>{task?.title}</Text>
							<View style={styles.subHeaderContent}>
								<View style={styles.dateContainer}>
									<Calendar width={20} height={20} fill='#E6E6E6' />
									<Text style={styles.date}>{task?.date}</Text>
								</View>
								<Text style={styles.date}>|</Text>
								<View style={styles.dateContainer}>
									<Clock width={20} height={20} fill='#E6E6E6' />
									<Text style={styles.date}>{task?.time}</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.content}>
						<Text style={styles.contentText}>{task?.description}</Text>
					</View>
					<View style={styles.footer}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => updateTodo(Number(taskId))}
						>
							<View style={styles.buttonWrapper}>
								<Success width={24} height={24} />
								<Text style={styles.buttonText}>Done</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={handleDelete}>
							<View style={styles.buttonWrapper}>
								<Delete width={24} height={24} />
								<Text style={styles.buttonText}>Delete</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button}>
							<View style={styles.buttonWrapper}>
								<Pin width={24} height={24} />
								<Text style={styles.buttonText}>Pin</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Wrapper>
		</GradientView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	header: {
		paddingBottom: 25,
		borderBottomWidth: 1,
		borderColor: '#ffffff40',
	},
	headerContent: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 4,
	},
	title: {
		fontFamily: 'Medium',
		fontSize: 18,
		color: '#fff',
	},
	subHeaderContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	dateContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		gap: 4,
	},
	date: {
		fontSize: 14,
		fontFamily: 'Regular',
		color: '#E6E6E6',
	},
	content: {
		marginTop: 24,
	},
	contentText: {
		fontSize: 14,
		fontFamily: 'Medium',
		color: '#E6E6E6',
		letterSpacing: 0.9,
	},
	footer: {
		marginTop: 58,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	button: {
		width: '30%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 11,
		paddingBottom: 6,
		backgroundColor: '#05243E',
		borderRadius: 10,
		boxShadow: '0 0 10px 1px rgba(255, 255, 255, 0.25)',
	},
	buttonWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 13,
	},
	buttonText: {
		fontSize: 14,
		fontFamily: 'Medium',
		color: '#E6E6E6',
		letterSpacing: 0.9,
	},
});

export default TaskDetail;
