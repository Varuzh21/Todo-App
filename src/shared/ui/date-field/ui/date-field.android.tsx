import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import { format } from 'date-fns';
import { Fragment, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

interface DateFieldProps {
	label: string;
	value: Date;
	onChange: (date: Date) => void;
	isDisabled?: boolean;
	maximumDate?: Date;
}

const DISPLAY_FORMAT = 'MMM d, yyyy';

// Android shows the picker as a dialog that opens on mount, so it is mounted only while open.
export function DateField({
	label,
	value,
	onChange,
	isDisabled = false,
	maximumDate,
}: DateFieldProps) {
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const displayValue = format(value, DISPLAY_FORMAT);

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
				accessibilityLabel={`${label}, ${displayValue}`}
				accessibilityState={{ disabled: isDisabled }}
				android_disableSound
				disabled={isDisabled}
				onPress={openPicker}
				style={styles.field}
			>
				<Text style={styles.label}>{label}</Text>
				<Text style={[styles.value, isDisabled && styles.valueDisabled]}>
					{displayValue}
				</Text>
			</Pressable>
			{isPickerOpen && (
				<DateTimePicker
					value={value}
					mode='date'
					maximumDate={maximumDate}
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
		backgroundColor: PALETTE.white,
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
	valueDisabled: {
		color: COLORS.text,
	},
});
