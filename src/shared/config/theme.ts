export const PALETTE = {
	primary: '#2563EB',
	primaryLight: '#2563EB1A',
	success: '#3DBEB3',
	danger: '#C60202',
	neutral: '#202D41',
	neutral50: '#202D4180',
	neutral40: '#202D4166',
	black: '#000000',
	white: '#FFFFFF',
} as const;

export const COLORS = {
	text: PALETTE.neutral,
	textSecondary: PALETTE.neutral50,
	background: PALETTE.white,
} as const;
