import { Post } from '../types/api';
export interface UseTableFilterReturn {
	filterData: (data: Post[], searchTerm: string) => Post[];
}
export function useTableFilter(): UseTableFilterReturn {
	const filterData = (data: Post[], searchTerm: string): Post[] => {
		if (!searchTerm.trim()) {
			return data;
		}
		const lowerCaseSearchTerm = searchTerm.toLowerCase();
		return data.filter(
			(post) =>
				post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
				post.body.toLowerCase().includes(lowerCaseSearchTerm) ||
				post.id.toString().includes(lowerCaseSearchTerm) ||
				post.userId.toString().includes(lowerCaseSearchTerm),
		);
	};
	return {
		filterData,
	};
}
