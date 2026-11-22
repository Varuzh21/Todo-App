import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PALETTE } from '@/shared/config/theme';
import { ProfileIcon } from '@/shared/ui/icons';
import { Logo } from '@/shared/ui/logo';

const AVATAR_SIZE = 100;
const TOOLBAR_HEIGHT = 56;

const BAND_BOTTOM_SPACE = AVATAR_SIZE / 2 + 16;

interface ProfileHeaderProps {
	imageUrl: string | null;
}

export function ProfileHeader({ imageUrl }: ProfileHeaderProps) {
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.band,
					{
						paddingTop: insets.top,
						paddingLeft: insets.left + 20,
						paddingRight: insets.right + 20,
					},
				]}
			>
				<View style={styles.toolbar}>
					<View style={styles.logoBadge}>
						<Logo width={24} height={24} style={styles.logo} />
					</View>
				</View>
			</View>

			<View style={styles.avatar}>
				{imageUrl ? (
					<Image
						source={imageUrl}
						accessibilityLabel='Profile photo'
						contentFit='cover'
						style={styles.avatarImage}
					/>
				) : (
					<ProfileIcon width={48} height={48} color={PALETTE.gray} />
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	band: {
		alignSelf: 'stretch',
		paddingBottom: BAND_BOTTOM_SPACE,
		backgroundColor: PALETTE.primary,
	},
	toolbar: {
		height: TOOLBAR_HEIGHT,
		flexDirection: 'row',
		alignItems: 'center',
	},
	logoBadge: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 6,
		backgroundColor: PALETTE.white,
	},
	logo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		marginTop: -AVATAR_SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		borderWidth: 3,
		borderRadius: AVATAR_SIZE / 2,
		borderColor: PALETTE.white,
		backgroundColor: PALETTE.grayLight,
	},
	avatarImage: {
		width: '100%',
		height: '100%',
	},
});
