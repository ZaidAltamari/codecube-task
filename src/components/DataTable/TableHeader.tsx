import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Post, SortConfig } from '../../types/api';
import { Icon, IconName } from '../UI/Icon';
interface TableHeaderProps {
	sortConfig: SortConfig;
	onSort: (key: keyof Post) => void;
	getSortIcon: (key: keyof Post) => IconName;
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
						<span className='sort-icon'>
							<Icon
								name={getSortIcon('id')}
								size="xs"
								color="currentColor"
								aria-label={
									sortConfig.key === 'id'
										? `Sorted ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}`
										: 'Sort column'
								}
							/>
						</span>
					</div>
				</th>
				<th
					className={`sortable ${
						sortConfig.key === 'userId' ? 'active' : ''
					}`}
					onClick={() => onSort('userId')}>
					<div className='header-content'>
						<span>User ID</span>
						<span className='sort-icon'>
							<Icon
								name={getSortIcon('userId')}
								size="xs"
								aria-label={
									sortConfig.key === 'userId'
										? `Sorted ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}`
										: 'Sort column'
								}
							/>
						</span>
					</div>
				</th>
				<th
					className={`sortable ${
						sortConfig.key === 'title' ? 'active' : ''
					}`}
					onClick={() => onSort('title')}>
					<div className='header-content'>
						<span>Title</span>
						<span className='sort-icon'>
							<Icon
								name={getSortIcon('title')}
								size="xs"
								aria-label={
									sortConfig.key === 'title'
										? `Sorted ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}`
										: 'Sort column'
								}
							/>
						</span>
					</div>
				</th>
				<th
					className={`sortable ${
						sortConfig.key === 'body' ? 'active' : ''
					}`}
					onClick={() => onSort('body')}>
					<div className='header-content'>
						<span>Content</span>
						<span className='sort-icon'>
							<Icon
								name={getSortIcon('body')}
								size="xs"
								aria-label={
									sortConfig.key === 'body'
										? `Sorted ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}`
										: 'Sort column'
								}
							/>
						</span>
					</div>
				</th>
				{user?.role === 'Editor' && (
					<th className='actions-column'>Actions</th>
				)}
			</tr>
		</thead>
	);
};
