import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import { useTableFilter } from '../../hooks/useTableFilter';
import { useModal } from '../../hooks/useModal';
import { useDebounce } from '../../hooks/useDebounce';
import { PostsTable } from '../PostsTable/PostsTable';
import { PostModal } from '../PostModal/PostModal';
import { PostsActions } from '../PostsActions/PostsActions';
import { ConfirmationModal } from '../UI/ConfirmationModal/ConfirmationModal';
import { Icon } from '../UI/Icon';
import { getIcon } from '../../utils/iconMappings';
import { Post } from '../../types/api';
import './Dashboard.scss';
const Dashboard: React.FC = () => {
	const { user, logout } = useAuth();
	const [searchTerm, setSearchTerm] = useState('');
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
	const [isInitialMount, setIsInitialMount] = useState(true);
	const {
		posts,
		isLoading,
		isError,
		error,
		refetch,
		createPost,
		updatePost,
		deletePost,
	} = usePosts();
	const postModal = useModal<Post>();
	const debouncedSearchTerm = useDebounce(searchTerm, 300);
	const { filterData } = useTableFilter();
	const filteredPosts = useMemo(() => {
		return filterData(posts, debouncedSearchTerm);
	}, [posts, debouncedSearchTerm, filterData]);
	useEffect(() => {
		if (!isLoading && posts.length > 0) {
			const timer = setTimeout(() => {
				setIsInitialMount(false);
			}, 300);
			return () => clearTimeout(timer);
		}
		return () => {};
	}, [isLoading, posts.length]);
	const handleLogoutClick = () => {
		setShowLogoutConfirm(true);
	};
	const handleLogoutConfirm = () => {
		setShowLogoutConfirm(false);
		logout();
	};
	const handleLogoutCancel = () => {
		setShowLogoutConfirm(false);
	};
	const handleCreatePost = () => {
		postModal.open();
	};
	const handleEditPost = (post: Post) => {
		postModal.open(post);
	};
	const handleDeletePost = (postId: number) => {
		deletePost.mutate(postId);
	};
	const handleSavePost = async (postData: Omit<Post, 'id'>) => {
		if (postModal.data) {
			await updatePost.mutateAsync({
				id: postModal.data.id,
				data: postData,
			});
		} else {
			await createPost.mutateAsync(postData);
		}
		postModal.close();
	};
	return (
		<div className='dashboard'>
			<header className='dashboard-header'>
				<div className='dashboard-container'>
					<div className='header-content'>
						<div className='header-left'>
							<div className='logo-section'>
								<h1 className='dashboard-title'>Secure Dashboard</h1>
							</div>
						</div>
						<div className='header-right'>
							<div className='user-info'>
								<div className='user-avatar'>
									{user?.username.charAt(0).toUpperCase()}
								</div>
								<div className='user-details'>
									<span className='username'>{user?.username}</span>
									<span
										className={`user-role ${user?.role.toLowerCase()}`}>
										{user?.role}
									</span>
								</div>
							</div>
							<button
								className='logout-button'
								onClick={handleLogoutClick}
								title='Logout'>
								<Icon
									name={getIcon('LOGOUT')}
									size='sm'
									aria-label='Logout'
								/>
								<span className='logout-text'>Logout</span>
							</button>
						</div>
					</div>
				</div>
			</header>
			<main className='dashboard-main'>
				<div className='dashboard-container'>
					<div className='content-header'>
						<h2 className='section-title'>Posts Management</h2>
						<div className='section-subtitle'>
							{user?.role === 'Editor'
								? 'Manage posts with full edit capabilities'
								: 'View posts (read-only access)'}
						</div>
					</div>
					<div className='table-section'>
						<div className='table-controls'>
							<div className='search-container'>
								<div className='search-icon'>
									<Icon
										name={getIcon('SEARCH')}
										size='sm'
										aria-label='Search icon'
									/>
								</div>
								<input
									type='text'
									className='search-input'
									placeholder='Search posts by title, content, ID...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								{searchTerm && (
									<button
										className='search-clear'
										onClick={() => setSearchTerm('')}
										title='Clear search'>
										<Icon
											name={getIcon('CLOSE')}
											size='sm'
											aria-label='Clear search'
										/>
									</button>
								)}
							</div>
							<PostsActions onCreatePost={handleCreatePost} />
						</div>
						<PostsTable
							posts={filteredPosts}
							loading={isLoading}
							error={
								isError ? error?.message || 'An error occurred' : null
							}
							searchTerm={debouncedSearchTerm}
							onRetry={refetch}
							onEdit={handleEditPost}
							onDelete={handleDeletePost}
							suppressInitialLoading={isInitialMount}
						/>
					</div>
				</div>
			</main>
			<PostModal
				isOpen={postModal.isOpen}
				post={postModal.data}
				onClose={postModal.close}
				onSave={handleSavePost}
				isLoading={createPost.isLoading || updatePost.isLoading}
			/>
			<ConfirmationModal
				isOpen={showLogoutConfirm}
				title='Confirm Logout'
				message='Are you sure you want to logout? You will need to login again to access the dashboard.'
				confirmText='Logout'
				cancelText='Cancel'
				confirmButtonType='danger'
				onConfirm={handleLogoutConfirm}
				onCancel={handleLogoutCancel}
			/>
		</div>
	);
};
export default Dashboard;
