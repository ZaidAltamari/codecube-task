import React from 'react';
import './Icon.scss';

// Define all available icon names based on the SVG files in public/icons/
export type IconName =
  | 'check'
  | 'x'
  | 'triangle-alert'
  | 'info'
  | 'arrow-up-down'
  | 'arrow-up'
  | 'arrow-down'
  | 'search'
  | 'file-text'
  | 'pencil'
  | 'trash-2'
  | 'plus'
  | 'eye'
  | 'eye-off'
  | 'hand'
  | 'log-out'
  | 'save'
  | 'refresh-cw';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  className?: string;
  onClick?: () => void;
  title?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}

const sizeMap: Record<Exclude<IconSize, number>, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color,
  className = '',
  onClick,
  title,
  'aria-label': ariaLabel,
  style,
}) => {
  const pixelSize = typeof size === 'number' ? size : sizeMap[size];

  const iconStyle: React.CSSProperties = {
    width: pixelSize,
    height: pixelSize,
    color,
    ...style,
  };

  const iconClasses = [
    'icon',
    `icon--${size}`,
    onClick ? 'icon--clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={iconClasses}
      onClick={onClick}
      style={iconStyle}
      title={title || ariaLabel}
      aria-label={ariaLabel}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <img
        src={`/icons/${name}.svg`}
        alt={ariaLabel || title || name}
        className="icon__image"
      />
    </span>
  );
};