const GOOGLE_API_KEY = "AIzaSyCzdIhgHxE11P8TLENwlKwjYN-3GYQfG7M";
// const GOOGLE_API_KEY = "AIzaSyCfXXzU7wimn1HnC_vecAn1ss7SsODDyUs";
export const YOUTUBE_VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_SEARCH_API =
  "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
// you already used this style earlier; keep it

export const YT_SEARCH_RESULTS_API = (query) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&q=${encodeURIComponent(
    query,
  )}&key=${GOOGLE_API_KEY}`;

export const LIVE_CHAT_COUNT = 25;
