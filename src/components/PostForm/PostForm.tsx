import React from 'react';
import { Post } from '../../types/api';
import { usePostForm } from '../../hooks/usePostForm';
import { FormInput } from '../UI/FormInput/FormInput';
import { FormTextarea } from '../UI/FormTextarea/FormTextarea';
import './PostForm.scss';
interface PostFormProps {
	post?: Post | null;
	onSave: (post: Omit<Post, 'id'>) => Promise<void>;
	onCancel: () => void;
	isLoading?: boolean;
}
export const PostForm: React.FC<PostFormProps> = ({
	post,
	onSave,
	onCancel,
	isLoading = false,
}) => {
	const { formData, errors, handleInputChange, validateForm, getSubmitData } =
		usePostForm(post);
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}
		try {
			await onSave(getSubmitData());
		} catch (error) {
			console.error('Error saving post:', error);
		}
	};
	return (
		<form
			className='post-form'
			onSubmit={handleSubmit}>
			<FormInput
				id='userId'
				type='number'
				label='User ID'
				placeholder='Enter user ID'
				value={formData.userId}
				onChange={handleInputChange('userId')}
				error={errors.userId}
				isLoading={isLoading}
				min='1'
			/>
			<FormInput
				id='title'
				type='text'
				label='Title'
				placeholder='Enter post title'
				value={formData.title}
				onChange={handleInputChange('title')}
				error={errors.title}
				isLoading={isLoading}
			/>
			<FormTextarea
				id='body'
				label='Content'
				placeholder='Enter post content'
				value={formData.body}
				onChange={handleInputChange('body')}
				error={errors.body}
				isLoading={isLoading}
				rows={6}
			/>
			<div className='form-actions'>
				<button
					type='button'
					className='cancel-button'
					onClick={onCancel}
					disabled={isLoading}>
					Cancel
				</button>
				<button
					type='submit'
					className={`save-button ${isLoading ? 'loading' : ''}`}
					disabled={isLoading}>
					{isLoading ? (
						<div className='loading-content'>
							<div className='spinner'></div>
							<span>Saving...</span>
						</div>
					) : post ? (
						'Update Post'
					) : (
						'Create Post'
					)}
				</button>
			</div>
		</form>
	);
};
