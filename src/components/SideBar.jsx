import { useSelector } from "react-redux";
import {
  FaHome,
  FaFire,
  FaYoutube,
  FaHistory,
  FaClock,
  FaThumbsUp,
} from "react-icons/fa";
import clsx from "clsx";

const menuItems = [
  { icon: <FaHome />, label: "Home", href: "/" },
  { icon: <FaFire />, label: "Trending", href: "/trending" },
  { icon: <FaYoutube />, label: "Subscriptions", href: "/subscriptions" },
  { icon: <FaHistory />, label: "History", href: "/history" },
  { icon: <FaClock />, label: "Watch Later", href: "/watch-later" },
  { icon: <FaThumbsUp />, label: "Liked Videos", href: "/liked" },
];

const SideBar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);

  return (
    <nav
      className={clsx(
        "hidden md:flex flex-col bg-white border-r border-gray-200 fixed top-14 left-0 h-[calc(100vh-56px)] z-30 transition-all duration-300",
        isMenuOpen ? "w-56" : "w-20",
      )}
    >
      <ul className="py-4 space-y-1">
        {menuItems.map(({ icon, label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition"
            >
              <span className="text-xl">{icon}</span>
              <span
                className={clsx(
                  "ml-4 truncate transition-all duration-300 origin-left overflow-hidden",
                  isMenuOpen
                    ? "opacity-100 scale-100 w-auto"
                    : "opacity-0 scale-95 w-0",
                )}
              >
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;