import { MessageCircleIcon, WifiIcon, SparklesIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 gradient-background">
      <div className="text-center animate-fade-in">
        {/* Chat Icon with Animation */}
        <div className="relative mb-6 animate-scale-in">
          <div className="relative inline-block">
            <MessageCircleIcon className="size-16 text-primary-600 animate-pulse" />
            <WifiIcon className="size-6 absolute -top-1 -right-1 text-secondary-500 animate-bounce" />
          </div>
          <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-xl animate-pulse-slow"></div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-display text-gradient-primary mb-2">
            Connecting to Chat
          </h2>
          <p className="text-neutral-500 font-medium">
            Setting up secure connection...
          </p>
        </div>

        {/* Connection Steps */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-neutral-600">Authenticating user</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span className="text-neutral-600">Establishing connection</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span className="text-neutral-600">Loading chat history</span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-primary-200/10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-secondary-200/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
}

export default ChatLoader;
