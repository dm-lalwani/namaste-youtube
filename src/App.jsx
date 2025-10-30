import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("./components/Home.jsx"));
const Watch = lazy(() => import("./components/Watch.jsx"));

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/watch", element: <Watch /> },
]);

function App() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;
