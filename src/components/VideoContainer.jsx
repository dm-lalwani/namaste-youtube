import React, { useEffect, useRef, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import VideoCardShimmer from "./VideoCardShimmer";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const fetchingRef = useRef(false);

  const getVideos = async (pageToken = "") => {
    if (fetchingRef.current) return;

    try {
      fetchingRef.current = true;
      setLoading(true);

      const response = await fetch(YOUTUBE_VIDEOS_API(pageToken));
      const data = await response.json();

      setVideos((prev) => [...prev, ...(data.items || [])]);
      setNextPageToken(data.nextPageToken || "");
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        const nearBottom = scrollTop + windowHeight >= docHeight - 200;

        if (nearBottom && nextPageToken && !loading && !fetchingRef.current) {
          getVideos(nextPageToken);
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [nextPageToken, loading]);

  return (
    <div className="mt-8">
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {videos.map((video) => (
          <Link key={video.id} to={"/watch?v=" + video.id}>
            <VideoCard info={video} />
          </Link>
        ))}

        {loading &&
          Array.from({ length: videos.length ? 4 : 8 }).map((_, i) => (
            <VideoCardShimmer key={i} />
          ))}
      </div>
    </div>
  );
};

export default VideoContainer;