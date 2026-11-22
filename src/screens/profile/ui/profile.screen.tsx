import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUserId } from '@/entities/session';
import { userQueries } from '@/entities/user';
import { SignOutButton } from '@/features/auth';
import { EditProfileForm } from '@/features/edit-profile';
import { COLORS, PALETTE } from '@/shared/config/theme';
import { Button } from '@/shared/ui/button';
import { EmptyState } from '@/shared/ui/empty-state';

import { useLightStatusBar } from '../model/use-light-status-bar';
import { ProfileHeader } from './profile-header';

const SCREEN_PADDING = 20;

export function ProfileScreen() {
	const userId = useUserId();
	const insets = useSafeAreaInsets();
	const [isEditing, setIsEditing] = useState(false);
	const {
		data: profile,
		isPending,
		isError,
		refetch,
	} = useQuery(userQueries.profile(userId));

	useLightStatusBar();

	function startEditing() {
		setIsEditing(true);
	}

	function stopEditing() {
		setIsEditing(false);
	}

	return (
		<View style={styles.screen}>
			<ProfileHeader imageUrl={profile?.imageUrl ?? null} />

			<ScrollView
				style={styles.form}
				contentContainerStyle={styles.scrollContent}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps='handled'
				automaticallyAdjustKeyboardInsets
				showsVerticalScrollIndicator={false}
			>
				<View
					style={[
						styles.content,
						{
							paddingLeft: insets.left + SCREEN_PADDING,
							paddingRight: insets.right + SCREEN_PADDING,
						},
					]}
				>
					<View>
						{isPending && <ActivityIndicator color={PALETTE.primary} />}

						{isError && !profile && (
							<View style={styles.error}>
								<EmptyState message="Couldn't load your profile" />
								<Button label='Try Again' onPress={() => refetch()} />
							</View>
						)}

						{profile && (
							<EditProfileForm
								userId={userId}
								profile={profile}
								isEditing={isEditing}
								onEdit={startEditing}
								onSaved={stopEditing}
							/>
						)}
					</View>

					{!isEditing && <SignOutButton />}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	form: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
	},
	content: {
		flex: 1,
		justifyContent: 'space-between',
		gap: 32,
		paddingVertical: 24,
	},
	error: {
		gap: 20,
	},
});
