import React, { useEffect } from 'react';
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
	const getIcon = () => {
		switch (type) {
			case 'success':
				return '✓';
			case 'error':
				return '✗';
			case 'warning':
				return '⚠';
			case 'info':
				return 'ℹ';
			default:
				return 'ℹ';
		}
	};
	return (
		<div className={`toast toast--${type}`}>
			<div className='toast__icon'>{getIcon()}</div>
			<div className='toast__content'>
				<div className='toast__title'>{title}</div>
				{message && <div className='toast__message'>{message}</div>}
			</div>
			<button
				className='toast__close'
				onClick={() => onClose(id)}
				aria-label='Close notification'>
				×
			</button>
		</div>
	);
};
