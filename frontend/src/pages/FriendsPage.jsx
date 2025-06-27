import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getUserFriends, getRecommendedUsers, sendFriendRequest, getOutgoingFriendReqs } from "../lib/api";
import PageLoader from "../components/PageLoader";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { SearchIcon, UserPlusIcon, UsersIcon, UserCheckIcon } from "lucide-react";

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "friends") {
      setFilteredUsers(
        friends.filter(
          (friend) =>
            friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            friend.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else if (activeTab === "discover") {
      setFilteredUsers(
        recommendedUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else if (activeTab === "pending") {
      setFilteredUsers(
        outgoingRequests.filter(
          (request) =>
            request.receiver.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.receiver.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, friends, recommendedUsers, outgoingRequests, activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === "friends") {
        const response = await getUserFriends();
        setFriends(response.friends || []);
      } else if (activeTab === "discover") {
        const response = await getRecommendedUsers();
        setRecommendedUsers(response.users || []);
      } else if (activeTab === "pending") {
        const response = await getOutgoingFriendReqs();
        setOutgoingRequests(response.outgoingRequests || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSendFriendRequest = async (userId) => {
    try {
      await sendFriendRequest(userId);
      toast.success("Friend request sent successfully");
      
      // Update the recommended users list
      setRecommendedUsers(
        recommendedUsers.map((user) =>
          user._id === userId ? { ...user, requestSent: true } : user
        )
      );
      
      // Refresh the pending requests if we're on that tab
      if (activeTab === "pending") {
        fetchData();
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Failed to send friend request");
    }
  };

  const renderContent = () => {
    if (loading) {
      return <PageLoader />;
    }

    if (filteredUsers.length === 0) {
      return <NoFriendsFound />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === "friends" &&
          filteredUsers.map((friend) => (
            <FriendCard
              key={friend._id}
              user={friend}
              actionButton={
                <button className="btn btn-primary btn-sm">
                  Message
                </button>
              }
            />
          ))}

        {activeTab === "discover" &&
          filteredUsers.map((user) => (
            <FriendCard
              key={user._id}
              user={user}
              actionButton={
                user.requestSent ? (
                  <button className="btn btn-outline btn-sm" disabled>
                    <UserCheckIcon className="size-4 mr-1" />
                    Request Sent
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleSendFriendRequest(user._id)}
                  >
                    <UserPlusIcon className="size-4 mr-1" />
                    Add Friend
                  </button>
                )
              }
            />
          ))}

        {activeTab === "pending" &&
          filteredUsers.map((request) => (
            <FriendCard
              key={request._id}
              user={request.receiver}
              actionButton={
                <button className="btn btn-outline btn-sm" disabled>
                  <UserCheckIcon className="size-4 mr-1" />
                  Pending
                </button>
              }
            />
          ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Friends</h1>
        
        <div className="w-full md:w-auto flex items-center">
          <div className="relative w-full md:w-64 mr-2">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content opacity-70" />
          </div>
        </div>
      </div>

      <div className="tabs tabs-boxed mb-6">
        <button
          className={`tab ${activeTab === "friends" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("friends")}
        >
          <UsersIcon className="size-4 mr-2" />
          My Friends
        </button>
        <button
          className={`tab ${activeTab === "discover" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("discover")}
        >
          <UserPlusIcon className="size-4 mr-2" />
          Discover
        </button>
        <button
          className={`tab ${activeTab === "pending" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          <UserCheckIcon className="size-4 mr-2" />
          Pending
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default FriendsPage;
