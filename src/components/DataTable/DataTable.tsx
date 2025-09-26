import React, { useState, useEffect, useMemo } from 'react';
import { Post, SortConfig, SortDirection } from '../../types/api';
import { usePosts } from '../../hooks/usePosts';
import { LoadingSpinner } from '../UI/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../UI/ErrorMessage/ErrorMessage';
import { Modal } from '../UI/Modal/Modal';
import { PostForm } from '../PostForm/PostForm';
import { EmptyState } from '../UI/EmptyState';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TableInfo } from './TableInfo';
import { getIcon } from '../../utils/iconMappings';
import './DataTable.scss';
interface DataTableProps {
	searchTerm: string;
	onCreatePost?: () => void;
}
export const DataTable: React.FC<DataTableProps> = ({
	searchTerm,
	onCreatePost,
}) => {
	const {
		posts,
		isLoading: loading,
		isError,
		error: queryError,
		refetch,
		createPost,
		updatePost,
		deletePost,
	} = usePosts();
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: 'id',
		direction: 'asc',
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingPost, setEditingPost] = useState<Post | null>(null);
	const error = isError ? queryError?.message || 'An error occurred' : null;
	const handleSort = (key: keyof Post) => {
		let direction: SortDirection = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });
	};
	const handleEdit = (post: Post) => {
		setEditingPost(post);
		setIsModalOpen(true);
	};
	const handleCreate = () => {
		setEditingPost(null);
		setIsModalOpen(true);
	};
	useEffect(() => {
		if (onCreatePost) {
			(window as any).dataTableCreatePost = handleCreate;
		}
	}, [onCreatePost]);
	const handleSave = async (postData: Omit<Post, 'id'>) => {
		try {
			if (editingPost) {
				await updatePost.mutateAsync({
					id: editingPost.id,
					data: postData,
				});
			} else {
				await createPost.mutateAsync(postData);
			}
			setIsModalOpen(false);
			setEditingPost(null);
		} catch (err) {
			console.error(
				`Error ${editingPost ? 'updating' : 'creating'} post:`,
				err,
			);
		}
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setEditingPost(null);
	};
	const handleDelete = async (postId: number) => {
		try {
			await deletePost.mutateAsync(postId);
		} catch (err) {
			console.error('Error deleting post:', err);
		}
	};
	const filteredAndSortedPosts = useMemo(() => {
		let filtered = posts.filter(
			(post) =>
				post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
				post.id.toString().includes(searchTerm) ||
				post.userId.toString().includes(searchTerm),
		);
		filtered.sort((a, b) => {
			const aValue = a[sortConfig.key];
			const bValue = b[sortConfig.key];
			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return sortConfig.direction === 'asc'
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}
			if (typeof aValue === 'number' && typeof bValue === 'number') {
				return sortConfig.direction === 'asc'
					? aValue - bValue
					: bValue - aValue;
			}
			return 0;
		});
		return filtered;
	}, [posts, searchTerm, sortConfig]);
	const getSortIcon = (key: keyof Post) => {
		if (sortConfig.key !== key) {
			return getIcon('SORT_NONE');
		}
		return sortConfig.direction === 'asc'
			? getIcon('SORT_ASC')
			: getIcon('SORT_DESC');
	};
	if (loading) {
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
					onRetry={() => refetch()}
				/>
			</div>
		);
	}
	return (
		<div className='data-table-container'>
			<TableInfo
				filteredCount={filteredAndSortedPosts.length}
				totalCount={posts.length}
				searchTerm={searchTerm}
			/>
			<div className='table-wrapper'>
				<table className='data-table'>
					<TableHeader
						sortConfig={sortConfig}
						onSort={handleSort}
						getSortIcon={getSortIcon}
					/>
					<TableBody
						posts={filteredAndSortedPosts}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				</table>
				{filteredAndSortedPosts.length === 0 && !loading && (
					<EmptyState
						icon={searchTerm ? 'search' : 'empty'}
						title={searchTerm ? 'No posts found' : 'No posts available'}
						description={
							searchTerm
								? `No posts match your search for "${searchTerm}". Try adjusting your search terms.`
								: 'No posts are currently available.'
						}
					/>
				)}
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={handleCancel}
				title={editingPost ? 'Edit Post' : 'Create New Post'}
				size='medium'>
				<PostForm
					post={editingPost}
					onSave={handleSave}
					onCancel={handleCancel}
					isLoading={
						editingPost ? updatePost.isLoading : createPost.isLoading
					}
				/>
			</Modal>
		</div>
	);
};
