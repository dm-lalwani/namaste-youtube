import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";

const Home = lazy(() => import("./components/Home.jsx"));
const Watch = lazy(() => import("./components/Watch.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // layout at the root
    children: [
      { path: "", element: <Home /> }, // matches "/"
      { path: "watch", element: <Watch /> }, // matches "/watch"
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;
