import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { FONTS, PALETTE } from '@/shared/config/theme';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useSignIn } from '../model/use-sign-in';
import { signInSchema } from '../schema/sign-in.schema';

export function SignInForm() {
	const { signIn, isPending, serverError } = useSignIn();

	return (
		<Formik
			initialValues={{ username: '', password: '' }}
			validationSchema={toFormikValidationSchema(signInSchema)}
			onSubmit={values => signIn(signInSchema.parse(values))}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => {
				const usernameError = touched.username ? errors.username : undefined;
				const passwordError = touched.password ? errors.password : undefined;

				return (
					<View style={styles.container}>
						<View style={styles.fields}>
							<Input
								value={values.username}
								placeholder='Enter Username'
								onChangeText={handleChange('username')}
								onBlur={handleBlur('username')}
								error={usernameError}
								autoCapitalize='none'
								autoCorrect={false}
							/>
							<Input
								value={values.password}
								placeholder='Enter Password'
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								error={passwordError}
								secureTextEntry={true}
							/>
							{serverError && (
								<Text style={styles.serverError}>{serverError}</Text>
							)}
						</View>
						<Button
							label='Sign In'
							isLoading={isPending}
							onPress={() => handleSubmit()}
						/>
					</View>
				);
			}}
		</Formik>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 40,
	},
	fields: {
		gap: 20,
	},
	serverError: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		textAlign: 'center',
		color: PALETTE.danger,
	},
});
