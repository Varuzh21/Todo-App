import { Picker } from '@react-native-picker/picker';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export function Select() {
	const [selectedLanguage, setSelectedLanguage] = useState();

	const pickerRef = useRef(null);

	return (
		<View style={styles.container}>
			<Picker
				ref={pickerRef}
				selectedValue={selectedLanguage}
				style={styles.select}
				onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
			>
				<Picker.Item label='Day' value='day' />
				<Picker.Item label='Time' value='time' />
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '30%',
		height: 45,
		borderRadius: 10,
		backgroundColor: '#102D53CC',
		paddingVertical: 12.5,
		justifyContent: 'center',
	},
	select: {
		color: '#FFFFFF99',
	},
});
