import { Image, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/hooks/useAuth';

import { GradientView } from '@/components/GradientView';
import { Slider } from '@/components/Slider';
import { TaskItem } from '@/components/TaskItem';
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
				<View style={[styles.section, { marginLeft: 18 }]}>
					<Text
						style={[
							styles.sectionTitle,
							{ fontFamily: 'Regular', fontSize: 16 },
						]}
					>
						Group tasks
					</Text>
					<View>
						<Slider />
					</View>
				</View>
				<Wrapper>
					<View style={[styles.section, { marginTop: 19 }]}>
						<Text style={styles.sectionTitle}>Incomplete Tasks</Text>
						<View style={styles.listContainer}>
							<TaskItem
								title='Client meeting'
								subTitle='Tomorrow | 10:30pm'
								onClick={() => {}}
								isCompleted={false}
							/>
							<TaskItem
								title='Client meeting'
								subTitle='Tomorrow | 10:30pm'
								onClick={() => {}}
								isCompleted={false}
							/>
						</View>
					</View>
					<View style={[styles.section, { marginTop: 12, rowGap: 19 }]}>
						<Text style={styles.sectionTitle}>Completed Tasks</Text>
						<View style={styles.listContainer}>
							<TaskItem
								title='Client meeting'
								subTitle='Tomorrow | 10:30pm'
								onClick={() => {}}
								isCompleted
							/>
							<TaskItem
								title='Client meeting'
								subTitle='Tomorrow | 10:30pm'
								onClick={() => {}}
								isCompleted
							/>
						</View>
					</View>
				</Wrapper>
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
		rowGap: 13,
		marginTop: 15,
	},
	sectionTitle: {
		fontFamily: 'Medium',
		fontSize: 14,
		color: '#fff',
	},
	listContainer: {
		flexDirection: 'column',
		gap: 15,
	},
});

export default HomeScreen;
