import { useState } from 'react';
export interface UseModalReturn<T = any> {
	isOpen: boolean;
	data: T | null;
	open: (data?: T) => void;
	close: () => void;
	toggle: () => void;
}
export function useModal<T = any>(initialState = false): UseModalReturn<T> {
	const [isOpen, setIsOpen] = useState(initialState);
	const [data, setData] = useState<T | null>(null);
	const open = (modalData?: T) => {
		if (modalData !== undefined) {
			setData(modalData);
		}
		setIsOpen(true);
	};
	const close = () => {
		setIsOpen(false);
		setData(null);
	};
	const toggle = () => {
		if (isOpen) {
			close();
		} else {
			open();
		}
	};
	return {
		isOpen,
		data,
		open,
		close,
		toggle,
	};
}
