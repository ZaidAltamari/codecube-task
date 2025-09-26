export interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}
export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
	company: {
		name: string;
	};
}
export interface ApiResponse<T> {
	data: T;
	error?: string;
}
export type SortDirection = 'asc' | 'desc';
export interface SortConfig {
	key: keyof Post;
	direction: SortDirection;
}
