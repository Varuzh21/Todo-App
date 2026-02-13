import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export function Wrapper({ children }: { children: Readonly<ReactNode> }) {
	return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,           
    paddingHorizontal: 18,
	},
});
