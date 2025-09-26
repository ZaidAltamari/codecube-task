import React from 'react';
import './Pagination.scss';
interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	canGoNext: boolean;
	canGoPrev: boolean;
	pageInfo: {
		showing: string;
		total: number;
	};
	onFirstPage: () => void;
	onLastPage: () => void;
	onNextPage: () => void;
	onPrevPage: () => void;
}
export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	canGoNext,
	canGoPrev,
	pageInfo,
	onFirstPage,
	onLastPage,
	onNextPage,
	onPrevPage,
}) => {
	const getVisiblePages = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];
		// Handle edge case where totalPages is 1
		if (totalPages === 1) {
			return [1];
		}
		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}
		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...');
		} else {
			rangeWithDots.push(1);
		}
		rangeWithDots.push(...range);
		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages);
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}
		return rangeWithDots;
	};
	if (totalPages <= 1) {
		return (
			<div className='pagination'>
				<div className='pagination-info'>
					<span>Showing {pageInfo.showing} items</span>
				</div>
			</div>
		);
	}
	const visiblePages = getVisiblePages();
	return (
		<div className='pagination'>
			<div className='pagination-info'>
				<span>Showing {pageInfo.showing} items</span>
			</div>
			<div className='pagination-controls'>
				<button
					className='pagination-btn pagination-btn--nav'
					onClick={onFirstPage}
					disabled={!canGoPrev}
					title='First page'>
					⇤
				</button>
				<button
					className='pagination-btn pagination-btn--nav'
					onClick={onPrevPage}
					disabled={!canGoPrev}
					title='Previous page'>
					←
				</button>
				<div className='pagination-pages'>
					{visiblePages.map((page, index) => (
						<React.Fragment key={index}>
							{page === '...' ? (
								<span className='pagination-dots'>...</span>
							) : (
								<button
									className={`pagination-btn pagination-btn--page ${
										currentPage === page
											? 'pagination-btn--active'
											: ''
									}`}
									onClick={() => onPageChange(page as number)}>
									{page}
								</button>
							)}
						</React.Fragment>
					))}
				</div>
				<button
					className='pagination-btn pagination-btn--nav'
					onClick={onNextPage}
					disabled={!canGoNext}
					title='Next page'>
					→
				</button>
				<button
					className='pagination-btn pagination-btn--nav'
					onClick={onLastPage}
					disabled={!canGoNext}
					title='Last page'>
					⇥
				</button>
			</div>
		</div>
	);
};
