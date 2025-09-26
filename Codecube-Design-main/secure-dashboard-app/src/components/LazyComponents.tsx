import React, {
	lazy,
	Suspense,
	ComponentType,
	LazyExoticComponent,
} from 'react';
import { LoadingSpinner } from './UI/LoadingSpinner';
export function withSuspense<T extends ComponentType<any>>(
	LazyComponent: LazyExoticComponent<T>,
	fallback?: React.ReactNode,
): ComponentType<React.ComponentProps<T>> {
	return function SuspendedComponent(props: React.ComponentProps<T>) {
		return (
			<Suspense
				fallback={
					fallback || (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: '100vh',
							}}>
							<LoadingSpinner
								size='large'
								text='Loading...'
								color='#667eea'
							/>
						</div>
					)
				}>
				<LazyComponent {...props} />
			</Suspense>
		);
	};
}
export const LazyLoginForm = withSuspense(
	lazy(() => import('./Login/LoginForm')),
	<div className='loading-container'>
		<LoadingSpinner
			size='large'
			text='Loading login...'
		/>
	</div>,
);
const DashboardWithLoading = lazy(() => import('./Dashboard/Dashboard'));
export const LazyDashboard: React.FC = () => {
	return (
		<Suspense
			fallback={
				<div
					className='loading-container'
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(255, 255, 255, 0.95)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 9999,
					}}>
					<div style={{ textAlign: 'center' }}>
						<LoadingSpinner
							size='large'
							text='Loading dashboard...'
						/>
						<p
							style={{
								marginTop: '16px',
								color: '#666',
								fontSize: '16px',
							}}>
							Setting up your secure workspace...
						</p>
					</div>
				</div>
			}>
			<DashboardWithLoading />
		</Suspense>
	);
};
export const LazyDataTable = withSuspense(
	lazy(() =>
		import('./DataTable/DataTable').then((module) => ({
			default: module.DataTable,
		})),
	),
);
export const LazyPostForm = withSuspense(
	lazy(() =>
		import('./PostForm/PostForm').then((module) => ({
			default: module.PostForm,
		})),
	),
);
export class LazyLoadErrorBoundary extends React.Component<
	{ children: React.ReactNode; fallback?: React.ReactNode },
	{ hasError: boolean; error?: Error }
> {
	constructor(props: {
		children: React.ReactNode;
		fallback?: React.ReactNode;
	}) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}
	override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Lazy loading error:', error, errorInfo);
	}
	override render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className='error-boundary'>
						<h2>Something went wrong loading this component.</h2>
						<button onClick={() => this.setState({ hasError: false })}>
							Try again
						</button>
					</div>
				)
			);
		}
		return this.props.children;
	}
}
export function withErrorBoundary<T extends Record<string, any>>(
	Component: React.ComponentType<T>,
	fallback?: React.ReactNode,
): React.FC<T> {
	return function ComponentWithErrorBoundary(props: T) {
		return (
			<LazyLoadErrorBoundary fallback={fallback}>
				<Component {...props} />
			</LazyLoadErrorBoundary>
		);
	};
}
