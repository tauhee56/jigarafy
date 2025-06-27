import { forwardRef } from 'react';
import { LoaderIcon } from 'lucide-react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  as: Component = 'button',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-professional-primary',
    secondary: 'btn-professional-secondary',
    outline: 'btn-professional-outline',
    ghost: 'btn-professional-ghost',
    danger: 'bg-gradient-to-r from-error to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-error shadow-soft hover:shadow-medium',
    success: 'bg-gradient-to-r from-success to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-success shadow-soft hover:shadow-medium',
  };
  
  const sizes = {
    xs: 'px-3 py-1.5 text-xs rounded-lg',
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-2xl',
    xl: 'px-10 py-5 text-lg rounded-2xl',
  };
  
  const iconSizes = {
    xs: 'size-3',
    sm: 'size-4',
    md: 'size-4',
    lg: 'size-5',
    xl: 'size-6',
  };
  
  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');
  
  const iconClass = iconSizes[size];
  
  return (
    <Component
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoaderIcon className={`${iconClass} animate-spin ${children ? 'mr-2' : ''}`} />
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={`${iconClass} ${children ? 'mr-2' : ''}`} />
      )}
      
      {children}
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={`${iconClass} ${children ? 'ml-2' : ''}`} />
      )}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
