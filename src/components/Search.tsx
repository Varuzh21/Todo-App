import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import SearchIcon from '@/assets/icons/search.svg';

interface SearchProps {
	value: string;
	onChange?: (text: string) => void;
	onClick?: () => void;	
}

export function Search({ value, onChange, onClick }: SearchProps) {
	console.log('Rendering Search component with value:', value);
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder='Search by task title'
				placeholderTextColor='#FFFFFF99'
				keyboardType='default'
				value={value}
				onChangeText={onChange}
			/>
			<TouchableOpacity onPress={onClick}>
				<SearchIcon width={20} height={20} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#102D53CC',
		borderRadius: 10,
		paddingLeft: 8,
		paddingRight: 19,
		paddingVertical: 16.5,
	},
	input: {
		flex: 2,
		height: 50,
		fontFamily: 'Medium',
		fontSize: 14,
		color: '#FFFFFF99',
	},
});
