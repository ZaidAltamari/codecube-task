import React from 'react';
import { Post } from '../../types/api';
import { TableRow } from './TableRow';
interface TableBodyProps {
	posts: Post[];
	onEdit: (post: Post) => void;
	onDelete: (postId: number) => void;
}
export const TableBody: React.FC<TableBodyProps> = ({
	posts,
	onEdit,
	onDelete,
}) => {
	return (
		<tbody>
			{posts.map((post) => (
				<TableRow
					key={post.id}
					post={post}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			))}
		</tbody>
	);
};
