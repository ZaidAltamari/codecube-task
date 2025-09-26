import React from 'react';
import './LoadingSpinner.scss';
interface LoadingSpinnerProps {
	size?: 'small' | 'medium' | 'large';
	color?: string;
	text?: string;
	overlay?: boolean;
	className?: string;
	layout?: 'vertical' | 'horizontal';
}
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	size = 'medium',
	color,
	text,
	overlay = false,
	className = '',
	layout = 'vertical',
}) => {
	const content = (
		<div
			className={`loading-spinner loading-spinner--${size} loading-spinner--${layout} ${className}`}
			style={{ color }}>
			<div className='loading-spinner__ring'></div>
			{text && <div className='loading-spinner__text'>{text}</div>}
		</div>
	);
	if (overlay) {
		return <div className='loading-spinner__overlay'>{content}</div>;
	}
	return content;
};
