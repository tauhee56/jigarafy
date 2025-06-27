import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {
  BellIcon,
  HomeIcon,
  VideoIcon,
  UsersIcon,
  ShieldIcon,
  SparklesIcon,
  UserIcon,
  MessageCircleIcon,
  TrendingUpIcon
} from "lucide-react";

const Sidebar = () => {
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

  return (
    <aside className="w-80 sidebar-professional hidden lg:flex flex-col h-screen sticky top-0 shadow-medium">
      {/* LOGO SECTION */}
      <div className="p-6 border-b border-base-300/50">
        <Link to="/" className="flex items-center gap-3 group hover:scale-105 transition-transform duration-200">
          <div className="relative">
            <VideoIcon className="size-12 text-primary-600 group-hover:text-primary-700 transition-colors duration-200" />
            <SparklesIcon className="size-5 absolute -top-1 -right-1 text-secondary-500 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-display text-gradient-primary tracking-tight">
              StreamifyPro
            </span>
            <span className="text-xs text-neutral-500 font-medium -mt-1">
              Professional Video Platform
            </span>
          </div>
        </Link>
      </div>

      {/* NAVIGATION SECTION */}
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
                className={`${isActive ? 'nav-link-active' : 'nav-link'} group`}
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

        {/* ADMIN SECTION */}
        {authUser?.isAdmin && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Administration
            </h3>
            <Link
              to="/admin"
              className={`${currentPath === "/admin" ? 'nav-link-active' : 'nav-link'} group`}
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

        {/* QUICK STATS */}
        <div className="card-professional p-4 mt-6">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircleIcon className="size-4 text-primary-500" />
                <span className="text-sm text-neutral-600">Active Chats</span>
              </div>
              <span className="text-sm font-semibold text-primary-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="size-4 text-accent-500" />
                <span className="text-sm text-neutral-600">This Week</span>
              </div>
              <span className="text-sm font-semibold text-accent-600">12 calls</span>
            </div>
          </div>
        </div>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-6 border-t border-base-300/50 mt-auto">
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
            <div className="flex-1">
              <p className="font-semibold text-sm text-base-content">{authUser?.fullName}</p>
              <p className="text-xs text-success flex items-center gap-1 font-medium">
                <span className="size-2 rounded-full bg-success inline-block animate-pulse" />
                Online & Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
