import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return <Routing />;
}

function Routing() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" index element={<HomePage />} />
        <Route path="/boards/:id" element={<h1>Board</h1>} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
