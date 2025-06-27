import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, VideoIcon, SparklesIcon, UserIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import MobileNav from "./MobileNav";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="nav-professional h-20 flex items-center shadow-soft">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - ENHANCED */}
          {isChatPage && (
            <div className="animate-slide-up">
              <Link to="/" className="flex items-center gap-3 group hover:scale-105 transition-transform duration-200">
                <div className="relative">
                  <VideoIcon className="size-10 text-primary-600 group-hover:text-primary-700 transition-colors duration-200" />
                  <SparklesIcon className="size-4 absolute -top-1 -right-1 text-secondary-500 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-display text-gradient-primary tracking-tight">
                    StreamifyPro
                  </span>
                  <span className="text-xs text-neutral-500 font-medium -mt-1">
                    Professional Video Calls
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* RIGHT SIDE NAVIGATION */}
          <div className="flex items-center gap-2">
            {/* Mobile Navigation */}
            <MobileNav />
            {/* Notifications */}
            <Link to="/notifications">
              <button className="btn-professional-ghost relative group">
                <BellIcon className="size-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 animate-pulse"></div>
              </button>
            </Link>

            {/* Theme Selector */}
            <ThemeSelector />

            {/* User Profile */}
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar hover:shadow-glow-primary transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full ring-2 ring-primary-200 hover:ring-primary-400 transition-all duration-200">
                  {authUser?.profilePic ? (
                    <img
                      src={authUser.profilePic}
                      alt="User Avatar"
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
                      <UserIcon className="size-5 text-white" />
                    </div>
                  )}
                </div>
              </button>

              <div className="dropdown-content mt-3 p-3 shadow-hard bg-base-100/95 backdrop-blur-xl rounded-2xl w-64 border border-base-300/50 animate-slide-down">
                <div className="flex items-center gap-3 p-3 border-b border-base-300/50 mb-3">
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
                  <div className="flex-1">
                    <div className="font-semibold text-base-content">{authUser?.fullName}</div>
                    <div className="text-sm text-neutral-500">{authUser?.email}</div>
                  </div>
                </div>

                <button
                  className="btn-professional-outline w-full justify-start gap-3"
                  onClick={logoutMutation}
                >
                  <LogOutIcon className="size-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
