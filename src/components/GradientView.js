import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export function GradientView(props) {
	return (
		<LinearGradient
			colors={['#1253aa', '#05243e']}
			start={{ x: 0.5, y: 0 }}
			end={{ x: 0.5, y: 1 }}
			style={styles.container}
		>
			{props.children}
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});