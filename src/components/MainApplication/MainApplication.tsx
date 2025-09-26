import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Dashboard from '../Dashboard/Dashboard';
import LoginForm from '../Login/LoginForm';
import { LoadingSpinner } from '../UI/LoadingSpinner';
const MainApplicationContent: React.FC = () => {
	const { isAuthenticated, isInitializing } = useAuth();
	if (isInitializing) {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					backgroundColor: '#f8fafc',
				}}>
				<LoadingSpinner
					size='large'
					text='Loading application...'
				/>
			</div>
		);
	}
	if (!isAuthenticated) {
		return <LoginForm />;
	}
	return <Dashboard />;
};
export const MainApplication: React.FC = () => {
	return <MainApplicationContent />;
};
