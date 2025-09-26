import { useAuth } from '../../contexts/AuthContext';
import {
	LazyLoginForm,
	LazyDashboard,
	LazyLoadErrorBoundary,
} from '../LazyComponents';
const MainApplicationContent: React.FC = () => {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		return <LazyLoginForm />;
	}
	return <LazyDashboard />;
};
export const MainApplication: React.FC = () => {
	return (
		<LazyLoadErrorBoundary
			fallback={
				<div className='error-boundary'>
					<h2>Something went wrong loading the application.</h2>
					<button onClick={() => window.location.reload()}>
						Reload page
					</button>
				</div>
			}>
			<MainApplicationContent />
		</LazyLoadErrorBoundary>
	);
};
