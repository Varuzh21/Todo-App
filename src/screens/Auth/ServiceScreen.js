import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GradientView } from '../../components/GradientView'

function ServiceScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<GradientView>
				<View>
          <Text style={styles.text}>ServiceScreen</Text>
				</View>
			</GradientView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		height: 1
	},
	text: {
		fontFamily: 'Medium',
		fontWeight: 500,
		fontSize: 20,
		color: '#fff'
	}
})

export default ServiceScreen