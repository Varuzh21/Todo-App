import { Image, StyleSheet, Text, View } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { GradientView } from '../../components/GradientView';
import { Steppers } from '../../components/Steppers';

function ServiceScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
	return (
		<GradientView>
			<View style={styles.container}>
				<View style={styles.box}>
					<Image
						source={require('../../assets/images/service.png')}
						style={styles.image}
					/>
					<View style={styles.center}>
						<Text style={styles.text}>Plan your tasks to do, that</Text>
						<Text style={styles.text}>way you’ll stay organized</Text>
						<Text style={styles.text}>and you won’t skip any</Text>
					</View>
				</View>
				<View style={styles.footer}>
					<Steppers activeIndex={0} />
					<Button
						variant='next'
						onClick={() => navigation.navigate('Detail')}
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
		marginTop: 55,
		alignItems: 'center',
		rowGap: 65,
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

export default ServiceScreen;