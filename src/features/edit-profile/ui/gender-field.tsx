import { type MenuAction, MenuView } from '@expo/ui/community/menu';
import { StyleSheet, Text, View } from 'react-native';

import type { Gender } from '@/entities/user';
import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';
import { ChevronDownIcon } from '@/shared/ui/icons';

const GENDER_LABELS = {
	male: 'Male',
	female: 'Female',
} as const satisfies Record<Gender, string>;

interface GenderFieldProps {
	value: Gender | null;
	onChange: (gender: Gender) => void;
	isDisabled?: boolean;
}

function isGender(id: string): id is Gender {
	return id in GENDER_LABELS;
}

function getGenderActions(value: Gender | null): MenuAction[] {
	return Object.entries(GENDER_LABELS).map(([id, title]) => ({
		id,
		title,
		state: id === value ? 'on' : 'off',
	}));
}

export function GenderField({
	value,
	onChange,
	isDisabled = false,
}: GenderFieldProps) {
	const displayValue = value ? GENDER_LABELS[value] : 'Select';

	const field = (
		<View style={styles.field}>
			<Text style={styles.label}>Gender</Text>
			<View style={styles.value}>
				<Text style={[styles.valueText, !value && styles.placeholder]}>
					{displayValue}
				</Text>
				{!isDisabled && <ChevronDownIcon color={COLORS.textSecondary} />}
			</View>
		</View>
	);

	if (isDisabled) {
		return field;
	}

	return (
		<MenuView
			title='Gender'
			style={styles.menu}
			actions={getGenderActions(value)}
			onPressAction={({ nativeEvent }) => {
				if (isGender(nativeEvent.event)) {
					onChange(nativeEvent.event);
				}
			}}
		>
			{field}
		</MenuView>
	);
}

const styles = StyleSheet.create({
	menu: {
		width: '100%',
	},
	field: {
		width: '100%',
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
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	valueText: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.text,
	},
	placeholder: {
		color: COLORS.textSecondary,
	},
});
