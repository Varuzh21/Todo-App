import { View } from 'react-native';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export function SignInForm() {
	return (
		<View style={{ gap: 40 }}>
			<View style={{ gap: 20 }}>
				<Input />
				<Input />
			</View>
			<Button label='Sign In' />
		</View>
	);
}
