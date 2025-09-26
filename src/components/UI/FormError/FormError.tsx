import React from 'react';
import { Icon } from '../Icon';
import { getIcon } from '../../../utils/iconMappings';
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
				return getIcon('ERROR');
			case 'global':
				return getIcon('WARNING');
			default:
				return getIcon('ERROR');
		}
	};
	return (
		<div className={`form-error ${getErrorClass()} ${className}`}>
			<div className='form-error__content'>
				<span className='form-error__icon'>
					<Icon
						name={getErrorIcon()}
						size="sm"
						color="currentColor"
						aria-label="Error icon"
					/>
				</span>
				<span className='form-error__message'>{message}</span>
				{onDismiss && (
					<button
						type='button'
						className='form-error__dismiss'
						onClick={onDismiss}
						aria-label='Dismiss error'>
						<Icon
							name={getIcon('CLOSE')}
							size="xs"
							color="currentColor"
							aria-label="Close"
						/>
					</button>
				)}
			</div>
		</div>
	);
};
