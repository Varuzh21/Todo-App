import { useCallback, useRef } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

const data = [
	{
		title: 'Design Meeting',
		content: 'Tomorrow | 10:30pm',
	},
	{
		title: 'Projects Meeting',
		content: 'Thursday | 10:30pm',
	},
];
const width = Dimensions.get('window').width;
const PAGE_WIDTH = width * 0.6;

export function Slider() {
	const ref = useRef<ICarouselInstance>(null);

	const renderItem = useCallback(
		({ item }: { item: { title: string; content: string } }) => {
			return (
				<View style={styles.container}>
					<View style={styles.textContainer}>
						<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
							{item.title}
						</Text>
						<Text>{item.content}</Text>
					</View>
					<View style={styles.imageContainer}>
						<Image
							source={require('../assets/images/users/1.png')}
							style={styles.image}
						/>
						<Image
							source={require('../assets/images/users/2.png')}
							style={styles.image}
						/>
						<Image
							source={require('../assets/images/users/3.png')}
							style={styles.image}
						/>
					</View>
				</View>
			);
		},[]);

	return (
		<Carousel
			ref={ref}
			snapEnabled={true}
			pagingEnabled={true}
			width={PAGE_WIDTH}
			height={width / 3.5}
			style={{ width: width }}
			data={data}
			renderItem={renderItem}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		width: PAGE_WIDTH - 20,
		height: 106,
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		borderRadius: 10,
		paddingVertical: 16,
		paddingHorizontal: 23,
		marginRight: 10,
	},
	textContainer: {
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	imageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10,
	},
	image: {
		width: 25,
		height: 25,
		borderRadius: 50,
		marginLeft: -10,
	},
});
