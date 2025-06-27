import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  interactive = false,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'card-professional';
  
  const variants = {
    default: '',
    elevated: 'card-professional-elevated',
    interactive: 'card-professional-interactive',
    gradient: 'bg-gradient-to-br from-base-100 via-primary-50/30 to-secondary-50/20',
    glass: 'bg-base-100/80 backdrop-blur-xl border border-base-300/50',
  };
  
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  const hoverClasses = hover ? 'hover:shadow-medium hover:-translate-y-1 transition-all duration-300' : '';
  const interactiveClasses = interactive ? 'cursor-pointer hover:border-primary-200 hover:bg-gradient-to-br hover:from-base-100 hover:to-primary-50/30' : '';
  
  const classes = [
    baseClasses,
    variants[variant],
    paddings[padding],
    hoverClasses,
    interactiveClasses,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card Header Component
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Title Component
const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-xl font-bold text-base-content mb-2 ${className}`} {...props}>
      {children}
    </h3>
  );
};

// Card Description Component
const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-neutral-500 ${className}`} {...props}>
      {children}
    </p>
  );
};

// Card Content Component
const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Footer Component
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-6 pt-4 border-t border-base-300/50 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Export all components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
