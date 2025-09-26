import React from 'react';
import './ConfirmationModal.scss';
interface ConfirmationModalProps {
	isOpen: boolean;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	confirmButtonType?: 'primary' | 'danger' | 'warning';
	onConfirm: () => void;
	onCancel: () => void;
	isLoading?: boolean;
}
export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	isOpen,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	confirmButtonType = 'primary',
	onConfirm,
	onCancel,
	isLoading = false,
}) => {
	if (!isOpen) return null;
	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onCancel();
		}
	};
	return (
		<div
			className='confirmation-modal-overlay'
			onClick={handleOverlayClick}>
			<div className='confirmation-modal'>
				<div className='confirmation-modal__header'>
					<h3 className='confirmation-modal__title'>{title}</h3>
				</div>
				<div className='confirmation-modal__body'>
					<p className='confirmation-modal__message'>{message}</p>
				</div>
				<div className='confirmation-modal__footer'>
					<button
						type='button'
						className='confirmation-modal__button confirmation-modal__button--cancel'
						onClick={onCancel}
						disabled={isLoading}>
						{cancelText}
					</button>
					<button
						type='button'
						className={`confirmation-modal__button confirmation-modal__button--${confirmButtonType}`}
						onClick={onConfirm}
						disabled={isLoading}>
						{isLoading ? (
							<div className='button-loading'>
								<div className='spinner spinner--small'></div>
								<span>Processing...</span>
							</div>
						) : (
							confirmText
						)}
					</button>
				</div>
			</div>
		</div>
	);
};
