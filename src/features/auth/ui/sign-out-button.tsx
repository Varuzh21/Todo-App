import { useSession } from '@/entities/session';
import { Button } from '@/shared/ui/button';

export function SignOutButton() {
	const { signOut } = useSession();

	return <Button label='Sign Out' onPress={signOut} />;
}
