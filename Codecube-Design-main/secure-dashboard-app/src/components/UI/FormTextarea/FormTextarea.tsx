import { forwardRef, TextareaHTMLAttributes } from 'react';
import './FormTextarea.scss';
interface FormTextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string | null;
	isLoading?: boolean;
	helpText?: string;
}
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
	({ label, error, isLoading, helpText, className = '', ...props }, ref) => {
		const textareaId = props.id || props.name || 'textarea';
		return (
			<div className={`form-textarea-wrapper ${className}`}>
				{label && (
					<label
						htmlFor={textareaId}
						className='form-textarea__label'>
						{label}
					</label>
				)}
				<div className='form-textarea__container'>
					<textarea
						{...props}
						ref={ref}
						id={textareaId}
						className={`form-textarea ${
							error ? 'form-textarea--error' : ''
						} ${isLoading ? 'form-textarea--loading' : ''}`}
						disabled={isLoading || props.disabled}
					/>
					{isLoading && (
						<div className='form-textarea__loading-indicator'>
							<div className='spinner spinner--small'></div>
						</div>
					)}
				</div>
				{helpText && !error && (
					<span className='form-textarea__help'>{helpText}</span>
				)}
				{error && <span className='form-textarea__error'>{error}</span>}
			</div>
		);
	},
);
