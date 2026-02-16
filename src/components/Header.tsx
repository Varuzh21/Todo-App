import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Left from '@/assets/icons/left.svg';

import { useNavigation } from '@react-navigation/native';

export function Header({ title }: { title: string }) {
	const navigate = useNavigation();
	return (
		<View style={styles.header}>
			{title === 'Settings' ? null : (
				<TouchableOpacity
					onPress={() => navigate.goBack()}
					style={styles.button}
				>
					<Left />
				</TouchableOpacity>
			)}
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 18,
		paddingTop: 30,
		paddingBottom: 10,
		minHeight: 80,
		position: 'relative',
	},
	button: {
		position: 'absolute',
		left: 18,
		top: 30,
		width: 30,
		height: 30,
		backgroundColor: '#fff',
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
	},
	titleContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontFamily: 'Medium',
		fontSize: 25,
		color: '#fff',
		textAlign: 'center',
	},
});
