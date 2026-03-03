import {
  FaBars,
  FaSearch,
  FaMicrophone,
  FaVideo,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../redux/appSlice";
import { useEffect, useRef, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../redux/searchSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const cacheSearch = useSelector((store) => store.search);
  const navigate = useNavigate();


  const handleToggleSidebar = () => {
    dispatch(toggleMenu());
  };

  // Debounced suggestion fetch
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      if(cacheSearch[searchQuery]) {
        setSuggestions(cacheSearch[searchQuery]);
        setShowSuggestions(true);
        return;
      } else {
        getSearchSuggestions(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSearchSuggestions = async (query) => {
    if (!query) return;
    try {
      const response = await fetch(
        `${YOUTUBE_SEARCH_API}${encodeURIComponent(query)}`,
      );
      // firefox client returns JSON: ["query",["s1","s2",...],...]
      const data = await response.json();
      setSuggestions(data[1] || []);
      setShowSuggestions(true);
      dispatch(
        cacheResults({
          [searchQuery]: data[1],
        }),
      );
    } catch (err) {
      console.error("Suggestion error", err);
    }
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (!searchQuery.trim()) return;

    navigate(`/results?search_query=${encodeURIComponent(searchQuery.trim())}`);
  };


  const handleSuggestionClick = (s) => {
    setShowSuggestions(false);
    setSearchQuery(s);
    setTimeout(() => {
      navigate(`/results?search_query=${encodeURIComponent(s)}`);
    }, 0);
  };


  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-2 bg-white shadow fixed left-0 top-0 w-full z-50">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleToggleSidebar}
          className="text-2xl p-2 rounded-full hover:bg-gray-100"
        >
          <FaBars />
        </button>
        <a href="/" className="flex items-center gap-1">
          <img
            src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
            alt="YouTube"
            className="h-6 md:h-7"
          />
        </a>
      </div>

      {/* Center: Search + Suggestions */}
      <div className="relative flex-1 mx-2 max-w-xl" ref={wrapperRef}>
        <form className="flex items-center w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onFocus={() => suggestions.length && setShowSuggestions(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 rounded-l-full border border-gray-300 bg-gray-100 px-4 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="h-10 w-14 flex items-center justify-center bg-gray-200 rounded-r-full border border-gray-300 border-l-0 hover:bg-gray-300"
          >
            <FaSearch />
          </button>
          <button
            type="button"
            className="ml-2 h-10 w-10 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <FaMicrophone />
          </button>
        </form>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
            <ul className="py-2">
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(s)}
                >
                  <FaSearch className="text-gray-500 text-xs" />
                  <span className="truncate">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right: Actions/Profile */}
      <div className="flex items-center gap-4">
        <button className="text-xl p-2 rounded-full hover:bg-gray-100">
          <FaVideo />
        </button>
        <button className="text-xl p-2 rounded-full hover:bg-gray-100">
          <FaBell />
        </button>
        <button className="text-xl p-2 rounded-full hover:bg-gray-100">
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
};

export default Header;
