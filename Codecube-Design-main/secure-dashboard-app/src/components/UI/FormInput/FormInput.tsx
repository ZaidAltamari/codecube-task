import { forwardRef, InputHTMLAttributes } from 'react';
import './FormInput.scss';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  icon?: string;
  isLoading?: boolean;
  helpText?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, isLoading, helpText, className = '', ...props }, ref) => {
    const inputId = props.id || props.name || 'input';

    return (
      <div className={`form-input-wrapper ${className}`}>
        {label && (
          <label htmlFor={inputId} className="form-input__label">
            {label}
          </label>
        )}

        <div className="form-input__container">
          <input
            {...props}
            ref={ref}
            id={inputId}
            className={`form-input ${error ? 'form-input--error' : ''} ${
              isLoading ? 'form-input--loading' : ''
            }`}
            disabled={isLoading || props.disabled}
          />

          {icon && <div className="form-input__icon">{icon}</div>}

          {isLoading && (
            <div className="form-input__loading-indicator">
              <div className="spinner spinner--small"></div>
            </div>
          )}
        </div>

        {helpText && !error && (
          <span className="form-input__help">{helpText}</span>
        )}

        {error && (
          <span className="form-input__error">{error}</span>
        )}
      </div>
    );
  }
);