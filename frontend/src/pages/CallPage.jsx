import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";
import Button from "../components/Button";
import { VideoIcon } from "lucide-react";
import { Link } from "react-router";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !callId) return;

      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen gradient-background flex flex-col">
      {/* Professional Call Header */}
      <div className="nav-professional h-16 flex items-center px-6 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <VideoIcon className="size-8 text-primary-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="font-bold text-lg text-base-content">Professional Call</h1>
            <p className="text-sm text-neutral-500">Secure & High Quality</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="px-3 py-1 bg-success/10 border border-success/20 rounded-full">
            <span className="text-xs font-semibold text-success">Connected</span>
          </div>
          <Link
            to="/"
            className="btn-professional-outline px-4 py-2 text-sm"
          >
            Exit Call
          </Link>
        </div>
      </div>

      {/* Call Content */}
      <div className="flex-1 relative overflow-hidden">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="card-professional p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-error/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <VideoIcon className="size-8 text-error" />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">
                Connection Failed
              </h3>
              <p className="text-neutral-600 mb-6">
                Could not initialize the call. Please check your connection and try again.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  onClick={() => window.location.reload()}
                >
                  Retry Connection
                </Button>
                <Button
                  as={Link}
                  to="/"
                  variant="outline"
                >
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <div className="h-full relative">
      <StreamTheme className="h-full">
        {/* Professional Video Layout */}
        <div className="h-full flex flex-col">
          {/* Main Video Area */}
          <div className="flex-1 relative">
            <SpeakerLayout />

            {/* Overlay Information */}
            <div className="absolute top-4 left-4 z-10">
              <div className="card-professional p-3 bg-base-100/90 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-success">Live Call</span>
                </div>
              </div>
            </div>

            {/* Call Quality Indicator */}
            <div className="absolute top-4 right-4 z-10">
              <div className="card-professional p-3 bg-base-100/90 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-success rounded-full"></div>
                    <div className="w-1 h-4 bg-success rounded-full"></div>
                    <div className="w-1 h-5 bg-success rounded-full"></div>
                    <div className="w-1 h-3 bg-success rounded-full"></div>
                  </div>
                  <span className="text-xs font-medium text-success">HD Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Call Controls */}
          <div className="p-6">
            <div className="flex justify-center">
              <div className="card-professional p-4 bg-base-100/95 backdrop-blur-xl">
                <CallControls />
              </div>
            </div>
          </div>
        </div>
      </StreamTheme>
    </div>
  );
};

export default CallPage;
