import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { MainApplication } from './components/MainApplication/MainApplication';
import './App.css';
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				if (error instanceof Error && error.message.includes('4')) {
					return false;
				}
				return failureCount < 2;
			},
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			refetchIntervalInBackground: false,
		},
		mutations: {
			retry: 1,
			onError: (error) => {
				console.error('Mutation failed:', error);
			},
		},
	},
});
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<AuthProvider>
					<MainApplication />
				</AuthProvider>
			</ToastProvider>
		</QueryClientProvider>
	);
}
export default App;
