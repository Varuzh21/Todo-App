import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Terms from '@/assets/icons/analyze.svg';
import Conversations from '@/assets/icons/comment.svg';
import Profile from '@/assets/icons/profile.svg';
import Project from '@/assets/icons/project.svg';

import Right from '@/assets/icons/right.svg';

type AccountButtonVariant = 'profile' | 'conversations' | 'projects' | 'terms';

type VariantConfig = {
	icon: ReactNode;
};

interface AccountButtonProps {
	variant: AccountButtonVariant;
	title: string;
}

export function AccountButton({ title, variant }: AccountButtonProps) {
	const variants: Record<AccountButtonVariant, VariantConfig> = {
		profile: {
			icon: <Profile />,
		},
		conversations: {
			icon: <Conversations />,
		},
		projects: {
			icon: <Project />,
		},
		terms: {
			icon: <Terms />,
		},
	};

	const isVariant = variants[variant];

	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.content}>
				<View style={styles.leftSection}>
					{isVariant.icon}
					<Text style={styles.text}>{title}</Text>
				</View>
				<Right />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingLeft: 15,
		paddingRight: 34,
		borderBottomWidth: 1,
		borderColor: '#FFFFFF40',
	},
	content: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBlock: 19,
	},
	leftSection: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 15,
	},
	text: {
		fontFamily: 'Regular',
		fontSize: 16,
		color: '#fff',
	},
});
