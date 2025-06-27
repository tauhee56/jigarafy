import { VideoIcon, PhoneIcon, SparklesIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-4 border-b border-base-300/50 flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0 bg-base-100/80 backdrop-blur-lg z-10">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-base-content">Start Video Call</p>
          <p className="text-xs text-neutral-500">Connect instantly</p>
        </div>

        <button
          onClick={handleVideoCall}
          className="btn-professional-primary gap-2 shadow-glow-primary hover:shadow-glow-primary group relative"
        >
          <VideoIcon className="size-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-semibold">Call</span>
          <SparklesIcon className="size-3 absolute -top-1 -right-1 text-white/80 animate-pulse" />
        </button>
      </div>
    </div>
  );
}

export default CallButton;
