import { useEffect } from 'react';
import { XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md',
  className = '',
  closeOnOverlayClick = true,
  showCloseButton = true 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className={`
        relative w-full ${sizes[size]} bg-base-100 rounded-3xl shadow-hard 
        animate-scale-in max-h-[90vh] overflow-hidden
        ${className}
      `}>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-base-200/80 hover:bg-base-300 transition-colors duration-200"
          >
            <XIcon className="size-5 text-neutral-600" />
          </button>
        )}
        
        <div className="overflow-y-auto max-h-[90vh]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

const ModalHeader = ({ children, className = '' }) => {
  return (
    <div className={`p-6 border-b border-base-300/50 ${className}`}>
      {children}
    </div>
  );
};

const ModalTitle = ({ children, className = '' }) => {
  return (
    <h2 className={`text-2xl font-bold text-base-content ${className}`}>
      {children}
    </h2>
  );
};

const ModalDescription = ({ children, className = '' }) => {
  return (
    <p className={`text-neutral-600 mt-2 ${className}`}>
      {children}
    </p>
  );
};

const ModalContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

const ModalFooter = ({ children, className = '' }) => {
  return (
    <div className={`p-6 border-t border-base-300/50 flex items-center justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
};

// Export all components
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
