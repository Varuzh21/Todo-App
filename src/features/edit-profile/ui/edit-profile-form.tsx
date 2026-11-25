import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import type { Profile } from '@/entities/user';
import { FONTS, PALETTE } from '@/shared/config/theme';
import { fromDateKey } from '@/shared/lib/date';
import { Button } from '@/shared/ui/button';
import { DateField } from '@/shared/ui/date-field';
import { Input } from '@/shared/ui/input';

import { useSaveProfile } from '../model/use-save-profile';
import { editProfileSchema } from '../schema/edit-profile.schema';
import { GenderField } from './gender-field';

interface EditProfileFormProps {
	userId: number;
	profile: Profile;
	isEditing: boolean;
	onEdit: () => void;
	onSaved: () => void;
}

export function EditProfileForm({
	userId,
	profile,
	isEditing,
	onEdit,
	onSaved,
}: EditProfileFormProps) {
	const { saveProfile, isPending, isError } = useSaveProfile();
	const today = new Date();

	return (
		<Formik
			initialValues={{
				fullName: profile.fullName,
				email: profile.email,
				phone: profile.phone,
				gender: profile.gender,
				birthDate: profile.birthDate ? fromDateKey(profile.birthDate) : today,
			}}
			validationSchema={toFormikValidationSchema(editProfileSchema)}
			onSubmit={values =>
				saveProfile(
					{
						userId,
						values: editProfileSchema.parse(values),
						imageUrl: profile.imageUrl,
					},
					{ onSuccess: onSaved },
				)
			}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				setFieldValue,
			}) => {
				const fullNameError = touched.fullName ? errors.fullName : undefined;
				const emailError = touched.email ? errors.email : undefined;
				const phoneError = touched.phone ? errors.phone : undefined;

				return (
					<View style={styles.container}>
						{!isEditing && (
							<Button
								label='Edit Profile'
								onPress={onEdit}
								style={styles.editButton}
							/>
						)}

						<View style={styles.fields}>
							<Input
								value={values.fullName}
								placeholder='Full Name'
								editable={isEditing}
								onChangeText={handleChange('fullName')}
								onBlur={handleBlur('fullName')}
								error={fullNameError}
								autoComplete='name'
							/>
							<Input
								value={values.email}
								placeholder='Email Address'
								editable={isEditing}
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								error={emailError}
								autoCapitalize='none'
								autoComplete='email'
								keyboardType='email-address'
							/>
							<Input
								value={values.phone}
								placeholder='Phone Number'
								editable={isEditing}
								onChangeText={handleChange('phone')}
								onBlur={handleBlur('phone')}
								error={phoneError}
								autoComplete='tel'
								keyboardType='phone-pad'
							/>
							<GenderField
								value={values.gender}
								isDisabled={!isEditing}
								onChange={gender => setFieldValue('gender', gender)}
							/>
							<DateField
								label='Date of Birth'
								value={values.birthDate}
								isDisabled={!isEditing}
								maximumDate={today}
								onChange={date => setFieldValue('birthDate', date)}
							/>
							{isError && (
								<Text style={styles.error}>
									Couldn't save your profile. Try again.
								</Text>
							)}
						</View>

						{isEditing && (
							<Button
								label='Save Changes'
								isLoading={isPending}
								onPress={() => handleSubmit()}
							/>
						)}
					</View>
				);
			}}
		</Formik>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
	editButton: {
		alignSelf: 'center',
		width: 'auto',
		paddingVertical: 10,
		paddingHorizontal: 32,
	},
	fields: {
		gap: 16,
	},
	error: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: PALETTE.danger,
	},
});
