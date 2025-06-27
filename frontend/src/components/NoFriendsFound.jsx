import { UsersIcon, PlusIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router';
import Card from './Card';
import Button from './Button';

const NoFriendsFound = () => {
  return (
    <Card variant="glass" className="text-center py-12">
      <div className="flex flex-col items-center gap-6">
        {/* Icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
            <UsersIcon className="size-10 text-primary-600" />
          </div>
          <SparklesIcon className="absolute -top-1 -right-1 size-6 text-secondary-500 animate-pulse" />
        </div>

        {/* Content */}
        <div className="max-w-md">
          <h3 className="text-2xl font-bold font-display text-base-content mb-3">
            Start Building Your Network
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            Connect with professionals worldwide to expand your network and enhance your communication experience.
          </p>
        </div>

        {/* Action */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            as={Link}
            to="/notifications"
            variant="primary"
            icon={PlusIcon}
          >
            Find Connections
          </Button>
          <Button
            variant="outline"
            icon={UsersIcon}
          >
            Invite Colleagues
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-200 max-w-md">
          <p className="text-sm text-primary-700 font-medium">
            💡 Tip: A complete profile helps you connect with the right professionals
          </p>
        </div>
      </div>
    </Card>
  );
};

export default NoFriendsFound;
