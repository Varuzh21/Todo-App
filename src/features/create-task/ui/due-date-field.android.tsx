import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import { format } from 'date-fns';
import { Fragment, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

interface DueDateFieldProps {
	value: Date;
	onChange: (date: Date) => void;
}

const DISPLAY_FORMAT = 'MMM d, yyyy';

export function DueDateField({ value, onChange }: DueDateFieldProps) {
	const [isPickerOpen, setIsPickerOpen] = useState(false);

	function openPicker() {
		setIsPickerOpen(true);
	}

	function closePicker() {
		setIsPickerOpen(false);
	}

	function handleValueChange(date: Date) {
		closePicker();
		onChange(date);
	}

	return (
		<Fragment>
			<Pressable
				accessibilityRole='button'
				accessibilityLabel={`Date, ${format(value, DISPLAY_FORMAT)}`}
				android_disableSound
				onPress={openPicker}
				style={styles.field}
			>
				<Text style={styles.label}>Date</Text>
				<Text style={styles.value}>{format(value, DISPLAY_FORMAT)}</Text>
			</Pressable>
			{isPickerOpen && (
				<DateTimePicker
					value={value}
					mode='date'
					accentColor={PALETTE.primary}
					onValueChange={(_event, date) => handleValueChange(date)}
					onDismiss={closePicker}
				/>
			)}
		</Fragment>
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
	value: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: PALETTE.primary,
	},
});
