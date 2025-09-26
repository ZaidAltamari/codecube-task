import { useState, useEffect } from 'react';
import { Post } from '../types/api';
import { validateRequired } from '../utils/validation';
export interface PostFormData {
	userId: string;
	title: string;
	body: string;
}
export interface PostFormErrors {
	userId?: string;
	title?: string;
	body?: string;
}
export interface UsePostFormReturn {
	formData: PostFormData;
	errors: PostFormErrors;
	isValid: boolean;
	handleInputChange: (
		field: keyof PostFormData,
	) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	validateForm: () => boolean;
	resetForm: (post?: Post | null) => void;
	getSubmitData: () => Omit<Post, 'id'>;
}
export function usePostForm(initialPost?: Post | null): UsePostFormReturn {
	const [formData, setFormData] = useState<PostFormData>({
		userId: initialPost?.userId.toString() || '1',
		title: initialPost?.title || '',
		body: initialPost?.body || '',
	});
	const [errors, setErrors] = useState<PostFormErrors>({});
	useEffect(() => {
		if (initialPost) {
			setFormData({
				userId: initialPost.userId.toString(),
				title: initialPost.title,
				body: initialPost.body,
			});
			setErrors({});
		}
	}, [initialPost]);
	const validateForm = (): boolean => {
		const newErrors: PostFormErrors = {};
		const userIdError = validateRequired(formData.userId, 'User ID');
		if (userIdError) {
			newErrors.userId = userIdError;
		} else if (
			isNaN(Number(formData.userId)) ||
			Number(formData.userId) < 1
		) {
			newErrors.userId = 'User ID must be a valid number';
		}
		const titleError = validateRequired(formData.title, 'Title');
		if (titleError) {
			newErrors.title = titleError;
		} else if (formData.title.trim().length < 3) {
			newErrors.title = 'Title must be at least 3 characters long';
		} else if (formData.title.trim().length > 100) {
			newErrors.title = 'Title must not exceed 100 characters';
		}
		const bodyError = validateRequired(formData.body, 'Content');
		if (bodyError) {
			newErrors.body = bodyError;
		} else if (formData.body.trim().length < 10) {
			newErrors.body = 'Content must be at least 10 characters long';
		} else if (formData.body.trim().length > 1000) {
			newErrors.body = 'Content must not exceed 1000 characters';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	const handleInputChange =
		(field: keyof PostFormData) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormData((prev) => ({
				...prev,
				[field]: e.target.value,
			}));
			if (errors[field]) {
				setErrors((prev) => ({
					...prev,
					[field]: undefined,
				}));
			}
		};
	const resetForm = (post?: Post | null) => {
		setFormData({
			userId: post?.userId.toString() || '1',
			title: post?.title || '',
			body: post?.body || '',
		});
		setErrors({});
	};
	const getSubmitData = (): Omit<Post, 'id'> => {
		return {
			userId: Number(formData.userId),
			title: formData.title.trim(),
			body: formData.body.trim(),
		};
	};
	const isValid =
		Object.keys(errors).length === 0 &&
		formData.userId.trim().length > 0 &&
		formData.title.trim().length > 0 &&
		formData.body.trim().length > 0;
	return {
		formData,
		errors,
		isValid,
		handleInputChange,
		validateForm,
		resetForm,
		getSubmitData,
	};
}
