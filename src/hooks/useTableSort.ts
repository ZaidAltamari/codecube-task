import { useState } from 'react';
import { Post, SortConfig, SortDirection } from '../types/api';
import { IconName } from '../components/UI/Icon';
export interface UseTableSortReturn {
	sortConfig: SortConfig;
	handleSort: (key: keyof Post) => void;
	sortData: (data: Post[]) => Post[];
	getSortIcon: (key: keyof Post) => IconName;
}
export function useTableSort(
	initialSortKey: keyof Post = 'id',
	initialDirection: SortDirection = 'asc',
): UseTableSortReturn {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: initialSortKey,
		direction: initialDirection,
	});
	const handleSort = (key: keyof Post) => {
		let direction: SortDirection = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });
	};
	const sortData = (data: Post[]): Post[] => {
		return [...data].sort((a, b) => {
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
	};
	const getSortIcon = (key: keyof Post): IconName => {
		if (sortConfig.key !== key) {
			return 'arrow-up-down';
		}
		return sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down';
	};
	return {
		sortConfig,
		handleSort,
		sortData,
		getSortIcon,
	};
}
