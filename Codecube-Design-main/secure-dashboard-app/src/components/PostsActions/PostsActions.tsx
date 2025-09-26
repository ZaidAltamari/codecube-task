import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './PostsActions.scss';
interface PostsActionsProps {
	onCreatePost: () => void;
}
export const PostsActions: React.FC<PostsActionsProps> = ({ onCreatePost }) => {
	const { user } = useAuth();
	if (user?.role !== 'Editor') {
		return null;
	}
	return (
		<div className='posts-actions'>
			<button
				className='add-button'
				onClick={onCreatePost}>
				<span className='add-icon'>+</span>
				<span className='add-text'>Add New Post</span>
			</button>
		</div>
	);
};
