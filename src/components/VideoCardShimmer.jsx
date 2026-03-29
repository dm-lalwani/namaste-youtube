const VideoCardShimmer = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-video rounded-xl bg-gray-300" />
      <div className="mt-3 flex gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-300 shrink-0" />
        <div className="flex-1">
          <div className="h-4 w-full bg-gray-300 rounded mb-2" />
          <div className="h-4 w-3/4 bg-gray-300 rounded mb-2" />
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default VideoCardShimmer;
