import { BellIcon, CheckCircleIcon, SparklesIcon } from "lucide-react";
import Card from './Card';

function NoNotificationsFound() {
  return (
    <Card variant="glass" className="text-center py-16">
      <div className="flex flex-col items-center gap-6">
        {/* Icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
            <BellIcon className="size-10 text-primary-600" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-base-100">
            <CheckCircleIcon className="size-4 text-white" />
          </div>
          <SparklesIcon className="absolute -top-1 -left-1 size-5 text-secondary-500 animate-pulse" />
        </div>

        {/* Content */}
        <div className="max-w-md">
          <h3 className="text-2xl font-bold font-display text-base-content mb-3">
            All Caught Up!
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            You're all up to date. New notifications for friend requests, messages, and updates will appear here.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-lg">
          <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span className="text-sm font-semibold text-primary-700">Friend Requests</span>
            </div>
            <p className="text-xs text-primary-600">
              Get notified when someone wants to connect
            </p>
          </div>

          <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
              <span className="text-sm font-semibold text-secondary-700">Messages</span>
            </div>
            <p className="text-xs text-secondary-600">
              Stay updated on new conversations
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default NoNotificationsFound;
