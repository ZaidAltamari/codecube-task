import React from 'react';
import { Skeleton } from '../Skeleton';
import { useAuth } from '../../../contexts/AuthContext';
import './TableSkeleton.scss';

interface TableSkeletonProps {
	rows?: number;
	showActions?: boolean;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
	rows = 5,
	showActions,
}) => {
	const { user } = useAuth();
	const isEditor = user?.role === 'Editor';
	const shouldShowActions = showActions !== undefined ? showActions : isEditor;

	return (
		<div className="table-skeleton">
			<table className="posts-table" role="table">
				<thead>
					<tr>
						<th style={{ width: '80px' }}>
							<Skeleton height="1.25rem" width="60%" />
						</th>
						<th style={{ width: '100px' }}>
							<Skeleton height="1.25rem" width="70%" />
						</th>
						<th>
							<Skeleton height="1.25rem" width="50%" />
						</th>
						<th>
							<Skeleton height="1.25rem" width="60%" />
						</th>
						{shouldShowActions && (
							<th className="actions-column">
								<Skeleton height="1.25rem" width="80%" />
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: rows }).map((_, index) => (
						<tr key={index} className="table-row">
							<td className="id-cell">
								<Skeleton height="1rem" width="40px" />
							</td>
							<td className="user-id-cell">
								<Skeleton height="1rem" width="30px" />
							</td>
							<td className="title-cell">
								<div className="title-content">
									<Skeleton
										height="1rem"
										width={`${Math.random() * 40 + 60}%`}
									/>
								</div>
							</td>
							<td className="body-cell">
								<div className="body-content">
									<Skeleton
										height="1rem"
										width={`${Math.random() * 30 + 70}%`}
									/>
									<Skeleton
										height="1rem"
										width={`${Math.random() * 50 + 40}%`}
									/>
								</div>
							</td>
							{shouldShowActions && (
								<td className="actions-cell">
									<div className="action-buttons">
										<Skeleton
											variant="rectangular"
											height="32px"
											width="32px"
											borderRadius="0.375rem"
										/>
										<Skeleton
											variant="rectangular"
											height="32px"
											width="32px"
											borderRadius="0.375rem"
										/>
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};