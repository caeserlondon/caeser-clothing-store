export const i18n = {
	locales: [
		{ code: 'en', name: 'English', icon: '🇬🇧' },
		{ code: 'ar', name: 'العربية', icon: '🇦🇪' },
		{ code: 'fr', name: 'Français', icon: '🇫🇷' },
		{ code: 'de', name: 'Deutsch', icon: '🇩🇪' },
		{ code: 'es', name: 'Español', icon: '🇪🇸' },
		{ code: 'it', name: 'Italiano', icon: '🇮🇹' },
		{ code: 'pt', name: 'Português', icon: '🇵🇹' },
	],
	defaultLocale: 'en',
}

export const getDirection = (locale: string) => {
	return locale === 'ar' ? 'rtl' : 'ltr'
}
export type I18nConfig = typeof i18n
export type Locale = I18nConfig['locales'][number]
