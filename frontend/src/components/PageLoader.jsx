import { VideoIcon, SparklesIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();

  return (
    <div className="min-h-screen flex items-center justify-center gradient-background" data-theme={theme}>
      <div className="text-center animate-fade-in">
        {/* Logo with Animation */}
        <div className="relative mb-8 animate-scale-in">
          <div className="relative inline-block">
            <VideoIcon className="size-20 text-primary-600 animate-pulse" />
            <SparklesIcon className="size-8 absolute -top-2 -right-2 text-secondary-500 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-xl animate-pulse-slow"></div>
        </div>

        {/* Brand Name */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display text-gradient-primary mb-2">
            StreamifyPro
          </h1>
          <p className="text-neutral-500 font-medium">
            Professional Video Platform
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-sm text-neutral-400 animate-pulse">
            Loading your experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-neutral-200 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-200/10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary-200/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default PageLoader;
