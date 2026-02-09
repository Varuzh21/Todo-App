import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Right from '@/assets/icons/right.svg';
import Success from '@/assets/icons/success.svg';

interface TaskItemProps {
	title: string;
	subTitle: string;
	isCompleted: boolean;
	onClick: () => void;
}

export function TaskItem({
	title,
	subTitle,
	isCompleted,
	onClick,
}: TaskItemProps) {
	return (
		<TouchableOpacity
			style={[styles.container, isCompleted && styles.containerCompleted]}
			onPress={onClick}
		>
			<View style={styles.contentWrapper}>
				<View style={styles.leftSection}>
					{isCompleted && <Success />}
					<View>
						<Text style={styles.title}>{title}</Text>
						<Text style={styles.subTitle}>{subTitle}</Text>
					</View>
				</View>
				<Right />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: '#fff',
		paddingVertical: 6.5,
		paddingHorizontal: 22.5,
		borderRadius: 5,
	},
	containerCompleted: {
		paddingHorizontal: 17,
	},
	contentWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	leftSection: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 14,
	},
	title: {
		fontFamily: 'Medium',
		fontSize: 14,
		color: '#000',
	},
	subTitle: {
		fontFamily: 'Regular',
		fontSize: 10,
		color: '#000',
	},
});
