import React, { useState } from 'react';
import { Post } from '../../types/api';
import { Modal } from '../UI/Modal/Modal';
import { PostForm } from '../PostForm/PostForm';
interface PostModalProps {
	isOpen: boolean;
	post: Post | null;
	onClose: () => void;
	onSave: (postData: Omit<Post, 'id'>) => Promise<void>;
	isLoading?: boolean;
}
export const PostModal: React.FC<PostModalProps> = ({
	isOpen,
	post,
	onClose,
	onSave,
	isLoading = false,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleSave = async (postData: Omit<Post, 'id'>) => {
		try {
			setIsSubmitting(true);
			await onSave(postData);
			onClose();
		} catch (error) {
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleCancel = () => {
		if (!isSubmitting) {
			onClose();
		}
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={handleCancel}
			title={post ? 'Edit Post' : 'Create New Post'}
			size='medium'
			showCloseButton={false}>
			<PostForm
				post={post}
				onSave={handleSave}
				onCancel={handleCancel}
				isLoading={isSubmitting || isLoading}
			/>
		</Modal>
	);
};
