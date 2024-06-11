import RegisterPage from "./Components/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./Components/SearchPage";
import ProfilePage from "./Components/ProfilePage";

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
    {
      path: "/profile/:id",
      element: (<ProfilePage />),
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