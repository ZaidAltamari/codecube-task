import React from 'react';
import { Post } from '../../types/api';
import { TableActions } from './TableActions';
interface TableRowProps {
	post: Post;
	onEdit: (post: Post) => void;
	onDelete: (postId: number) => void;
}
export const TableRow: React.FC<TableRowProps> = ({
	post,
	onEdit,
	onDelete,
}) => {
	const truncateText = (text: string, maxLength: number = 100) => {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	};
	return (
		<tr className='table-row'>
			<td className='id-cell'>{post.id}</td>
			<td className='user-id-cell'>{post.userId}</td>
			<td className='title-cell'>
				<div
					className='title-content'
					title={post.title}>
					{truncateText(post.title, 50)}
				</div>
			</td>
			<td className='body-cell'>
				<div
					className='body-content'
					title={post.body}>
					{truncateText(post.body)}
				</div>
			</td>
			<TableActions
				post={post}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		</tr>
	);
};
