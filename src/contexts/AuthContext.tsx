import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	ReactNode,
} from 'react';
import {
	AuthState,
	AuthContextType,
	LoginCredentials,
	User,
} from '../types/auth';
import { DEMO_USERS, STORAGE_KEYS } from '../utils/constants';
interface AuthAction {
	type: 'LOGIN_START' | 'LOGIN_SUCCESS' | 'LOGIN_ERROR' | 'LOGOUT';
	payload?: any;
}
const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};
function authReducer(state: AuthState, action: AuthAction): AuthState {
	switch (action.type) {
		case 'LOGIN_START':
			return {
				...state,
				isLoading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				isLoading: false,
				error: null,
			};
		case 'LOGIN_ERROR':
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
				error: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
				error: null,
			};
		default:
			return state;
	}
}
export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);
interface AuthProviderProps {
	children: ReactNode;
}
export function AuthProvider({ children }: AuthProviderProps) {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const login = async (credentials: LoginCredentials): Promise<void> => {
		dispatch({ type: 'LOGIN_START' });
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const userInfo =
				DEMO_USERS[credentials.username as keyof typeof DEMO_USERS];
			if (!userInfo) {
				throw new Error(
					'No account found with this email address. Please check your email and try again.',
				);
			}
			if (userInfo.password !== credentials.password) {
				throw new Error(
					'Incorrect password. Please check your password and try again.',
				);
			}
			const user: User = {
				id: Date.now().toString(),
				username: credentials.username,
				role: userInfo.role,
			};
			localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
			dispatch({ type: 'LOGIN_SUCCESS', payload: user });
		} catch (error) {
			dispatch({
				type: 'LOGIN_ERROR',
				payload: error instanceof Error ? error.message : 'Login failed',
			});
		}
	};
	const logout = (): void => {
		localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
		dispatch({ type: 'LOGOUT' });
	};
	useEffect(() => {
		const savedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
		if (savedUser) {
			try {
				const user = JSON.parse(savedUser);
				dispatch({ type: 'LOGIN_SUCCESS', payload: user });
			} catch {
				localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
			}
		}
	}, []);
	const value: AuthContextType = {
		...state,
		login,
		logout,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
