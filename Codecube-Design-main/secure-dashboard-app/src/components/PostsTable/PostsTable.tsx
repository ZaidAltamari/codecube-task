import React, { useMemo, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Post } from '../../types/api';
import { useTableSort } from '../../hooks/useTableSort';
import { usePagination } from '../../hooks/usePagination';
import { LoadingSpinner } from '../UI/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../UI/ErrorMessage/ErrorMessage';
import { Pagination } from '../UI/Pagination/Pagination';
import { ConfirmationModal } from '../UI/ConfirmationModal/ConfirmationModal';
import { EmptyState } from '../UI/EmptyState';
import './PostsTable.scss';
interface PostsTableProps {
	posts: Post[];
	loading: boolean;
	error: string | null;
	searchTerm: string;
	onRetry: () => void;
	onEdit: (post: Post) => void;
	onDelete: (postId: number) => void;
	suppressInitialLoading?: boolean;
}
interface DeleteConfirmState {
	isOpen: boolean;
	post: Post | null;
}
type SortableColumn = 'id' | 'userId' | 'title' | 'body';
interface TableColumn {
	key: SortableColumn;
	label: string;
	width?: string;
}
const ITEMS_PER_PAGE = 10;
const MAX_TITLE_LENGTH = 50;
const MAX_BODY_LENGTH = 100;
const TABLE_COLUMNS: ReadonlyArray<TableColumn> = [
	{ key: 'id', label: 'ID', width: '80px' },
	{ key: 'userId', label: 'User ID', width: '100px' },
	{ key: 'title', label: 'Title' },
	{ key: 'body', label: 'Content' },
];
export const PostsTable: React.FC<PostsTableProps> = ({
	posts,
	loading,
	error,
	searchTerm,
	onRetry,
	onEdit,
	onDelete,
	suppressInitialLoading = false,
}) => {
	const { user } = useAuth();
	const { sortConfig, handleSort, sortData, getSortIcon } = useTableSort();
	const [deleteConfirm, setDeleteConfirm] = React.useState<DeleteConfirmState>(
		{
			isOpen: false,
			post: null,
		},
	);
	const pagination = usePagination<Post>({
		totalItems: posts.length,
		itemsPerPage: ITEMS_PER_PAGE,
		initialPage: 1,
	});
	const truncateText = useCallback(
		(text: string, maxLength: number = MAX_BODY_LENGTH) => {
			if (text.length <= maxLength) return text;
			return text.substring(0, maxLength) + '...';
		},
		[],
	);
	const handleDeleteClick = useCallback((post: Post) => {
		setDeleteConfirm({ isOpen: true, post });
	}, []);
	const handleDeleteConfirm = useCallback(() => {
		if (deleteConfirm.post) {
			onDelete(deleteConfirm.post.id);
		}
		setDeleteConfirm({ isOpen: false, post: null });
	}, [deleteConfirm.post, onDelete]);
	const handleDeleteCancel = useCallback(() => {
		setDeleteConfirm({ isOpen: false, post: null });
	}, []);
	const processedPosts = useMemo(() => {
		const sortedPosts = sortData(posts);
		return pagination.getPageItems(sortedPosts);
	}, [posts, sortData, pagination]);
	const isEditor = user?.role === 'Editor';
	const emptyStateProps = useMemo(
		() => ({
			icon: searchTerm ? '🔍' : '📄',
			title: searchTerm ? 'No posts found' : 'No posts available',
			description: searchTerm
				? `No posts match your search for "${searchTerm}". Try adjusting your search terms.`
				: 'There are no posts to display at the moment.',
		}),
		[searchTerm],
	);
	const renderTableHeader = useCallback(
		() => (
			<thead>
				<tr>
					{TABLE_COLUMNS.map(({ key, label, width }) => (
						<th
							key={key}
							style={width ? { width } : undefined}
							className={`sortable ${
								sortConfig.key === key ? 'active' : ''
							}`}
							onClick={() => handleSort(key)}>
							<div className='header-content'>
								<span>{label}</span>
								<span className='sort-icon'>{getSortIcon(key)}</span>
							</div>
						</th>
					))}
					{isEditor && <th className='actions-column'>Actions</th>}
				</tr>
			</thead>
		),
		[sortConfig.key, handleSort, getSortIcon, isEditor],
	);
	const renderActionButtons = useCallback(
		(post: Post) => (
			<div className='action-buttons'>
				<button
					className='edit-button'
					onClick={() => onEdit(post)}
					title='Edit post'
					aria-label={`Edit post: ${post.title}`}>
					✏️
				</button>
				<button
					className='delete-button'
					onClick={() => handleDeleteClick(post)}
					title='Delete post'
					aria-label={`Delete post: ${post.title}`}>
					🗑️
				</button>
			</div>
		),
		[onEdit, handleDeleteClick],
	);
	if (loading && !suppressInitialLoading) {
		return (
			<div className='table-loading'>
				<LoadingSpinner />
				<p>Loading posts...</p>
			</div>
		);
	}
	if (error) {
		return (
			<div className='table-error'>
				<ErrorMessage
					message={error}
					onRetry={onRetry}
				/>
			</div>
		);
	}
	return (
		<div className='posts-table-container'>
			<div className='table-wrapper'>
				{(posts.length > 0 || loading) && (
					<table
						className='posts-table'
						role='table'
						aria-label='Posts data table'>
						{renderTableHeader()}
						<tbody>
							{processedPosts.map((post) => (
								<tr
									key={post.id}
									className='table-row'>
									<td className='id-cell'>{post.id}</td>
									<td className='user-id-cell'>{post.userId}</td>
									<td className='title-cell'>
										<div
											className='title-content'
											title={post.title}>
											{truncateText(post.title, MAX_TITLE_LENGTH)}
										</div>
									</td>
									<td className='body-cell'>
										<div
											className='body-content'
											title={post.body}>
											{truncateText(post.body)}
										</div>
									</td>
									{isEditor && (
										<td className='actions-cell'>
											{renderActionButtons(post)}
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				)}
				{posts.length === 0 && !loading && (
					<EmptyState {...emptyStateProps} />
				)}
				{posts.length > 0 && (
					<Pagination
						currentPage={pagination.currentPage}
						totalPages={pagination.totalPages}
						onPageChange={pagination.goToPage}
						canGoNext={pagination.canGoNext}
						canGoPrev={pagination.canGoPrev}
						pageInfo={pagination.pageInfo}
						onFirstPage={pagination.goToFirstPage}
						onLastPage={pagination.goToLastPage}
						onNextPage={pagination.nextPage}
						onPrevPage={pagination.prevPage}
					/>
				)}
				{deleteConfirm.isOpen && (
					<ConfirmationModal
						isOpen
						title='Delete Post'
						message={`Are you sure you want to delete the post "${deleteConfirm.post?.title}"? This action cannot be undone.`}
						confirmText='Delete'
						cancelText='Cancel'
						confirmButtonType='danger'
						onConfirm={handleDeleteConfirm}
						onCancel={handleDeleteCancel}
					/>
				)}
			</div>
		</div>
	);
};
