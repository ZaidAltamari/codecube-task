export interface BaseEntity {
	id: string | number;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface ApiError {
	message: string;
	code?: string | number;
	details?: Record<string, any>;
}
export interface PaginationParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}
export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}
export interface AsyncState<T = any> {
	data: T | null;
	loading: boolean;
	error: string | null;
}
export type AsyncAction<T = any> =
	| { type: 'FETCH_START' }
	| { type: 'FETCH_SUCCESS'; payload: T }
	| { type: 'FETCH_ERROR'; payload: string }
	| { type: 'RESET' };
// Generic form types
export interface FormField<T = string> {
	value: T;
	error?: string | null;
	touched?: boolean;
	valid?: boolean;
}
export interface FormState<T extends Record<string, any>> {
	fields: { [K in keyof T]: FormField<T[K]> };
	isValid: boolean;
	isSubmitting: boolean;
	submitCount: number;
}
export type InputChangeHandler = (
	e: React.ChangeEvent<HTMLInputElement>,
) => void;
export type SelectChangeHandler = (
	e: React.ChangeEvent<HTMLSelectElement>,
) => void;
export type TextAreaChangeHandler = (
	e: React.ChangeEvent<HTMLTextAreaElement>,
) => void;
export type FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
export interface WithClassName {
	className?: string;
}
export interface WithChildren {
	children: React.ReactNode;
}
export interface WithOptionalChildren {
	children?: React.ReactNode;
}
export interface WithLoading {
	isLoading?: boolean;
}
export interface WithError {
	error?: string | null;
}
export interface BaseComponentProps
	extends WithClassName,
		WithOptionalChildren {
	id?: string;
	'data-testid'?: string;
}
export type AsyncResult<T, E = Error> = Promise<{
	success: boolean;
	data?: T;
	error?: E;
}>;
export interface ApiResponse<T = any> {
	success: boolean;
	data: T;
	message?: string;
	errors?: ApiError[];
}
export type ThemeMode = 'light' | 'dark';
export type Size = 'small' | 'medium' | 'large';
export type Variant =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'error'
	| 'info';
export type Status = 'idle' | 'loading' | 'success' | 'error';
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type DeepReadonly<T> = {
	readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
export type NonNullable<T> = T extends null | undefined ? never : T;
export type KeysOfType<T, U> = {
	[K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
export interface EnvironmentConfig {
	API_URL: string;
	NODE_ENV: 'development' | 'production' | 'test';
	VERSION: string;
	FEATURES: {
		ENABLE_ANALYTICS: boolean;
		ENABLE_DEBUG: boolean;
		ENABLE_SERVICE_WORKER: boolean;
	};
}
