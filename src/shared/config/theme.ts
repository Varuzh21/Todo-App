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
	gray: '#A8A9AA',
} as const;

export const FONTS = {
	galanoRegular: 'GalanoGrotesqueAlt-Regular',
	galanoMedium: 'GalanoGrotesque-Medium',
	galanoSemiBold: 'GalanoGrotesqueAlt-SemiBold',
	outfitRegular: 'Outfit-Regular',
	walsheimRegular: 'GTWalsheimPro-Regular',
	walsheimMedium: 'GTWalsheimPro-Medium',
} as const;

export const COLORS = {
	text: PALETTE.neutral,
	textSecondary: PALETTE.neutral50,
	background: PALETTE.white,
} as const;
