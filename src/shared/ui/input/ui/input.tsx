import { type ReactNode, useState } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	type TextInputProps,
	View,
} from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';
import { EyeClosedIcon, EyeOpenIcon } from '@/shared/ui/icons';

const TOGGLE_HIT_SLOP = 12;

type FocusEvent = Parameters<NonNullable<TextInputProps['onFocus']>>[0];
type BlurEvent = Parameters<NonNullable<TextInputProps['onBlur']>>[0];

interface InputProps extends TextInputProps {
	icon?: ReactNode;
	error?: string;
}

export function Input({
	icon,
	error,
	style,
	secureTextEntry,
	onFocus,
	onBlur,
	...props
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [isTextHidden, setIsTextHidden] = useState(true);
	const hasError = Boolean(error);
	const isPassword = secureTextEntry === true;

	function togglePasswordVisibility() {
		setIsTextHidden(isHidden => !isHidden);
	}

	function handleFocus(event: FocusEvent) {
		setIsFocused(true);
		onFocus?.(event);
	}

	function handleBlur(event: BlurEvent) {
		setIsFocused(false);
		onBlur?.(event);
	}

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.field,
					isFocused && styles.fieldFocused,
					hasError && styles.fieldError,
				]}
			>
				{icon}
				<TextInput
					placeholderTextColor={PALETTE.neutral50}
					selectionColor={PALETTE.primary}
					style={[styles.input, style]}
					secureTextEntry={isPassword && isTextHidden}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...props}
				/>
				{isPassword ? (
					<Pressable
						accessibilityRole='button'
						accessibilityLabel={
							isTextHidden ? 'Show password' : 'Hide password'
						}
						hitSlop={TOGGLE_HIT_SLOP}
						onPress={togglePasswordVisibility}
					>
						{isTextHidden ? (
							<EyeClosedIcon color={COLORS.text} />
						) : (
							<EyeOpenIcon color={COLORS.text} />
						)}
					</Pressable>
				) : null}
			</View>
			{hasError && <Text style={styles.error}>{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 6,
	},
	field: {
		height: 53,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: PALETTE.grayLight,
		backgroundColor: PALETTE.white,
	},
	fieldFocused: {
		borderColor: PALETTE.primary,
	},
	fieldError: {
		borderColor: PALETTE.danger,
	},
	input: {
		flex: 1,
		height: '100%',
		paddingVertical: 0,
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		letterSpacing: 0.5,
		color: COLORS.text,
	},
	error: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: PALETTE.danger,
	},
});
