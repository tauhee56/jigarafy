import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import { Link } from 'react-router';

const Breadcrumb = ({ items = [], className = '' }) => {
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: HomeIcon },
    ...items
  ];

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        const Icon = item.icon;

        return (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="size-4 text-neutral-400 mx-2" />
            )}
            
            {isLast ? (
              <span className="flex items-center gap-2 text-neutral-600 font-medium">
                {Icon && <Icon className="size-4" />}
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors duration-200 font-medium"
              >
                {Icon && <Icon className="size-4" />}
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
