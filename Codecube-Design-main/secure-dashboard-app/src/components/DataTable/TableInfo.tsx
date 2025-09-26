import React from 'react';
interface TableInfoProps {
	filteredCount: number;
	totalCount: number;
	searchTerm?: string;
}
export const TableInfo: React.FC<TableInfoProps> = ({
	filteredCount,
	totalCount,
	searchTerm,
}) => {
	return (
		<div className='table-info'>
			<span className='results-count'>
				{filteredCount} of {totalCount} posts
				{searchTerm && ` matching "${searchTerm}"`}
			</span>
		</div>
	);
};
