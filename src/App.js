import RegisterPage from "./Components/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./Components/SearchPage";

export default function App() { 
  const router = createBrowserRouter([
    {
      path: "/register",
      element: (<RegisterPage />),
    },
    {
      path: "/search",
      element: (<SearchPage />),
    },
    
  ])

  return (
          <>
          <div>
          <RouterProvider router={router} />
          </div>
          </>
  );
}