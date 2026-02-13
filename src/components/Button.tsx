import { ReactNode } from 'react';
import {
	ActivityIndicator,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';

import Add from '@/assets/icons/add.svg';
import Apple from '@/assets/icons/apple.svg';
import Done from '@/assets/icons/done.svg';
import Google from '@/assets/icons/google.svg';
import Next from '@/assets/icons/next.svg';

type ButtonVariant =
	| 'next'
	| 'done'
	| 'button'
	| 'apple'
	| 'google'
	| 'add'
	| 'cancel';

type VariantConfig = {
	style: StyleProp<ViewStyle>;
	icon?: ReactNode;
	text?: StyleProp<TextStyle>;
};

interface ButtonProps {
	variant: ButtonVariant;
	title?: string;
	onClick?: () => void;
	isLoading?: boolean;
}

export function Button({ variant, title, onClick, isLoading }: ButtonProps) {
	const variants: Record<ButtonVariant, VariantConfig> = {
		next: {
			style: styles.next,
			icon: <Next />,
		},
		done: {
			style: styles.next,
			icon: <Done />,
		},
		button: {
			style: styles.button,
			text: styles.text,
		},
		apple: {
			style: styles.apple,
			icon: <Apple />,
		},
		google: {
			style: styles.apple,
			icon: <Google />,
		},
		add: {
			style: styles.add,
			icon: <Add />,
		},
		cancel: {
			style: styles.cancel,
			text: styles.cancelText,
		},
	};

	const isVariant = variants[variant];

	return (
		<TouchableOpacity
			style={isVariant.style}
			onPress={onClick}
			disabled={isLoading}
		>
			{isLoading ? (
				<ActivityIndicator size='small' color='white' />
			) : (
				<>
					{isVariant.icon ? (
						isVariant.icon
					) : (
						<Text style={isVariant.text}>{title}</Text>
					)}
				</>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	next: {
		width: 70,
		height: 70,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderRadius: '50%',
		boxShadow: '0 4px 15px 2px rgba(255, 255, 255, 0.25)',
	},
	button: {
		width: '100%',
		borderRadius: 10,
		paddingVertical: 13,
		backgroundColor: '#0EA5E9',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontFamily: 'Medium',
		fontSize: 18,
		color: '#fff',
	},
	apple: {
		width: 45,
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderRadius: 10,
	},
	add: {
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#63D9F3',
		borderRadius: '50%',
		boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
	},
	cancel: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderWidth: 2,
		borderStyle: 'solid',
		borderColor: '#0EA5E9',
		borderRadius: 10,
		paddingVertical: 13,
	},
	cancelText: {
		fontFamily: 'Medium',
		fontSize: 16,
		color: '#05243E',
	},
});
