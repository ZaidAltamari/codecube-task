import React from 'react';
import './Skeleton.scss';

interface SkeletonProps {
	width?: string;
	height?: string;
	borderRadius?: string;
	className?: string;
	variant?: 'text' | 'rectangular' | 'circular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
	width = '100%',
	height = '1rem',
	borderRadius,
	className = '',
	variant = 'text',
}) => {
	const defaultBorderRadius = {
		text: '0.25rem',
		rectangular: '0.375rem',
		circular: '50%',
	};

	return (
		<div
			className={`skeleton skeleton--${variant} ${className}`}
			style={{
				width,
				height,
				borderRadius: borderRadius || defaultBorderRadius[variant],
			}}
			aria-label="Loading content"
		/>
	);
};