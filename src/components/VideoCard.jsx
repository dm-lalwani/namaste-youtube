import React from "react";

const formatViews = (views) => {
  if (!views) return "";
  const n = Number(views);
  if (n >= 1_000_000_000)
    return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B views";
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M views";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K views";
  return n + " views";
};

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info || {};
  const { channelTitle, title, thumbnails, publishedAt } = snippet || {};

  const thumbnailUrl = thumbnails?.medium?.url || thumbnails?.high?.url;

  // Simple time-ago formatter
  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const diff = Date.now() - new Date(dateString).getTime();
    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);
    const month = Math.floor(day / 30);
    const year = Math.floor(day / 365);
    if (year > 0) return `${year} year${year > 1 ? "s" : ""} ago`;
    if (month > 0) return `${month} month${month > 1 ? "s" : ""} ago`;
    if (day > 0) return `${day} day${day > 1 ? "s" : ""} ago`;
    if (hr > 0) return `${hr} hour${hr > 1 ? "s" : ""} ago`;
    if (min > 0) return `${min} minute${min > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <article className="w-full max-w-xs sm:max-w-sm md:max-w-[20rem] cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video mb-2">
        <img
          className="w-full h-full object-cover rounded-xl"
          alt={title}
          src={thumbnailUrl}
          loading="lazy"
        />
        {/* Duration placeholder (if you later add it from API) */}
        {/* <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          12:34
        </span> */}
      </div>

      {/* Meta: avatar + text */}
      <div className="flex gap-3">
        {/* Channel avatar placeholder (YouTube shows channel image here) */}
        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
          <img
            className="object-cover rounded-full w-full h-full"
            alt={title}
            src={thumbnails?.default?.url}
            loading="lazy"
          />
        </div>

        <div className="flex flex-col">
          {/* Title */}
          <h3
            className="text-sm font-semibold leading-snug line-clamp-2 break-all"
            title={title}
          >
            {title}
          </h3>

          {/* Channel name */}
          <p className="text-xs text-gray-600 mt-1">{channelTitle}</p>

          {/* Views + time ago */}
          <p className="text-xs text-gray-600">
            {formatViews(statistics?.viewCount)}
            {publishedAt && <> • {getTimeAgo(publishedAt)}</>}
          </p>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;
