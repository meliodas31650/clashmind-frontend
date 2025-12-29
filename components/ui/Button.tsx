

import React from 'react';

/**
 * @typedef ButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * @property {React.ReactNode} children - The content of the button.
 * @property {'primary' | 'secondary' | 'danger' | 'ghost'} [variant='primary'] - The visual style of the button.
 * @property {'small' | 'medium' | 'large'} [size='medium'] - The size of the button.
 * @property {boolean} [isLoading=false] - If true, shows a loading spinner and disables the button.
 * @property {React.ReactNode} [leftIcon] - Icon to display on the left side of the button text.
 * @property {React.ReactNode} [rightIcon] - Icon to display on the right side of the button text.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * A flexible and styled button component.
 * Supports different visual variants, sizes, loading states, and icons.
 * @param {ButtonProps} props - Component props.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button: React.FC<ButtonProps> = React.memo(({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const baseStyles = "font-orbitron rounded-xl focus:outline-none focus:ring-4 focus:ring-opacity-60 transition-all duration-200 ease-in-out transform disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center group";

  const variantStyles = {
    primary: 'bg-gradient-to-br from-[#00E0FF] to-[#00A1FF] hover:from-[#00B8D9] hover:to-[#007ACC] text-[#03001C] focus:ring-[#00A1FF] shadow-lg hover:shadow-xl shadow-[#00E0FF]/30 hover:shadow-[#00A1FF]/40 active:shadow-inner active:shadow-black/20',
    secondary: 'bg-gradient-to-br from-[#A100FF] to-[#7A00C2] hover:from-[#8A00D9] hover:to-[#6A00FF] text-[#E0E7FF] focus:ring-[#A100FF] shadow-lg hover:shadow-xl shadow-[#A100FF]/30 hover:shadow-[#A100FF]/40 active:shadow-inner active:shadow-black/20',
    danger: 'bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white focus:ring-red-500 shadow-md hover:shadow-lg active:shadow-inner active:shadow-black/20',
    ghost: 'bg-transparent hover:bg-[#FF00C8]/25 text-[#E0E7FF] focus:ring-[#FF00C8] border-2 border-[#FF00C8]/80 hover:border-[#FF00C8]',
  };

  const sizeStyles = {
    small: 'px-3.5 py-2 text-xs tracking-wider', // Slightly more padding, letter spacing for Orbitron
    medium: 'px-6 py-2.5 text-sm tracking-wider',
    large: 'px-8 py-3.5 text-base tracking-wider',
  };

  const iconSizeClass = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${!props.disabled && !isLoading ? 'hover:scale-[1.03] active:scale-[0.98]' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className={`animate-spin h-5 w-5 ${leftIcon || rightIcon ? '-ml-1 mr-2' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {leftIcon && !isLoading && <span className={`mr-2 group-hover:scale-110 transition-transform ${iconSizeClass}`}>{leftIcon}</span>}
      <span className="leading-tight">{children}</span>
      {rightIcon && !isLoading && <span className={`ml-2 group-hover:scale-110 transition-transform ${iconSizeClass}`}>{rightIcon}</span>}
    </button>
  );
});

export default Button;