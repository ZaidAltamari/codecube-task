export interface TableColumn {
	key: string;
	title: string;
	sortable?: boolean;
	width?: string;
}
export interface TableAction {
	type: 'edit' | 'delete' | 'view';
	label: string;
	onClick: (id: number) => void;
	className?: string;
}
