import RegisterPage from "./Components/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() { 
  const router = createBrowserRouter([
    {
      path: "/register",
      element: (<RegisterPage />),
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