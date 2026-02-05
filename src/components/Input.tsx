import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';

import Email from '@/assets/icons/email.svg';
import Password from '@/assets/icons/password.svg';

interface InputProps {
	placeholder: string;
	value?: string;
	type?: KeyboardTypeOptions;
	secureTextEntry?: boolean;
	onChange: (text: string) => void;
}

export function Input({
	placeholder,
	value,
	type,
	secureTextEntry,
	onChange
}: InputProps) {
	return (
		<View style={styles.container}>
			{secureTextEntry ? (
				<Password width={20} height={20} />
			) : (
				<Email width={20} height={20} />
			)}
			<TextInput
				value={value}
				placeholder={placeholder}
				keyboardType={type}
				placeholderTextColor='#00000070'
				secureTextEntry={secureTextEntry}
				onChangeText={onChange}
				style={styles.input}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
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
	},
});
