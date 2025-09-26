import { useState, useMemo } from 'react';
export interface UsePaginationProps {
	totalItems: number;
	itemsPerPage?: number;
	initialPage?: number;
}
export interface UsePaginationReturn<T> {
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
	startIndex: number;
	endIndex: number;
	goToPage: (page: number) => void;
	nextPage: () => void;
	prevPage: () => void;
	goToFirstPage: () => void;
	goToLastPage: () => void;
	canGoNext: boolean;
	canGoPrev: boolean;
	paginatedData: (data: T[]) => T[];
	getPageItems: (data: T[]) => T[];
	pageInfo: {
		showing: string;
		total: number;
	};
}
export function usePagination<T = any>({
	totalItems,
	itemsPerPage = 10,
	initialPage = 1,
}: UsePaginationProps): UsePaginationReturn<T> {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const goToPage = (page: number) => {
		const validPage = Math.max(1, Math.min(page, totalPages));
		setCurrentPage(validPage);
	};
	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};
	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	const goToFirstPage = () => {
		setCurrentPage(1);
	};
	const goToLastPage = () => {
		setCurrentPage(totalPages);
	};
	const canGoNext = currentPage < totalPages;
	const canGoPrev = currentPage > 1;
	const paginatedData = (data: T[]): T[] => {
		return data.slice(startIndex, endIndex);
	};
	const getPageItems = paginatedData;
	const pageInfo = useMemo(() => {
		const showing =
			totalItems === 0
				? '0-0 of 0'
				: `${startIndex + 1}-${endIndex} of ${totalItems}`;
		return {
			showing,
			total: totalItems,
		};
	}, [startIndex, endIndex, totalItems]);
	return {
		currentPage,
		totalPages,
		itemsPerPage,
		startIndex,
		endIndex,
		goToPage,
		nextPage,
		prevPage,
		goToFirstPage,
		goToLastPage,
		canGoNext,
		canGoPrev,
		paginatedData,
		getPageItems,
		pageInfo,
	};
}
