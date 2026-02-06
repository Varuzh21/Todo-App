import { Image, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/contexts/AuthStore';

import { GradientView } from '@/components/GradientView';
import { Wrapper } from '@/components/Wrapper';

import Notification from '@/assets/icons/notification.svg';

function HomeScreen() {
	const { user } = useAuth();

	return (
		<GradientView>
			<View style={styles.container}>
				<Wrapper>
					<View style={styles.header}>
						<View style={styles.userInfo}>
							<Image source={{ uri: user?.image }} style={styles.userAvatar} />
							<View style={styles.userTextContainer}>
								<Text style={styles.username}>
									{user?.firstName} {user?.lastName}
								</Text>
								<Text style={styles.userEmail}>{user?.email}</Text>
							</View>
						</View>
						<Notification width={30} height={30} fill='#fff' />
					</View>
				</Wrapper>
				<View style={styles.section}>
					<Text
						style={[
							styles.sectionTitle,
							{ fontFamily: 'Regular', fontSize: 16 },
						]}
					>
						Group tasks
					</Text>
					<View>
						
					</View>
				</View>
			</View>
		</GradientView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 26,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	userAvatar: {
		width: 52,
		height: 50,
		borderRadius: 50,
	},
	userTextContainer: {
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	username: {
		fontFamily: 'SemiBold',
		fontSize: 18,
		color: '#fff',
	},
	userEmail: {
		fontFamily: 'Medium',
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.5)',
	},
	section: {
		flexDirection: 'column',
		gap: 13,
		marginTop: 15,
		marginLeft: 18,
	},
	sectionTitle: {
		fontFamily: 'Medium',
		fontSize: 14,
		color: '#fff',
	},
});

export default HomeScreen;
