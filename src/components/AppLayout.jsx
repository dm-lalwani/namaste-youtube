import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    {/* Fixed header */}
    <Header />
    <div className="flex flex-1 overflow-hidden pt-14">
      {/* Sidebar, sticky on desktop, collapsible on mobile */}
      <SideBar />
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-white">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AppLayout;
