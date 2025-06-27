import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  MenuIcon, 
  XIcon, 
  HomeIcon, 
  UsersIcon, 
  BellIcon, 
  ShieldIcon,
  VideoIcon,
  SparklesIcon
} from 'lucide-react';
import useAuthUser from '../hooks/useAuthUser';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: HomeIcon,
      description: "Overview & Activity"
    },
    {
      path: "/friends",
      label: "Friends",
      icon: UsersIcon,
      description: "Manage Connections"
    },
    {
      path: "/notifications",
      label: "Notifications",
      icon: BellIcon,
      description: "Updates & Alerts"
    }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden btn-professional-ghost p-2"
      >
        {isOpen ? (
          <XIcon className="size-6" />
        ) : (
          <MenuIcon className="size-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-80 bg-base-100/95 backdrop-blur-xl 
        border-r border-base-300/50 shadow-hard transform transition-transform duration-300 lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-base-300/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <VideoIcon className="size-10 text-primary-600" />
                  <SparklesIcon className="size-4 absolute -top-1 -right-1 text-secondary-500 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold font-display text-gradient-primary tracking-tight">
                    JigarafyPro
                  </span>
                  <span className="text-xs text-neutral-500 font-medium -mt-1">
                    Mobile
                  </span>
                </div>
              </div>
              <button
                onClick={closeMenu}
                className="btn-professional-ghost p-2"
              >
                <XIcon className="size-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`${isActive ? 'nav-link-active' : 'nav-link'} group w-full`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Icon className={`size-5 ${isActive ? 'text-primary-600' : 'text-neutral-500 group-hover:text-primary-500'} transition-colors duration-200`} />
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{item.label}</span>
                        <span className="text-xs text-neutral-400 group-hover:text-neutral-500 transition-colors duration-200">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Admin Section */}
            {authUser?.isAdmin && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Administration
                </h3>
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className={`${currentPath === "/admin" ? 'nav-link-active' : 'nav-link'} group w-full`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <ShieldIcon className={`size-5 ${currentPath === "/admin" ? 'text-primary-600' : 'text-neutral-500 group-hover:text-primary-500'} transition-colors duration-200`} />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">Admin Panel</span>
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-500 transition-colors duration-200">
                        System Management
                      </span>
                    </div>
                  </div>
                  {currentPath === "/admin" && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  )}
                </Link>
              </div>
            )}
          </nav>

          {/* User Profile */}
          <div className="p-6 border-t border-base-300/50">
            <div className="card-professional p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full ring-2 ring-primary-200">
                    {authUser?.profilePic ? (
                      <img 
                        src={authUser.profilePic} 
                        alt="User Avatar" 
                        className="rounded-full object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
                        <UserIcon className="size-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100 animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-base-content truncate">{authUser?.fullName}</p>
                  <p className="text-xs text-success flex items-center gap-1 font-medium">
                    <span className="size-2 rounded-full bg-success inline-block animate-pulse" />
                    Online & Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
