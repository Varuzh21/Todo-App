import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/contexts/AuthStore';

import { Button } from '@/components/Button';
import { GradientView } from '@/components/GradientView';
import { Input } from '@/components/Input';

import Logo from '@/assets/icons/logo.svg';

function SignInScreen() {
	const [form, setForm] = useState({
		username: '',
		password: '',
	});

	const { signIn } = useAuth();

	const handleSubmit = useCallback(async () => {
		try {
			await signIn(form);
		} catch (e) {
			throw new Error(`error ${e}`)
		}
	}, [form]);

	return (
		<GradientView>
			<View style={styles.container}>
				<View style={styles.topSection}>
					<View style={styles.header}>
						<View style={styles.logoWrapper}>
							<Logo />
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.title}>Welcome Back to DO IT</Text>
							<Text style={styles.subTitle}>
								Have an other productive day !
							</Text>
						</View>
					</View>

					<View style={styles.form}>
						<View style={styles.inputGroup}>
							<Input
								placeholder='E-mail'
								type='email-address'
								onChange={text => setForm({ ...form, username: text })}
							/>
							<Input
								placeholder='Password'
								secureTextEntry
								onChange={text => setForm({ ...form, password: text })}
							/>
						</View>

						<View style={styles.forgotSection}>
							<View style={styles.forgotAlign}>
								<Text style={styles.forgotText}>forget password?</Text>
							</View>

							<View style={styles.actions}>
								<Button
									variant='button'
									title='sign in'
									onClick={handleSubmit}
								/>

								<View style={styles.signupRow}>
									<Text style={styles.signupText}>Don’t have an account?</Text>
									<Text style={styles.signupLink}>sign up</Text>
								</View>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.socialSection}>
					<Text style={styles.socialText}>Sign In with:</Text>

					<View style={styles.socialButtons}>
						<Button variant='apple' />
						<Button variant='google' />
					</View>
				</View>
			</View>
		</GradientView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30,
		marginHorizontal: 26,
		marginBottom: 95,
		justifyContent: 'space-between',
	},
	topSection: {
		gap: 48,
	},
	header: {
		rowGap: 25,
	},
	logoWrapper: {
		alignItems: 'center',
	},
	textContainer: {
		gap: 4,
	},
	title: {
		fontFamily: 'Medium',
		fontSize: 25,
		color: '#fff',
	},
	subTitle: {
		fontFamily: 'Medium',
		fontSize: 18,
		color: '#fff',
	},
	form: {
		rowGap: 24,
	},
	inputGroup: {
		rowGap: 56,
	},
	forgotSection: {
		gap: 16,
	},
	forgotAlign: {
		alignItems: 'flex-end',
	},
	forgotText: {
		fontFamily: 'Medium',
		fontSize: 14,
		color: '#FFFFFFCC',
		textDecorationLine: 'underline',
	},
	actions: {
		alignItems: 'center',
		gap: 19,
	},
	signupRow: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 5,
	},
	signupText: {
		fontFamily: 'Medium',
		fontSize: 14,
		color: '#fff',
	},
	signupLink: {
		fontFamily: 'Medium',
		fontSize: 14,
		color: '#63D9F3',
		textDecorationLine: 'underline',
	},
	socialSection: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		gap: 17,
	},
	socialText: {
		fontFamily: 'Regular',
		fontSize: 14,
		color: '#fff',
	},
	socialButtons: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 21,
	},
});

export default SignInScreen;
