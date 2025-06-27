import { useState, createContext, useContext } from 'react';

const TabsContext = createContext();

const Tabs = ({ children, defaultValue, value, onValueChange, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || '');
  
  const currentValue = value !== undefined ? value : activeTab;
  const handleValueChange = value !== undefined ? onValueChange : setActiveTab;

  return (
    <TabsContext.Provider value={{ activeTab: currentValue, setActiveTab: handleValueChange }}>
      <div className={`w-full ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className = '' }) => {
  return (
    <div className={`flex space-x-1 bg-base-200/50 p-1 rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

const TabsTrigger = ({ value, children, className = '', disabled = false }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => !disabled && setActiveTab(value)}
      disabled={disabled}
      className={`
        flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isActive 
          ? 'bg-base-100 text-primary-600 shadow-soft' 
          : 'text-neutral-600 hover:text-neutral-900 hover:bg-base-100/50'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className = '' }) => {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;

  return (
    <div className={`mt-6 animate-fade-in ${className}`}>
      {children}
    </div>
  );
};

// Export all components
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
