import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '../types/api';
import { apiService } from '../services/api';
import { QUERY_KEYS } from '../utils/queryKeys';
import { useToast } from '../contexts/ToastContext';
export interface UsePostsReturn {
	posts: Post[];
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	refetch: () => void;
	createPost: {
		mutate: (postData: Omit<Post, 'id'>) => void;
		mutateAsync: (postData: Omit<Post, 'id'>) => Promise<Post>;
		isLoading: boolean;
		isError: boolean;
		error: Error | null;
	};
	updatePost: {
		mutate: (variables: { id: number; data: Omit<Post, 'id'> }) => void;
		mutateAsync: (variables: {
			id: number;
			data: Omit<Post, 'id'>;
		}) => Promise<Post>;
		isLoading: boolean;
		isError: boolean;
		error: Error | null;
	};
	deletePost: {
		mutate: (id: number) => void;
		mutateAsync: (id: number) => Promise<void>;
		isLoading: boolean;
		isError: boolean;
		error: Error | null;
	};
}
export function usePosts(): UsePostsReturn {
	const queryClient = useQueryClient();
	const { showSuccess, showError } = useToast();
	const {
		data: posts = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: QUERY_KEYS.posts,
		queryFn: () => apiService.getPosts(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: (failureCount, error) => {
			if (error instanceof Error && error.message.includes('4')) {
				return false;
			}
			return failureCount < 2;
		},
	});
	const createPostMutation = useMutation({
		mutationFn: (postData: Omit<Post, 'id'>) =>
			apiService.createPost(postData),
		onSuccess: (newPost) => {
			const postWithMetadata = {
				...newPost,
				isLocallyCreated: newPost.id > 100,
			} as Post & { isLocallyCreated?: boolean };
			queryClient.setQueryData<Post[]>(QUERY_KEYS.posts, (oldPosts) => {
				return oldPosts
					? [postWithMetadata, ...oldPosts]
					: [postWithMetadata];
			});
			showSuccess('Post Created', 'Your new post has been successfully created.');
		},
		onError: (err) => {
			console.error('Create post failed:', err);
			showError('Creation Failed', 'Failed to create the post. Please try again.');
		},
	});
	const updatePostMutation = useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: number;
			data: Omit<Post, 'id'>;
		}) => {
			try {
				return await apiService.updatePost(id, data);
			} catch (error) {
				if (id > 100) {
					console.warn(
						'API update failed for locally created post, updating optimistically',
					);
					return { id, ...data } as Post;
				}
				throw error;
			}
		},
		onSuccess: (updatedPost, { id }) => {
			const isLocalPost = id > 100;
			queryClient.setQueryData<Post[]>(QUERY_KEYS.posts, (oldPosts) => {
				return oldPosts
					? oldPosts.map((post) =>
							post.id === id
								? { ...updatedPost, isLocallyCreated: isLocalPost }
								: post,
					  )
					: [updatedPost];
			});
			showSuccess('Post Updated', 'Your post has been successfully updated.');
		},
		onError: (err) => {
			console.error('Update post failed:', err);
			showError('Update Failed', 'Failed to update the post. Please try again.');
		},
	});
	const deletePostMutation = useMutation({
		mutationFn: (id: number) => apiService.deletePost(id),
		onMutate: async (deletedId) => {
			await queryClient.cancelQueries({ queryKey: QUERY_KEYS.posts });
			const previousPosts = queryClient.getQueryData<Post[]>(
				QUERY_KEYS.posts,
			);
			queryClient.setQueryData<Post[]>(QUERY_KEYS.posts, (old) => {
				return old ? old.filter((post) => post.id !== deletedId) : [];
			});
			return { previousPosts, deletedId };
		},
		onSuccess: () => {
			showSuccess('Post Deleted', 'The post has been successfully deleted.');
		},
		onError: (err, _, context) => {
			if (context?.previousPosts) {
				queryClient.setQueryData(QUERY_KEYS.posts, context.previousPosts);
			}
			console.error('Delete post failed:', err);
			showError('Delete Failed', 'Failed to delete the post. Please try again.');
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts });
		},
	});
	return {
		posts,
		isLoading,
		isError,
		error,
		refetch,
		createPost: {
			mutate: createPostMutation.mutate,
			mutateAsync: createPostMutation.mutateAsync,
			isLoading: createPostMutation.isPending,
			isError: createPostMutation.isError,
			error: createPostMutation.error,
		},
		updatePost: {
			mutate: updatePostMutation.mutate,
			mutateAsync: updatePostMutation.mutateAsync,
			isLoading: updatePostMutation.isPending,
			isError: updatePostMutation.isError,
			error: updatePostMutation.error,
		},
		deletePost: {
			mutate: deletePostMutation.mutate,
			mutateAsync: deletePostMutation.mutateAsync,
			isLoading: deletePostMutation.isPending,
			isError: deletePostMutation.isError,
			error: deletePostMutation.error,
		},
	};
}
