import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUserId } from '@/entities/session';
import type { Task } from '@/entities/task';
import { CreateTaskSheet, useCreateTaskSheet } from '@/features/create-task';
import { ToggleTaskCard } from '@/features/toggle-task';
import { COLORS, PALETTE } from '@/shared/config/theme';
import { Button } from '@/shared/ui/button';
import { PlusIcon, SearchIcon } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';
import { Logo } from '@/shared/ui/logo';
import { CalendarViewTabs, useCalendar } from '@/widgets/calendar';

import { useCalendarTasks } from '../model/use-calendar-tasks';
import { CalendarListEmpty } from './calendar-list-empty';
import { CalendarListHeader } from './calendar-list-header';

const SCREEN_PADDING = 20;

const NO_CONTENT_ANCHORING = { disabled: true };

function getTaskKey(task: Task) {
	return task.id;
}

const renderTask: ListRenderItem<Task> = ({ item }) => (
	<ToggleTaskCard task={item} />
);

function TaskSeparator() {
	return <View style={styles.separator} />;
}

export function CalendarScreen() {
	const userId = useUserId();
	const calendar = useCalendar();
	const { sheetRef, openSheet } = useCreateTaskSheet();
	const [searchQuery, setSearchQuery] = useState('');
	const { tasks, isPending, isSearching } = useCalendarTasks({
		userId,
		selectedDate: calendar.selectedDate,
		searchQuery,
	});

	return (
		<SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
			<View style={styles.toolbar}>
				<View style={styles.topBar}>
					<Logo width={32} height={32} style={styles.logo} />
					<View style={styles.search}>
						<Input
							icon={<SearchIcon color={COLORS.textSecondary} />}
							value={searchQuery}
							placeholder='Search for Tasks, date, ...'
							onChangeText={setSearchQuery}
							autoCapitalize='none'
							autoCorrect={false}
							clearButtonMode='while-editing'
							returnKeyType='search'
						/>
					</View>
				</View>

				<View style={styles.viewRow}>
					<CalendarViewTabs
						viewMode={calendar.viewMode}
						onChange={calendar.setViewMode}
					/>
					<Button
						label='Add Task'
						icon={<PlusIcon width={16} height={16} color={PALETTE.white} />}
						onPress={openSheet}
						style={styles.addTaskButton}
					/>
				</View>
			</View>

			<CreateTaskSheet
				sheetRef={sheetRef}
				defaultDueDate={calendar.selectedDate}
			/>

			<FlashList
				data={tasks}
				keyExtractor={getTaskKey}
				renderItem={renderTask}
				ItemSeparatorComponent={TaskSeparator}
				maintainVisibleContentPosition={NO_CONTENT_ANCHORING}
				ListHeaderComponent={
					<CalendarListHeader
						isSearching={isSearching}
						selectedDate={calendar.selectedDate}
						viewMode={calendar.viewMode}
						onSelectDate={calendar.selectDate}
						onPrevious={calendar.showPrevious}
						onNext={calendar.showNext}
					/>
				}
				ListEmptyComponent={
					<CalendarListEmpty isPending={isPending} isSearching={isSearching} />
				}
				contentContainerStyle={styles.listContent}
				keyboardShouldPersistTaps='handled'
				keyboardDismissMode='on-drag'
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	toolbar: {
		gap: 20,
		paddingHorizontal: SCREEN_PADDING,
		paddingTop: 12,
		paddingBottom: 20,
	},
	topBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 16,
	},
	logo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	search: {
		width: 211,
	},
	viewRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	addTaskButton: {
		width: 'auto',
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 6,
	},
	listContent: {
		paddingHorizontal: SCREEN_PADDING,
		paddingBottom: SCREEN_PADDING,
	},
	separator: {
		height: 16,
	},
});
