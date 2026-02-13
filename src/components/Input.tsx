import { ReactNode } from 'react';
import {
	KeyboardTypeOptions,
	StyleProp,
	StyleSheet,
	TextInput,
	View,
	ViewStyle,
} from 'react-native';

import Date from '@/assets/icons/date.svg';
import Description from '@/assets/icons/description.svg';
import Email from '@/assets/icons/email.svg';
import Password from '@/assets/icons/password.svg';
import Task from '@/assets/icons/task.svg';
import Time from '@/assets/icons/time.svg';

type InputVarian =
	| 'email'
	| 'password'
	| 'task'
	| 'description'
	| 'date'
	| 'time';

interface VariantConfig {
	style: StyleProp<ViewStyle>;
	icon: ReactNode;
	placeholderTextColor: string;
	textColor: string;
	multiline?: boolean;
}

interface InputProps {
	variant: InputVarian;
	type?: KeyboardTypeOptions;
	placeholder: string;
	value?: string;
	secureTextEntry?: boolean;
	onChange?: (text: string) => void;
	onFocus?: () => void;
	disabled?: boolean
}

export function Input({
	placeholder,
	value,
	type,
	secureTextEntry,
	variant,
	onChange,
	onFocus,
	disabled
}: InputProps) {
	const variants: Record<InputVarian, VariantConfig> = {
		email: {
			style: styles.email,
			icon: <Email />,
			placeholderTextColor: '#00000070',
			textColor: '#000000',
		},
		password: {
			style: styles.email,
			icon: <Password />,
			placeholderTextColor: '#00000070',
			textColor: '#000000',
		},
		task: {
			style: styles.task,
			icon: <Task />,
			placeholderTextColor: '#FFFFFFCC',
			textColor: '#FFFFFF',
		},
		description: {
			style: styles.description,
			icon: <Description />,
			placeholderTextColor: '#FFFFFFCC',
			textColor: '#FFFFFF',
			multiline: true,
		},
		date: {
			style: styles.task,
			icon: <Date />,
			placeholderTextColor: '#FFFFFFCC',
			textColor: '#FFFFFF',
		},
		time: {
			style: styles.task,
			icon: <Time />,
			placeholderTextColor: '#FFFFFFCC',
			textColor: '#FFFFFF',
		},
	};

	const isVariant = variants[variant];

	return (
		<View style={isVariant.style}>
			{isVariant.icon}
			<TextInput
				value={value}
				placeholder={placeholder}
				keyboardType={type}
				placeholderTextColor={isVariant.placeholderTextColor}
				secureTextEntry={secureTextEntry}
				multiline={isVariant.multiline}
				textAlignVertical={isVariant.multiline ? 'top' : 'center'}
				editable={disabled}
				onChangeText={onChange}
				onFocus={onFocus}
				style={[
					styles.input,
					{ color: isVariant.textColor },
					variant === 'description' && styles.descriptionInput,
				]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	email: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 11,
		paddingInline: 11,
		borderRadius: 5,
		backgroundColor: '#fff',
	},
	input: {
		flex: 2,
		fontFamily: 'Regular',
		fontSize: 16,
		color: '#00000070',
		textAlignVertical: 'top',
		height: '100%',
	},
	task: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'baseline',
		columnGap: 11,
		backgroundColor: '#05243E',
		paddingHorizontal: 16,
		borderRadius: 5,
	},
	description: {
		width: '100%',
		height: 159,
		flexDirection: 'row',
		alignItems: 'baseline',
		columnGap: 12,
		backgroundColor: '#05243E',
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 5,
	},
	descriptionInput: {
		height: '100%',
	},
});
