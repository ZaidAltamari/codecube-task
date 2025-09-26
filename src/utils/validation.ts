export interface PasswordValidationResult {
	isValid: boolean;
	errors: string[];
}
export function validatePassword(password: string): PasswordValidationResult {
	const errors: string[] = [];
	if (password.length < 8) {
		errors.push('Password must be at least 8 characters long');
	}
	if (!/[A-Z]/.test(password)) {
		errors.push('Password must contain at least one uppercase letter');
	}
	if (!/[a-z]/.test(password)) {
		errors.push('Password must contain at least one lowercase letter');
	}
	if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
		errors.push('Password must contain at least one special character');
	}
	return {
		isValid: errors.length === 0,
		errors,
	};
}
export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
export function validateRequired(
	value: string,
	fieldName: string,
): string | null {
	if (!value || value.trim().length === 0) {
		return `${fieldName} is required`;
	}
	return null;
}
