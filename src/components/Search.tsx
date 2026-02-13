import { StyleSheet, TextInput, View } from 'react-native';

import SearchIcon from '@/assets/icons/search.svg'

interface SearchProps {
	value: string;
	onChange?: () => void;
}

export function Search({ value, onChange }: SearchProps) {
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
			<SearchIcon width={20} height={20}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '65%',
		height: 45,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#102D53CC',
		borderRadius: 10,
		paddingLeft: 8,
		paddingRight: 19,
		paddingVertical: 16.5
	},
	input: {
		flex: 2,
		height: 70,
		fontFamily: 'Medium',
		fontSize: 14,
		color: '#FFFFFF99'
	},
});
