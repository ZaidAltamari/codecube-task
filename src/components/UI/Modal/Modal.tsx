import React, { useEffect } from 'react';
import { Icon } from '../Icon';
import { getIcon } from '../../../utils/iconMappings';
import './Modal.scss';
interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	size?: 'small' | 'medium' | 'large';
	showCloseButton?: boolean;
}
export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	size = 'medium',
	showCloseButton = true,
}) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);
	if (!isOpen) return null;
	return (
		<div
			className='modal-overlay'
			onClick={onClose}>
			<div
				className={`modal-content ${size}`}
				onClick={(e) => e.stopPropagation()}>
				<div className='modal-header'>
					<h2 className='modal-title'>{title}</h2>
					{showCloseButton && (
						<button
							className='modal-close-button'
							onClick={onClose}
							title='Close modal'>
							<Icon
								name={getIcon('CLOSE')}
								size="sm"
								color="currentColor"
								aria-label="Close modal"
							/>
						</button>
					)}
				</div>
				<div className='modal-body'>{children}</div>
			</div>
		</div>
	);
};
