import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Icon } from '../UI/Icon';
import { getIcon } from '../../utils/iconMappings';
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
				<Icon
					name={getIcon('ADD')}
					size="sm"
					color="currentColor"
					aria-label="Add new post"
				/>
				<span className='add-text'>Add New Post</span>
			</button>
		</div>
	);
};
