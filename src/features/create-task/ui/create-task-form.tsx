import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import {
	type CreateTaskValues,
	createTaskSchema,
} from '../schema/create-task.schema';

interface CreateTaskFormProps {
	isPending: boolean;
	serverError?: string;
	onSubmit: (values: CreateTaskValues) => void;
}

export function CreateTaskForm({
	isPending,
	serverError,
	onSubmit,
}: CreateTaskFormProps) {
	return (
		<Formik
			initialValues={{ title: '' }}
			validationSchema={toFormikValidationSchema(createTaskSchema)}
			onSubmit={values => onSubmit(createTaskSchema.parse(values))}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => {
				const titleError = touched.title ? errors.title : undefined;

				return (
					<View style={styles.container}>
						<Text style={styles.heading}>Create a Task</Text>
						<View style={styles.fields}>
							<Input
								value={values.title}
								placeholder='Task Title'
								onChangeText={handleChange('title')}
								onBlur={handleBlur('title')}
								error={titleError}
							/>
							{serverError && (
								<Text style={styles.serverError}>{serverError}</Text>
							)}
						</View>
						<Button
							label='Create Task'
							isLoading={isPending}
							onPress={() => handleSubmit()}
							style={styles.button}
						/>
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
	heading: {
		fontFamily: FONTS.galanoMedium,
		fontSize: 20,
		color: COLORS.text,
	},
	fields: {
		gap: 12,
	},
	serverError: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: PALETTE.danger,
	},
	button: {
		alignSelf: 'center',
		width: '70%',
	},
});
