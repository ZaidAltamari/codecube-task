export const STORAGE_KEYS = {
	AUTH_USER: 'auth_user',
	USER_PREFERENCES: 'user_preferences',
} as const;
export const CACHE_DURATION = {
	USER_DATA: 15 * 60 * 1000, // 15 minutes
} as const;
export const DEMO_USERS = {
	'editor@test.com': { password: 'Editor123!', role: 'Editor' as const },
	'viewer@test.com': { password: 'Viewer123!', role: 'Viewer' as const },
	'admin@test.com': { password: 'Admin123!', role: 'Editor' as const },
} as const;
export const UI_CONSTANTS = {
	TABLE_PAGE_SIZE: 25,
	SEARCH_DEBOUNCE_MS: 300,
	ANIMATION_DURATION_MS: 300,
} as const;
