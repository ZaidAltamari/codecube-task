export interface ValidationRule<T = any> {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
	email?: boolean;
	password?: boolean;
	custom?: (value: T) => string | null;
	message?: string;
}
export interface ValidationSchema {
	[fieldName: string]: ValidationRule;
}
export interface ValidationResult {
	isValid: boolean;
	errors: Record<string, string>;
}
export class ValidationEngine {
	private sanitizeInput(value: string): string {
		return value
			.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
			.replace(/javascript:/gi, '')
			.replace(/on\w+\s*=\s*"[^"]*"/gi, '')
			.replace(/on\w+\s*=\s*'[^']*'/gi, '')
			.trim();
	}
	private validateField(value: any, rule: ValidationRule): string | null {
		if (typeof value === 'string') {
			value = this.sanitizeInput(value);
		}
		if (
			rule.required &&
			(!value || (typeof value === 'string' && value.trim() === ''))
		) {
			return rule.message || 'Please fill in this field';
		}
		if (!value || (typeof value === 'string' && value.trim() === '')) {
			return null;
		}
		if (typeof value === 'string') {
			if (rule.minLength && value.length < rule.minLength) {
				return (
					rule.message || `Must be at least ${rule.minLength} characters`
				);
			}
			if (rule.maxLength && value.length > rule.maxLength) {
				return (
					rule.message || `Must not exceed ${rule.maxLength} characters`
				);
			}
			if (rule.pattern && !rule.pattern.test(value)) {
				return rule.message || 'Invalid format';
			}
			if (rule.email) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					return rule.message || 'Please enter a valid email address';
				}
			}
			if (rule.password) {
				const passwordErrors = [];
				if (value.length < 8) {
					passwordErrors.push('at least 8 characters');
				}
				if (!/[A-Z]/.test(value)) {
					passwordErrors.push('one uppercase letter (A-Z)');
				}
				if (!/[a-z]/.test(value)) {
					passwordErrors.push('one lowercase letter (a-z)');
				}
				if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
					passwordErrors.push('one special character (!@#$%^&*)');
				}
				if (passwordErrors.length > 0) {
					const errorMessage =
						passwordErrors.length === 1
							? `Password needs ${passwordErrors[0]}`
							: `Password needs: ${passwordErrors.join(', ')}`;
					return errorMessage;
				}
			}
		}
		if (rule.custom) {
			return rule.custom(value);
		}
		return null;
	}
	validate(
		data: Record<string, any>,
		schema: ValidationSchema,
	): ValidationResult {
		const errors: Record<string, string> = {};
		for (const [fieldName, rule] of Object.entries(schema)) {
			const fieldError = this.validateField(data[fieldName], rule);
			if (fieldError) {
				errors[fieldName] = fieldError;
			}
		}
		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	}
}
export const validationEngine = new ValidationEngine();
export const loginSchema: ValidationSchema = {
	username: {
		required: true,
		email: true,
	},
	password: {
		required: true,
		password: true,
	},
};
export const postSchema: ValidationSchema = {
	userId: {
		required: true,
		custom: (value) => {
			const numValue = Number(value);
			if (isNaN(numValue) || numValue < 1) {
				return 'User ID must be a valid number';
			}
			return null;
		},
	},
	title: {
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	body: {
		required: true,
		minLength: 10,
		maxLength: 1000,
	},
};
