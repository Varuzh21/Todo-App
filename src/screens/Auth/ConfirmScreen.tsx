import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';

import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '@/components/Button';
import { GradientView } from '@/components/GradientView';
import { Steppers } from '@/components/Steppers';
import { useNavigation } from '@react-navigation/native';

function ConfirmScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
	return (
		<GradientView>
			<ScrollView contentContainerStyle={styles.container}>
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
			</ScrollView>
		</GradientView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		marginVertical: 55,
	},
	box: {
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 436,
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
		columnGap: 56,
		marginRight: 34,
	},
});

export default ConfirmScreen;
