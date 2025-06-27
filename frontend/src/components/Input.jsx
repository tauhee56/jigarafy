import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

const Input = forwardRef(({
  label,
  error,
  success,
  helperText,
  type = 'text',
  size = 'md',
  variant = 'default',
  fullWidth = true,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  const baseClasses = 'input-professional transition-all duration-200';
  
  const variants = {
    default: '',
    filled: 'bg-base-200 border-base-300 focus:bg-base-100',
    outlined: 'bg-transparent border-2',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3 text-base rounded-xl',
    lg: 'px-5 py-4 text-lg rounded-2xl',
  };
  
  const getStateClasses = () => {
    if (error) return 'input-professional-error';
    if (success) return 'border-success focus:border-success focus:ring-success/20';
    return '';
  };
  
  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    getStateClasses(),
    fullWidth ? 'w-full' : '',
    LeftIcon ? 'pl-12' : '',
    (RightIcon || isPassword) ? 'pr-12' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`form-group ${containerClassName}`}>
      {label && (
        <label className="form-label">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {LeftIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
            <LeftIcon className="size-5" />
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          className={classes}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {(RightIcon || isPassword || error || success) && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {success && !error && (
              <CheckCircleIcon className="size-5 text-success" />
            )}
            
            {error && (
              <AlertCircleIcon className="size-5 text-error" />
            )}
            
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-5" />
                ) : (
                  <EyeIcon className="size-5" />
                )}
              </button>
            )}
            
            {RightIcon && !isPassword && !error && !success && (
              <RightIcon className="size-5 text-neutral-400" />
            )}
          </div>
        )}
      </div>
      
      {(error || success || helperText) && (
        <div className="mt-2">
          {error && <p className="form-error">{error}</p>}
          {success && !error && <p className="text-sm text-success font-medium">{success}</p>}
          {helperText && !error && !success && (
            <p className="text-sm text-neutral-500">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
