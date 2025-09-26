import React from 'react';
import './FormError.scss';
interface FormErrorProps {
	message: string;
	type?: 'field' | 'form' | 'global';
	onDismiss?: () => void;
	className?: string;
}
export const FormError: React.FC<FormErrorProps> = ({
	message,
	type = 'field',
	onDismiss,
	className = '',
}) => {
	const getErrorClass = () => {
		switch (type) {
			case 'form':
				return 'form-error--form';
			case 'global':
				return 'form-error--global';
			default:
				return 'form-error--field';
		}
	};
	const getErrorIcon = () => {
		switch (type) {
			case 'form':
				return '🚫';
			case 'global':
				return '⚠️';
			default:
				return '❌';
		}
	};
	return (
		<div className={`form-error ${getErrorClass()} ${className}`}>
			<div className='form-error__content'>
				<span className='form-error__icon'>{getErrorIcon()}</span>
				<span className='form-error__message'>{message}</span>
				{onDismiss && (
					<button
						type='button'
						className='form-error__dismiss'
						onClick={onDismiss}
						aria-label='Dismiss error'>
						✕
					</button>
				)}
			</div>
		</div>
	);
};
