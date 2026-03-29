import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";

const AppLayout = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-14">
        <SideBar />

        <main
          className={clsx(
            "p-4 md:p-8 bg-white transition-all duration-300",
            isMenuOpen ? "md:ml-56" : "md:ml-20",
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;