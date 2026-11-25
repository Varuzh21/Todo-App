import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';
import { Button } from '@/shared/ui/button';
import { SuccessIcon } from '@/shared/ui/icons';

interface CreateTaskSuccessProps {
	onProceed: () => void;
}

export function CreateTaskSuccess({ onProceed }: CreateTaskSuccessProps) {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<SuccessIcon />
				<View style={styles.texts}>
					<Text style={styles.title}>Successful</Text>
					<Text style={styles.message}>
						You have successfully created a Task
					</Text>
				</View>
			</View>
			<Button label='Proceed' onPress={onProceed} style={styles.button} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 48,
	},
	content: {
		alignItems: 'center',
		gap: 24,
	},
	texts: {
		alignItems: 'center',
		gap: 8,
	},
	title: {
		fontFamily: FONTS.galanoMedium,
		fontSize: 18,
		color: PALETTE.success,
	},
	message: {
		maxWidth: 200,
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		textAlign: 'center',
		color: COLORS.text,
	},
	button: {
		alignSelf: 'center',
		width: '70%',
	},
});
