import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Post, SortConfig } from '../../types/api';
interface TableHeaderProps {
	sortConfig: SortConfig;
	onSort: (key: keyof Post) => void;
	getSortIcon: (key: keyof Post) => string;
}
export const TableHeader: React.FC<TableHeaderProps> = ({
	sortConfig,
	onSort,
	getSortIcon,
}) => {
	const { user } = useAuth();
	return (
		<thead>
			<tr>
				<th
					className={`sortable ${sortConfig.key === 'id' ? 'active' : ''}`}
					onClick={() => onSort('id')}>
					<div className='header-content'>
						<span>ID</span>
						<span className='sort-icon'>{getSortIcon('id')}</span>
					</div>
				</th>
				<th
					className={`sortable ${
						sortConfig.key === 'userId' ? 'active' : ''
					}`}
					onClick={() => onSort('userId')}>
					<div className='header-content'>
						<span>User ID</span>
						<span className='sort-icon'>{getSortIcon('userId')}</span>
					</div>
				</th>
				<th
					className={`sortable ${
						sortConfig.key === 'title' ? 'active' : ''
					}`}
					onClick={() => onSort('title')}>
					<div className='header-content'>
						<span>Title</span>
						<span className='sort-icon'>{getSortIcon('title')}</span>
					</div>
				</th>
				<th
					className={`sortable ${
						sortConfig.key === 'body' ? 'active' : ''
					}`}
					onClick={() => onSort('body')}>
					<div className='header-content'>
						<span>Content</span>
						<span className='sort-icon'>{getSortIcon('body')}</span>
					</div>
				</th>
				{user?.role === 'Editor' && (
					<th className='actions-column'>Actions</th>
				)}
			</tr>
		</thead>
	);
};
