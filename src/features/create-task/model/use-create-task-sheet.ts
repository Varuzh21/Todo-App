import type { BottomSheetModal } from '@expo/ui/community/bottom-sheet';
import { useRef } from 'react';

export function useCreateTaskSheet() {
	const sheetRef = useRef<BottomSheetModal>(null);

	function openSheet() {
		sheetRef.current?.present();
	}

	return { sheetRef, openSheet };
}
