import {
	BottomSheetModal,
	BottomSheetView,
} from '@expo/ui/community/bottom-sheet';
import { Fragment, useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PALETTE } from '@/shared/config/theme';
import { PlusIcon } from '@/shared/ui/icons';

import { useCreateTask } from '../model/use-create-task';
import { CreateTaskForm } from './create-task-form';
import { CreateTaskSuccess } from './create-task-success';

const ADD_BUTTON_OFFSET = 20;

export function CreateTaskSheet() {
	const sheetRef = useRef<BottomSheetModal>(null);
	const insets = useSafeAreaInsets();
	const { createTask, isPending, isSuccess, reset, serverError } =
		useCreateTask();

	function openSheet() {
		sheetRef.current?.present();
	}

	function closeSheet() {
		sheetRef.current?.dismiss();
	}

	return (
		<Fragment>
			<Pressable
				role='button'
				accessibilityLabel='Create a task'
				android_disableSound
				onPress={openSheet}
				style={[styles.addButton, { right: insets.right + ADD_BUTTON_OFFSET }]}
			>
				<PlusIcon color={PALETTE.white} />
			</Pressable>

			<BottomSheetModal ref={sheetRef} enablePanDownToClose onDismiss={reset}>
				<BottomSheetView style={styles.sheetContent}>
					{isSuccess ? (
						<CreateTaskSuccess onProceed={closeSheet} />
					) : (
						<CreateTaskForm
							isPending={isPending}
							serverError={serverError}
							onSubmit={createTask}
						/>
					)}
				</BottomSheetView>
			</BottomSheetModal>
		</Fragment>
	);
}

const styles = StyleSheet.create({
	addButton: {
		position: 'absolute',
		bottom: ADD_BUTTON_OFFSET,
		width: 56,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 28,
		backgroundColor: PALETTE.primary,
	},
	sheetContent: {
		width: '100%',
		paddingHorizontal: 20,
		paddingTop: 32,
		paddingBottom: 40,
	},
});
