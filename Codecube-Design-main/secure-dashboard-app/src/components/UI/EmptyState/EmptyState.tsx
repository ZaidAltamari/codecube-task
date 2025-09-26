import React from 'react';
import './EmptyState.scss';
export interface EmptyStateProps {
	icon?: string;
	title: string;
	description?: string;
	action?: {
		label: string;
		onClick: () => void;
	};
	className?: string;
}
export const EmptyState: React.FC<EmptyStateProps> = ({
	icon = '📄',
	title,
	description,
	action,
	className = '',
}) => {
	return (
		<div className={`empty-state ${className}`}>
			<div
				className='empty-state__icon'
				role='img'
				aria-label='Empty state icon'>
				{icon}
			</div>
			<h3 className='empty-state__title'>{title}</h3>
			{description && (
				<p className='empty-state__description'>{description}</p>
			)}
			{action && (
				<button
					className='empty-state__action'
					onClick={action.onClick}
					type='button'>
					{action.label}
				</button>
			)}
		</div>
	);
};
