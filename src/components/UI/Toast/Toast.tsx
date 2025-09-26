import React, { useEffect } from 'react';
import { Icon } from '../Icon';
import { getIcon } from '../../../utils/iconMappings';
import './Toast.scss';
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastProps {
	id: string;
	type: ToastType;
	title: string;
	message?: string;
	duration?: number;
	onClose: (id: string) => void;
}
export const Toast: React.FC<ToastProps> = ({
	id,
	type,
	title,
	message,
	duration = 4000,
	onClose,
}) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose(id);
		}, duration);
		return () => clearTimeout(timer);
	}, [id, duration, onClose]);
	const getIconName = () => {
		switch (type) {
			case 'success':
				return getIcon('SUCCESS');
			case 'error':
				return getIcon('ERROR');
			case 'warning':
				return getIcon('WARNING');
			case 'info':
				return getIcon('INFO');
			default:
				return getIcon('INFO');
		}
	};
	return (
		<div className={`toast toast--${type}`}>
			<div className='toast__icon'>
				<Icon
					name={getIconName()}
					size="sm"
					color="currentColor"
					aria-label={`${type} icon`}
				/>
			</div>
			<div className='toast__content'>
				<div className='toast__title'>{title}</div>
				{message && <div className='toast__message'>{message}</div>}
			</div>
			<button
				className='toast__close'
				onClick={() => onClose(id)}
				aria-label='Close notification'>
				<Icon
					name={getIcon('CLOSE')}
					size="sm"
					color="currentColor"
					aria-label="Close notification"
				/>
			</button>
		</div>
	);
};
