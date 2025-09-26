import React from 'react';
import { DEMO_USERS } from '../../utils/constants';
import './LoginFooter.scss';
interface DemoAccount {
	email: string;
	password: string;
	role: string;
	roleClass: string;
}
export const LoginFooter: React.FC = () => {
	const demoAccounts: DemoAccount[] = Object.entries(DEMO_USERS).map(
		([email, { password, role }]) => ({
			email,
			password,
			role,
			roleClass: role.toLowerCase(),
		}),
	);
	return (
		<div className='login-footer'>
			<div className='login-footer__demo-accounts'>
				<p className='login-footer__demo-title'>Demo Accounts</p>
				<div className='login-footer__accounts-list'>
					{demoAccounts.map(({ email, password, role, roleClass }) => (
						<div
							key={email}
							className='login-footer__demo-account'>
							<span
								className={`login-footer__demo-role login-footer__demo-role--${roleClass}`}>
								{role}:
							</span>
							<span className='login-footer__demo-email'>{email}</span>
							<span className='login-footer__demo-password'>
								{password}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
