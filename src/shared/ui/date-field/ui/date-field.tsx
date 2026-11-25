import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

interface DateFieldProps {
	label: string;
	value: Date;
	onChange: (date: Date) => void;
	isDisabled?: boolean;
	maximumDate?: Date;
}

export function DateField({
	label,
	value,
	onChange,
	isDisabled = false,
	maximumDate,
}: DateFieldProps) {
	return (
		<View style={styles.field}>
			<Text style={styles.label}>{label}</Text>
			<DateTimePicker
				value={value}
				mode='date'
				display='compact'
				disabled={isDisabled}
				maximumDate={maximumDate}
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
		backgroundColor: PALETTE.white,
	},
	label: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.text,
	},
});
