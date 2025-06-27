import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  SparklesIcon,
  TrendingUpIcon,
  MessageCircleIcon,
  VideoIcon,
  UserIcon
} from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import Card from "../components/Card";
import Button from "../components/Button";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <SparklesIcon className="size-8 text-primary-500 animate-pulse" />
          <h1 className="text-4xl font-bold font-display text-gradient-primary">
            Welcome Back!
          </h1>
          <SparklesIcon className="size-8 text-secondary-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Connect with language partners, start video calls, and expand your global network
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card variant="gradient" className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <UsersIcon className="size-6 text-primary-600" />
            <span className="text-2xl font-bold text-primary-700">{friends.length}</span>
          </div>
          <p className="text-sm text-neutral-600 font-medium">Active Friends</p>
        </Card>

        <Card variant="gradient" className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <MessageCircleIcon className="size-6 text-secondary-600" />
            <span className="text-2xl font-bold text-secondary-700">24</span>
          </div>
          <p className="text-sm text-neutral-600 font-medium">Messages Today</p>
        </Card>

        <Card variant="gradient" className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <VideoIcon className="size-6 text-accent-600" />
            <span className="text-2xl font-bold text-accent-700">8</span>
          </div>
          <p className="text-sm text-neutral-600 font-medium">Video Calls</p>
        </Card>
      </div>

      {/* Friends Section */}
      <Card>
        <Card.Header>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Card.Title className="flex items-center gap-3">
                <UsersIcon className="size-6 text-primary-600" />
                Your Friends
                <span className="text-sm font-normal text-neutral-500">({friends.length})</span>
              </Card.Title>
              <Card.Description>
                Stay connected with your language exchange partners
              </Card.Description>
            </div>
            <Button
              as={Link}
              to="/notifications"
              variant="outline"
              size="sm"
              icon={UsersIcon}
            >
              Friend Requests
            </Button>
          </div>
        </Card.Header>

        <Card.Content>
          {loadingFriends ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="loading-professional mb-4"></div>
              <p className="text-neutral-500">Loading your friends...</p>
            </div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Recommended Users Section */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="flex items-center gap-3">
                <TrendingUpIcon className="size-6 text-secondary-600" />
                Discover New Partners
                <span className="text-sm font-normal text-neutral-500">({recommendedUsers.length})</span>
              </Card.Title>
              <Card.Description>
                Perfect language exchange matches based on your profile and interests
              </Card.Description>
            </div>
          </div>
        </Card.Header>

        <Card.Content>
          {loadingUsers ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="loading-professional mb-4"></div>
              <p className="text-neutral-500">Finding perfect matches...</p>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <Card variant="glass" className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
                  <UsersIcon className="size-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
                  <p className="text-neutral-500 max-w-md mx-auto">
                    We're working on finding the perfect language partners for you. Check back soon!
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <Card key={user._id} variant="interactive" className="group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl ring-2 ring-primary-200 group-hover:ring-primary-400 transition-all duration-200 overflow-hidden">
                          {user.profilePic ? (
                            <img
                              src={user.profilePic}
                              alt={user.fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                              <UserIcon className="size-8 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-base-100"></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-base-content group-hover:text-primary-600 transition-colors duration-200 truncate">
                          {user.fullName}
                        </h3>
                        {user.location && (
                          <div className="flex items-center gap-1 text-sm text-neutral-500 mt-1">
                            <MapPinIcon className="size-3" />
                            <span className="truncate">{user.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Language Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200">
                        {getLanguageFlag(user.nativeLanguage)}
                        <span className="text-xs font-semibold text-primary-700">
                          Native: {capitialize(user.nativeLanguage)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-xl border border-secondary-200">
                        {getLanguageFlag(user.learningLanguage)}
                        <span className="text-xs font-semibold text-secondary-700">
                          Learning: {capitialize(user.learningLanguage)}
                        </span>
                      </div>
                    </div>

                    {user.bio && (
                      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                        {user.bio}
                      </p>
                    )}

                    {/* Action Button */}
                    <Button
                      variant={hasRequestBeenSent ? "ghost" : "primary"}
                      fullWidth
                      loading={isPending}
                      disabled={hasRequestBeenSent}
                      onClick={() => sendRequestMutation(user._id)}
                      icon={hasRequestBeenSent ? CheckCircleIcon : UserPlusIcon}
                    >
                      {hasRequestBeenSent ? "Request Sent" : "Send Friend Request"}
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </Card.Content>
      </Card>
      </div>
    </div>
  );
};

export default HomePage;
