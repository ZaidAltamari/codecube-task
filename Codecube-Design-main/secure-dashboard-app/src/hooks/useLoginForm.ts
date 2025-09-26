import { useState, useCallback, useRef, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useFormValidation } from './useFormValidation';
import { useRateLimit } from './useRateLimit';
import { useToggle } from './useToggle';
import { loginSchema } from '../utils/validationSchema';
export interface LoginFormData {
	username: string;
	password: string;
}
export interface UseLoginFormReturn {
	formData: LoginFormData;
	errors: Record<string, string>;
	isLoading: boolean;
	isValid: boolean;
	showPassword: boolean;
	isFormFocused: boolean;
	isBlocked: boolean;
	remainingAttempts: number;
	timeUntilReset: number;
	handleInputChange: (
		field: keyof LoginFormData,
	) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.FormEvent) => Promise<void>;
	togglePasswordVisibility: () => void;
	setFormFocus: (focused: boolean) => void;
	resetForm: () => void;
	resetRateLimit: () => void;
}
const INITIAL_FORM_DATA: LoginFormData = {
	username: '',
	password: '',
};
export function useLoginForm(): UseLoginFormReturn {
	const { login, isLoading, error } = useAuth();
	const [formData, setFormData] = useState<LoginFormData>(INITIAL_FORM_DATA);
	const {
		errors,
		isValid: formIsValid,
		validateField,
		validateForm,
		clearFieldError,
		setFieldError,
	} = useFormValidation({
		schema: loginSchema,
		debounceMs: 500,
		validateOnChange: true,
	});
	const {
		isBlocked,
		remainingAttempts,
		timeUntilReset,
		canAttempt,
		attempt,
		reset: resetRateLimit,
	} = useRateLimit({
		maxAttempts: 5,
		windowMs: 15 * 60 * 1000,
		blockDurationMs: 5 * 60 * 1000,
	});
	const { value: showPassword, toggle: togglePasswordVisibility } =
		useToggle(false);
	const { value: isFormFocused, setValue: setFormFocus } = useToggle(false);
	const cleanupRef = useRef<(() => void) | null>(null);
	const handleInputChange = useCallback(
		(field: keyof LoginFormData) =>
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const value = e.target.value;
				setFormData((prev) => ({
					...prev,
					[field]: value,
				}));
				if (errors[field]) {
					clearFieldError(field);
				}
				validateField(field, value);
			},
		[errors, clearFieldError, validateField],
	);
	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (errors['general']) {
				clearFieldError('general');
			}
			if (!canAttempt) {
				setFieldError(
					'general',
					isBlocked
						? `Too many failed attempts. Try again in ${Math.ceil(
								timeUntilReset / 1000,
						  )} seconds.`
						: 'Rate limit exceeded',
				);
				return;
			}
			validateForm(formData);
			const attemptAllowed = attempt();
			if (!attemptAllowed) {
				setFieldError(
					'general',
					'Too many login attempts. Please wait before trying again.',
				);
				return;
			}
			try {
				let isCancelled = false;
				cleanupRef.current = () => {
					isCancelled = true;
				};
				await login(formData);
				if (!isCancelled) {
					resetRateLimit();
				}
			} catch (err) {
				if (error) {
					setFieldError('general', error);
				}
			} finally {
				cleanupRef.current = null;
			}
		},
		[
			formData,
			canAttempt,
			isBlocked,
			timeUntilReset,
			validateForm,
			attempt,
			login,
			error,
			setFieldError,
			resetRateLimit,
			errors,
			clearFieldError,
		],
	);
	const resetForm = useCallback(() => {
		setFormData(INITIAL_FORM_DATA);
	}, []);
	useEffect(() => {
		return () => {
			if (cleanupRef.current) {
				cleanupRef.current();
			}
		};
	}, []);
	useEffect(() => {
		if (error) {
			setFieldError('general', error);
		}
	}, [error, setFieldError]);
	return {
		formData,
		errors,
		isLoading,
		isValid: formIsValid,
		showPassword,
		isFormFocused,
		isBlocked,
		remainingAttempts,
		timeUntilReset,
		handleInputChange,
		handleSubmit,
		togglePasswordVisibility,
		setFormFocus,
		resetForm,
		resetRateLimit,
	};
}
