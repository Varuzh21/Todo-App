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

import { DueDateField } from './due-date-field';

interface CreateTaskFormProps {
	defaultDueDate: Date;
	isPending: boolean;
	isError: boolean;
	onSubmit: (values: CreateTaskValues) => void;
}

export function CreateTaskForm({
	defaultDueDate,
	isPending,
	isError,
	onSubmit,
}: CreateTaskFormProps) {
	return (
		<Formik
			initialValues={{ title: '', dueDate: defaultDueDate }}
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
				setFieldValue,
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
							<DueDateField
								value={values.dueDate}
								onChange={date => setFieldValue('dueDate', date)}
							/>
							{isError && (
								<Text style={styles.error}>
									Couldn't save the task. Try again.
								</Text>
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
	error: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: PALETTE.danger,
	},
	button: {
		alignSelf: 'center',
		width: '70%',
	},
});
