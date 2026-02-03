import { Image, StyleSheet, Text, View } from 'react-native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button'
import { GradientView } from '../../components/GradientView'
import { Steppers } from '../../components/Steppers'

function ConfirmScreen ()  {
	const navigation =
		useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
	return (
		<GradientView>
			<View style={styles.container}>
				<View style={styles.box}>
					<Image
						source={require('../../assets/images/confirm.png')}
						style={styles.image}
					/>
					<View style={styles.center}>
						<Text style={styles.text}>You informations are </Text>
						<Text style={styles.text}>secure with us</Text>
					</View>
				</View>
				<View style={styles.footer}>
					<Steppers activeIndex={3} />
					<Button
						variant='done'
						onClick={() => navigation.navigate('SingIn')}
					/>
				</View>
			</View>
		</GradientView>
	)
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	box: {
		marginTop: 74,
		alignItems: 'center',
		rowGap: 79,
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
})

export default ConfirmScreen