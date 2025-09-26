import React from 'react';
import { Icon } from '../Icon';
import { getIcon } from '../../../utils/iconMappings';
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
	icon = 'empty',
	title,
	description,
	action,
	className = '',
}) => {
	return (
		<div className={`empty-state ${className}`}>
			<div className='empty-state__icon'>
				<Icon
					name={icon === 'search' ? getIcon('SEARCH') : getIcon('EMPTY_STATE')}
					size="xl"
					color="currentColor"
					aria-label="Empty state icon"
				/>
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
