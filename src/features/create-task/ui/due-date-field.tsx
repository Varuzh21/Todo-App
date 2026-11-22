import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

interface DueDateFieldProps {
	value: Date;
	onChange: (date: Date) => void;
}

export function DueDateField({ value, onChange }: DueDateFieldProps) {
	return (
		<View style={styles.field}>
			<Text style={styles.label}>Date</Text>
			<DateTimePicker
				value={value}
				mode='date'
				display='compact'
				accentColor={PALETTE.primary}
				onValueChange={(_event, date) => onChange(date)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	field: {
		height: 53,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: PALETTE.grayLight,
	},
	label: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.text,
	},
});
