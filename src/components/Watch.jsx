import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../redux/appSlice";
import { useSearchParams } from "react-router-dom";

const Watch = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  console.log(videoId);

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  if (!videoId) return null;

  return (
    <div className="px-4 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: main video + details */}
        <div className="flex-1 min-w-0">
          {/* Responsive player */}
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Video meta (you can wire this to real data later) */}
          <div className="mt-4">
            <h1 className="text-lg md:text-xl font-semibold">
              Video title goes here
            </h1>
            <div className="mt-2 flex items-center justify-between gap-4 flex-wrap">
              {/* Channel block */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Channel Name</span>
                  <span className="text-xs text-gray-500">
                    1.23M subscribers
                  </span>
                </div>
                <button className="ml-3 px-4 py-1.5 rounded-full bg-black text-white text-sm font-semibold">
                  Subscribe
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <button className="px-3 py-1.5 rounded-full bg-gray-100 text-sm">
                  👍 12K
                </button>
                <button className="px-3 py-1.5 rounded-full bg-gray-100 text-sm">
                  👎
                </button>
                <button className="px-3 py-1.5 rounded-full bg-gray-100 text-sm">
                  Share
                </button>
                <button className="px-3 py-1.5 rounded-full bg-gray-100 text-sm">
                  Save
                </button>
              </div>
            </div>

            {/* Description skeleton */}
            <div className="mt-4 rounded-xl bg-gray-100 p-3 text-sm">
              <p className="font-semibold">123,456 views • 2 days ago</p>
              <p className="mt-2 line-clamp-3">
                Video description preview goes here. Expand this when you hook
                up real data.
              </p>
            </div>
          </div>
        </div>

        {/* Right: suggested videos column */}
        <aside className="w-full lg:w-104 shrink-0 space-y-3">
          {/* Map your real suggested video cards here */}
          <div className="h-24 bg-gray-100 rounded-lg" />
          <div className="h-24 bg-gray-100 rounded-lg" />
          <div className="h-24 bg-gray-100 rounded-lg" />
          <div className="h-24 bg-gray-100 rounded-lg" />
        </aside>
      </div>
    </div>
  );
};

export default Watch;
