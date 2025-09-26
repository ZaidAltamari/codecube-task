import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Toast, ToastType } from '../components/UI/Toast';
export interface ToastItem {
	id: string;
	type: ToastType;
	title: string;
	message?: string;
	duration?: number;
}
interface ToastState {
	toasts: ToastItem[];
}
type ToastAction =
	| { type: 'ADD_TOAST'; payload: ToastItem }
	| { type: 'REMOVE_TOAST'; payload: string };
const initialState: ToastState = {
	toasts: [],
};
function toastReducer(state: ToastState, action: ToastAction): ToastState {
	switch (action.type) {
		case 'ADD_TOAST':
			return {
				...state,
				toasts: [...state.toasts, action.payload],
			};
		case 'REMOVE_TOAST':
			return {
				...state,
				toasts: state.toasts.filter((toast) => toast.id !== action.payload),
			};
		default:
			return state;
	}
}
interface ToastContextType {
	toasts: ToastItem[];
	addToast: (toast: Omit<ToastItem, 'id'>) => void;
	removeToast: (id: string) => void;
	showSuccess: (title: string, message?: string) => void;
	showError: (title: string, message?: string) => void;
	showWarning: (title: string, message?: string) => void;
	showInfo: (title: string, message?: string) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);
interface ToastProviderProps {
	children: ReactNode;
}
export function ToastProvider({ children }: ToastProviderProps) {
	const [state, dispatch] = useReducer(toastReducer, initialState);
	const addToast = (toast: Omit<ToastItem, 'id'>) => {
		const id = `toast-${Date.now()}-${Math.random()
			.toString(36)
			.substr(2, 9)}`;
		dispatch({
			type: 'ADD_TOAST',
			payload: { ...toast, id },
		});
	};
	const removeToast = (id: string) => {
		dispatch({
			type: 'REMOVE_TOAST',
			payload: id,
		});
	};
	const showSuccess = (title: string, message?: string) => {
		addToast({ type: 'success', title, message });
	};
	const showError = (title: string, message?: string) => {
		addToast({ type: 'error', title, message });
	};
	const showWarning = (title: string, message?: string) => {
		addToast({ type: 'warning', title, message });
	};
	const showInfo = (title: string, message?: string) => {
		addToast({ type: 'info', title, message });
	};
	const value: ToastContextType = {
		toasts: state.toasts,
		addToast,
		removeToast,
		showSuccess,
		showError,
		showWarning,
		showInfo,
	};
	return (
		<ToastContext.Provider value={value}>
			{children}
			<div className='toast-container'>
				{state.toasts.map((toast) => (
					<Toast
						key={toast.id}
						id={toast.id}
						type={toast.type}
						title={toast.title}
						message={toast.message}
						duration={toast.duration}
						onClose={removeToast}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
}
export function useToast(): ToastContextType {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
}
