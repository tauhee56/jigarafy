import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MessageCircleIcon, VideoIcon, UserIcon, MapPinIcon, ClockIcon } from "lucide-react";

const FriendCard = ({ friend }) => {
  return (
    <div className="card-professional-interactive group animate-fade-in">
      <div className="p-6">
        {/* USER INFO */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl ring-2 ring-primary-200 group-hover:ring-primary-400 transition-all duration-200 overflow-hidden">
              {friend.profilePic ? (
                <img
                  src={friend.profilePic}
                  alt={friend.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                  <UserIcon className="size-8 text-white" />
                </div>
              )}
            </div>
            {/* Online Status */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-base-100 animate-pulse"></div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-base-content group-hover:text-primary-600 transition-colors duration-200 truncate">
              {friend.fullName}
            </h3>
            {friend.location && (
              <div className="flex items-center gap-1 text-sm text-neutral-500 mt-1">
                <MapPinIcon className="size-3" />
                <span className="truncate">{friend.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-xs text-success mt-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Online now</span>
            </div>
          </div>
        </div>

        {/* LANGUAGE BADGES */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200">
            {getLanguageFlag(friend.nativeLanguage)}
            <span className="text-xs font-semibold text-primary-700">
              Native: {friend.nativeLanguage}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-xl border border-secondary-200">
            {getLanguageFlag(friend.learningLanguage)}
            <span className="text-xs font-semibold text-secondary-700">
              Learning: {friend.learningLanguage}
            </span>
          </div>
        </div>

        {/* BIO */}
        {friend.bio && (
          <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
            {friend.bio}
          </p>
        )}

        {/* LAST ACTIVITY */}
        <div className="flex items-center gap-1 text-xs text-neutral-400 mb-4">
          <ClockIcon className="size-3" />
          <span>Active 2 hours ago</span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <Link
            to={`/chat/${friend._id}`}
            className="btn-professional-primary flex-1 text-sm gap-2"
          >
            <MessageCircleIcon className="size-4" />
            Message
          </Link>
          <button className="btn-professional-outline px-4 gap-2">
            <VideoIcon className="size-4" />
            Call
          </button>
        </div>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-4 w-5 rounded-sm object-cover shadow-sm"
      />
    );
  }
  return null;
}
