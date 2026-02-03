import { Image, StyleSheet, Text, View } from 'react-native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button'
import { GradientView } from '../../components/GradientView'
import { Steppers } from '../../components/Steppers'

function DetailScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
	return (
		<GradientView>
			<View style={styles.container}>
				<View style={styles.box}>
					<Image
						source={require('../../assets/images/detail.png')}
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
					<Steppers activeIndex={1} />
					<Button
						variant='next'
						onClick={() => navigation.navigate('Review')}
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
		marginTop: 60,
		alignItems: 'center',
		rowGap: 60,
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

export default DetailScreen;
