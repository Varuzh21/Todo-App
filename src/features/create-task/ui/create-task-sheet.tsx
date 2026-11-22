import {
	BottomSheetModal,
	BottomSheetView,
} from '@expo/ui/community/bottom-sheet';
import type { RefObject } from 'react';
import { StyleSheet } from 'react-native';

import { useUserId } from '@/entities/session';
import { toDateKey } from '@/shared/lib/date';

import { useCreateTask } from '../model/use-create-task';
import type { CreateTaskValues } from '../schema/create-task.schema';
import { CreateTaskForm } from './create-task-form';
import { CreateTaskSuccess } from './create-task-success';

interface CreateTaskSheetProps {
	sheetRef: RefObject<BottomSheetModal | null>;
	defaultDueDate?: Date;
}

export function CreateTaskSheet({
	sheetRef,
	defaultDueDate = new Date(),
}: CreateTaskSheetProps) {
	const userId = useUserId();
	const { createTask, isPending, isSuccess, isError, reset } = useCreateTask();

	function closeSheet() {
		sheetRef.current?.dismiss();
	}

	function handleSubmit(values: CreateTaskValues) {
		createTask({ ...values, userId });
	}

	return (
		<BottomSheetModal ref={sheetRef} enablePanDownToClose onDismiss={reset}>
			<BottomSheetView style={styles.sheetContent}>
				{isSuccess ? (
					<CreateTaskSuccess onProceed={closeSheet} />
				) : (
					<CreateTaskForm
						key={toDateKey(defaultDueDate)}
						defaultDueDate={defaultDueDate}
						isPending={isPending}
						isError={isError}
						onSubmit={handleSubmit}
					/>
				)}
			</BottomSheetView>
		</BottomSheetModal>
	);
}

const styles = StyleSheet.create({
	sheetContent: {
		width: '100%',
		paddingHorizontal: 20,
		paddingTop: 32,
		paddingBottom: 40,
	},
});
