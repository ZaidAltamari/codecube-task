import React from 'react';
import './LoginHeader.scss';
export const LoginHeader: React.FC = () => {
	return (
		<div className='login-header'>
			<div className='login-header__logo'>
				<div className='login-header__logo-icon'>🔐</div>
				<h1 className='login-header__title'>Secure Dashboard</h1>
			</div>
			<p className='login-header__subtitle'>Sign in to your account</p>
		</div>
	);
};
