import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AuthStackParamList } from '@/navigation/AuthNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Button } from '@/components/Button'
import { GradientView } from '@/components/GradientView'
import { Steppers } from '@/components/Steppers'

function DetailScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
	return (
		<GradientView>
			<ScrollView contentContainerStyle={styles.container}>
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
		width: 300,
		height: 300,
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

export default DetailScreen;
