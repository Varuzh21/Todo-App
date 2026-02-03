import { StyleSheet, View } from 'react-native';

export function Steppers({ activeIndex }: { activeIndex: number }) {
	return (
		<View style={styles.container}>
			{[0, 1, 2, 3].map((_, index) => (
				<View
					key={index}
					style={activeIndex === index ? styles.active : styles.stepper}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 9,
	},
	stepper: {
		width: 18,
		height: 7,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	active: {
		width: 33,
		height: 7,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
});
