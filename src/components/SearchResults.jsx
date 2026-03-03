import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YT_SEARCH_RESULTS_API } from "../utils/constants";
import SearchResultCard from "./SearchResultCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await fetch(YT_SEARCH_RESULTS_API(query));
        const data = await res.json();
        setResults(data.items || []);
      } catch (err) {
        console.error("Search results error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (!query.trim()) {
    return (
      <div className="pt-20 px-4 text-sm text-gray-600">
        Type something in the search bar.
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 flex flex-col gap-4 max-w-5xl">
      {loading && (
        <div className="text-sm text-gray-500">Loading results...</div>
      )}

      {!loading &&
        results.map((item) => (
          <SearchResultCard key={item.id.videoId || item.etag} item={item} />
        ))}
    </div>
  );
};

export default SearchResults;