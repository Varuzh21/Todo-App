import type { FontSource } from 'expo-font';

import { FONTS } from './theme';

type FontFamily = (typeof FONTS)[keyof typeof FONTS];

export const FONT_SOURCES = {
	[FONTS.galanoRegular]: require('@/shared/assets/fonts/GalanoGrotesqueAlt-Regular.ttf'),
	[FONTS.galanoMedium]: require('@/shared/assets/fonts/GalanoGrotesque-Medium.ttf'),
	[FONTS.galanoSemiBold]: require('@/shared/assets/fonts/GalanoGrotesqueAlt-SemiBold.ttf'),
	[FONTS.outfitRegular]: require('@/shared/assets/fonts/Outfit-Regular.ttf'),
	[FONTS.walsheimRegular]: require('@/shared/assets/fonts/GTWalsheimPro-Regular.ttf'),
	[FONTS.walsheimMedium]: require('@/shared/assets/fonts/GTWalsheimPro-Medium.ttf'),
} satisfies Record<FontFamily, FontSource>;
