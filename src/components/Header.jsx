import {
  FaBars,
  FaSearch,
  FaMicrophone,
  FaVideo,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../redux/appSlice";

const Header = () => {
  const dispatch = useDispatch();
  const handleToggleSidebar = () => {
    dispatch(toggleMenu());
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-2 bg-white shadow fixed left-0 top-0 w-full z-50">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleToggleSidebar()}
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

      {/* Center: Search */}
      <form className="flex items-center flex-1 mx-2 max-w-xl">
        <input
          type="text"
          placeholder="Search"
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
