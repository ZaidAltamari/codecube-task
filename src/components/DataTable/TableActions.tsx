import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Post } from '../../types/api';
import { Icon } from '../UI/Icon';
import { getIcon } from '../../utils/iconMappings';
interface TableActionsProps {
	post: Post;
	onEdit: (post: Post) => void;
	onDelete: (postId: number) => void;
}
export const TableActions: React.FC<TableActionsProps> = ({
	post,
	onEdit,
	onDelete,
}) => {
	const { user } = useAuth();
	if (user?.role !== 'Editor') {
		return null;
	}
	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this post?')) {
			onDelete(post.id);
		}
	};
	return (
		<td className='actions-cell'>
			<div className='action-buttons'>
				<button
					className='edit-button'
					onClick={() => onEdit(post)}
					title='Edit post'>
					<Icon
						name={getIcon('EDIT')}
						size="sm"
						aria-label="Edit post"
					/>
				</button>
				<button
					className='delete-button'
					onClick={handleDelete}
					title='Delete post'>
					<Icon
						name={getIcon('DELETE')}
						size="sm"
						aria-label="Delete post"
					/>
				</button>
			</div>
		</td>
	);
};
