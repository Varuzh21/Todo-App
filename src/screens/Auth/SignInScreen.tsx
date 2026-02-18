import { useCallback, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/Button';
import { GradientView } from '@/components/GradientView';
import { Input } from '@/components/Input';

import Logo from '@/assets/icons/logo.svg';

function SignInScreen() {
	const [form, setForm] = useState({
		username: '',
		password: '',
	});
	const [offset, setOffset] = useState(0);

	const { signIn, isLoading } = useAuth();

	const handleSubmit = useCallback(async () => {
		if (isLoading) return;

		if (!form.username || !form.password) {
			return;
		}

		try {
			await signIn(form);
		} catch (e) {
			console.error('Sign in failed:', e);
		}
	}, [form, signIn, isLoading]);

	return (
		<View style={{ flex: 1 }}>
			<GradientView>
				<KeyboardAvoidingView
					keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : offset}
					behavior='padding'
					style={{ flex: 1 }}
				>
					<ScrollView
						style={styles.scroll}
						contentContainerStyle={styles.container}
						keyboardShouldPersistTaps='handled'
					>
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
										variant='email'
										placeholder='E-mail'
										type='email-address'
										onChange={text => setForm({ ...form, username: text })}
										onBlur={() => setOffset(0)}
										onFocus={() => setOffset(50)}
									/>
									<Input
										variant='password'
										placeholder='Password'
										secureTextEntry
										onChange={text => setForm({ ...form, password: text })}
										onBlur={() => setOffset(0)}
										onFocus={() => setOffset(50)}
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
											isLoading={isLoading}
										/>

										<View style={styles.signupRow}>
											<Text style={styles.signupText}>
												Don’t have an account?
											</Text>
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
					</ScrollView>
				</KeyboardAvoidingView>
			</GradientView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingTop: 30,
		paddingBottom: 95,
		rowGap: 48,
		paddingHorizontal: 30,
		justifyContent: 'space-between',
	},
	scroll: {
		flex: 1,
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
