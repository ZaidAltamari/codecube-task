import React from 'react';
import './ErrorMessage.scss';
interface ErrorMessageProps {
	message: string;
	onRetry?: () => void;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
	message,
	onRetry,
}) => {
	return (
		<div className='error-message'>
			<div className='error-icon'> </div>
			<div className='error-content'>
				<h3>Something went wrong</h3>
				<p>{message}</p>
				{onRetry && (
					<button
						className='retry-button'
						onClick={onRetry}>
						= Try Again
					</button>
				)}
			</div>
		</div>
	);
};
