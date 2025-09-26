export const QUERY_KEYS = {
	posts: ['posts'] as const,
	post: (id: number) => ['posts', id] as const,
	users: ['users'] as const,
	user: (id: number) => ['users', id] as const,
} as const;
export type QueryKeys = typeof QUERY_KEYS;
