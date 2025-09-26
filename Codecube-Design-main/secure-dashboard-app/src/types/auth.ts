export type UserRole = 'Viewer' | 'Editor';
export interface User {
	id: string;
	username: string;
	role: UserRole;
}
export interface LoginCredentials {
	username: string;
	password: string;
}
export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}
export interface AuthContextType extends AuthState {
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => void;
}
