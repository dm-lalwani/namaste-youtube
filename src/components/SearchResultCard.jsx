import { formatDistanceToNow } from "date-fns";

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

const getTimeAgo = (publishedAt) => {
  if (!publishedAt) return "";
  try {
    return formatDistanceToNow(new Date(publishedAt), { addSuffix: true });
  } catch {
    return "";
  }
};

const SearchResultCard = ({ item }) => {
  const { snippet } = item || {};
  const { title, channelTitle, description, publishedAt, thumbnails } =
    snippet || {};

  const thumbnailUrl =
    thumbnails?.medium?.url ||
    thumbnails?.high?.url ||
    thumbnails?.default?.url;

  // If you later embed statistics from a videos API call, pass them in via props.
  const viewsText = item.statistics?.viewCount
    ? formatViews(item.statistics.viewCount)
    : "";

  const timeAgo = getTimeAgo(publishedAt);

  return (
    <article className="flex flex-col sm:flex-row gap-3 sm:gap-4 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full sm:w-64 flex-shrink-0">
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-200">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Right side: text metadata */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <h3
          className="text-sm sm:text-base font-semibold leading-snug line-clamp-2"
          title={title}
        >
          {title}
        </h3>

        {/* Stats line */}
        <p className="mt-1 text-xs sm:text-[13px] text-gray-600">
          {viewsText && <span>{viewsText}</span>}
          {viewsText && timeAgo && <span> • </span>}
          {timeAgo && <span>{timeAgo}</span>}
        </p>

        {/* Channel row */}
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
          <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0" />
          <span className="truncate">{channelTitle}</span>
        </div>

        {/* Description snippet */}
        <p className="mt-2 text-xs sm:text-sm text-gray-700 line-clamp-2 sm:line-clamp-3">
          {description}
        </p>
      </div>
    </article>
  );
};

export default SearchResultCard;
