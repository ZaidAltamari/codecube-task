import React from 'react';
import { useLoginForm } from '../../hooks/useLoginForm';
import { FormInput } from '../UI/FormInput';
import { FormError } from '../UI/FormError';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { LoginFooter } from './LoginFooter';
import { Icon } from '../UI/Icon';
import { getIcon } from '../../utils/iconMappings';
import { ReactComponent as LoginIllustration } from '../../assets/images/login-illustration.svg';
import './LoginForm.scss';
export const LoginForm: React.FC = () => {
	const {
		formData,
		errors,
		isLoading,
		showPassword,
		isBlocked,
		timeUntilReset,
		handleInputChange,
		handleSubmit,
		togglePasswordVisibility,
		setFormFocus,
	} = useLoginForm();
	return (
		<div className='login-container'>
			<div className='login-content'>
				<div className='login-illustration'>
					<LoginIllustration className='login-illustration__image' />
				</div>
				<div className='login-form-section'>
					<div className='login-content-wrapper'>
						<div className='welcome-section'>
							<h2 className='welcome-greeting'>Welcome back! 👋</h2>
							<h1 className='welcome-title'>Login to your account</h1>
						</div>
						<form
							className='login-form'
							onSubmit={handleSubmit}>
							<FormInput
								id='username'
								type='email'
								label='Email'
								placeholder='Please enter your email'
								value={formData.username}
								onChange={handleInputChange('username')}
								onFocus={() => setFormFocus(true)}
								onBlur={() => setFormFocus(false)}
								disabled={isLoading}
								error={errors['username']}
								autoComplete='username'
							/>
							<div className='password-input-wrapper'>
								<div className='form-input-wrapper'>
									<label
										htmlFor='password'
										className='form-input__label'>
										Password
									</label>
									<div className='form-input__container'>
										<input
											id='password'
											type={showPassword ? 'text' : 'password'}
											className={`form-input ${
												errors['password']
													? 'form-input--error'
													: ''
											}`}
											placeholder='Enter password'
											value={formData.password}
											onChange={handleInputChange('password')}
											onFocus={() => setFormFocus(true)}
											onBlur={() => setFormFocus(false)}
											disabled={isLoading}
											autoComplete='current-password'
										/>
										<button
											type='button'
											className='login-form__password-toggle'
											onClick={togglePasswordVisibility}
											disabled={isLoading}
											aria-label={
												showPassword
													? 'Hide password'
													: 'Show password'
											}>
											<Icon
												name={showPassword ? getIcon('SHOW_PASSWORD') : getIcon('HIDE_PASSWORD')}
												size="sm"
												aria-hidden="true"
											/>
										</button>
									</div>
									{errors['password'] && (
										<span className='form-input__error'>
											{errors['password']}
										</span>
									)}
								</div>
							</div>
							{(errors['general'] || isBlocked) && (
								<FormError
									message={
										isBlocked
											? `Too many failed attempts. Try again in ${Math.ceil(
													timeUntilReset / 1000,
											  )} seconds.`
											: errors['general']
									}
									type='form'
								/>
							)}
							<button
								type='submit'
								className={`login-form__submit-button ${
									isLoading ? 'login-form__submit-button--loading' : ''
								}`}
								disabled={isLoading || isBlocked}>
								{isLoading ? (
									<LoadingSpinner
										size='small'
										text='Signing in...'
									/>
								) : (
									'Login'
								)}
							</button>
						</form>
						<LoginFooter />
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginForm;
