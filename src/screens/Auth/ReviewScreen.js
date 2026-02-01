import { Image, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { GradientView } from '../../components/GradientView';
import { Steppers } from '../../components/Steppers';

function ReviewScreen() {
	const navigation = useNavigation();
	return (
		<GradientView>
			<View style={styles.container}>
				<View style={styles.box}>
					<Image
						source={require('../../assets/images/review.png')}
						style={styles.image}
					/>
					<View style={styles.center}>
						<Text style={styles.text}>Make a full schedule for</Text>
						<Text style={styles.text}>the whole week and stay</Text>
						<Text style={styles.text}>organized and productive</Text>
						<Text style={styles.text}>all days</Text>
					</View>
				</View>
				<View style={styles.footer}>
					<Steppers activeIndex={2} />
					<Button
						variant='next'
						onClick={() => navigation.navigate('Confirm')}
					/>
				</View>
			</View>
		</GradientView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	box: {
		marginTop: 92,
		alignItems: 'center',
		rowGap: 97,
	},
	center: {
		alignItems: 'center',
	},
	image: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontFamily: 'Medium',
		fontSize: 20,
		color: '#fff',
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 56,
		columnGap: 56,
		marginRight: 34,
	},
});

export default ReviewScreen;
