import { format } from 'date-fns';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

interface CalendarDayProps {
	date: Date;
	isSelected: boolean;
	isToday: boolean;
	isOutsideMonth: boolean;
	onPress: (date: Date) => void;
}

export function CalendarDay({
	date,
	isSelected,
	isToday,
	isOutsideMonth,
	onPress,
}: CalendarDayProps) {
	return (
		<View style={styles.cell}>
			<Pressable
				role='button'
				accessibilityLabel={format(date, 'EEEE, MMMM d, yyyy')}
				accessibilityState={{ selected: isSelected }}
				android_disableSound
				onPress={() => onPress(date)}
				style={[
					styles.day,
					isToday && styles.dayToday,
					isSelected && styles.daySelected,
				]}
			>
				<Text
					style={[
						styles.label,
						isOutsideMonth && styles.labelOutsideMonth,
						isSelected && styles.labelSelected,
					]}
				>
					{format(date, 'd')}
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	cell: {
		flex: 1,
		alignItems: 'center',
	},
	day: {
		width: 36,
		height: 36,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderRadius: 18,
		borderColor: 'transparent',
	},
	dayToday: {
		borderColor: PALETTE.primary,
	},
	daySelected: {
		borderColor: PALETTE.primary,
		backgroundColor: PALETTE.primary,
	},
	label: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.text,
	},
	labelOutsideMonth: {
		color: PALETTE.gray,
	},
	labelSelected: {
		color: PALETTE.white,
	},
});
