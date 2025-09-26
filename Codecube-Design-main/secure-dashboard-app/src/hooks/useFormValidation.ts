import { useState, useCallback, useMemo } from 'react';
import {
	ValidationSchema,
	ValidationResult,
	validationEngine,
} from '../utils/validationSchema';
export interface UseFormValidationProps {
	schema: ValidationSchema;
	debounceMs?: number;
	validateOnChange?: boolean;
}
export interface UseFormValidationReturn {
	errors: Record<string, string>;
	isValid: boolean;
	isValidating: boolean;
	validateField: (fieldName: string, value: any) => Promise<string | null>;
	validateForm: (data: Record<string, any>) => ValidationResult;
	clearErrors: () => void;
	clearFieldError: (fieldName: string) => void;
	setFieldError: (fieldName: string, error: string) => void;
}
export function useFormValidation({
	schema,
	debounceMs = 300,
	validateOnChange = true,
}: UseFormValidationProps): UseFormValidationReturn {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isValidating, setIsValidating] = useState(false);
	const debounce = useCallback((func: Function, delay: number) => {
		let timeoutId: NodeJS.Timeout;
		return (...args: any[]) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func.apply(null, args), delay);
		};
	}, []);
	const validateField = useCallback(
		async (fieldName: string, value: any): Promise<string | null> => {
			if (!schema[fieldName] || !validateOnChange) {
				return null;
			}
			setIsValidating(true);
			return new Promise((resolve) => {
				const debouncedValidation = debounce(() => {
					const rule = schema[fieldName];
					const result = validationEngine.validate(
						{ [fieldName]: value },
						{ [fieldName]: rule },
					);
					const error = result.errors[fieldName] || null;
					setErrors((prev) => {
						const newErrors = { ...prev };
						if (error) {
							newErrors[fieldName] = error;
						} else {
							delete newErrors[fieldName];
						}
						return newErrors;
					});
					setIsValidating(false);
					resolve(error);
				}, debounceMs);
				debouncedValidation();
			});
		},
		[schema, debounceMs, validateOnChange, debounce],
	);
	const validateForm = useCallback(
		(data: Record<string, any>): ValidationResult => {
			const result = validationEngine.validate(data, schema);
			setErrors(result.errors);
			return result;
		},
		[schema],
	);
	const clearErrors = useCallback(() => {
		setErrors({});
	}, []);
	const clearFieldError = useCallback((fieldName: string) => {
		setErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[fieldName];
			return newErrors;
		});
	}, []);
	const setFieldError = useCallback((fieldName: string, error: string) => {
		setErrors((prev) => ({
			...prev,
			[fieldName]: error,
		}));
	}, []);
	const isValid = useMemo(() => {
		return Object.keys(errors).length === 0;
	}, [errors]);
	return {
		errors,
		isValid,
		isValidating,
		validateField,
		validateForm,
		clearErrors,
		clearFieldError,
		setFieldError,
	};
}
