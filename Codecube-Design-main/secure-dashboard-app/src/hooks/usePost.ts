import { useQuery } from '@tanstack/react-query';
import { Post } from '../types/api';
import { apiService } from '../services/api';
import { QUERY_KEYS } from '../utils/queryKeys';
export interface UsePostOptions {
	enabled?: boolean;
}
export interface UsePostReturn {
	post: Post | undefined;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	refetch: () => void;
}
export function usePost(
	id: number,
	options: UsePostOptions = {},
): UsePostReturn {
	const {
		data: post,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: QUERY_KEYS.post(id),
		queryFn: () => apiService.getPost(id),
		enabled: options.enabled !== false && id > 0,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: (failureCount, error) => {
			if (error instanceof Error && error.message.includes('404')) {
				return false;
			}
			return failureCount < 2;
		},
	});
	return {
		post,
		isLoading,
		isError,
		error,
		refetch,
	};
}
