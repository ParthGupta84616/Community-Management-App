import RegisterPage from "./Components/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./Components/SearchPage";
import ProfilePage from "./Components/ProfilePage";
import ErrorPage from "./Components/ErrorPage";
import Home from "./Components/homePage/Home";
import Navbar from "./Components/homePage/Navbar";
import Footer from "./Components/homePage/Footer";

export default function App() { 
  const router = createBrowserRouter([
    {
      path: "/register",
      element: (<><Navbar bg={"bg-gray-300"} text={"text-gray-900"} /><RegisterPage /><Footer bg={"bg-gray-300"} text={"text-gray-900"} /></>),
    },
    {
      path: "/",
      element: (<><Navbar  bg={"bg-gray-300"} text={"text-gray-900"}/><Home /><Footer bg={"bg-gray-300"} text={"text-gray-900"} /></>),
    },
    {
      path: "/search",
      element: (<><Navbar bg={"bg-slate-900"} text={"text-gray-300"} /><SearchPage /><Footer bg={"bg-slate-900"} text={"text-gray-300"}  /></>),
    },
    {
      path: "/profile/:id",
      element: (<><Navbar bg={"bg-gray-300"} text={"text-gray-900"} /><ProfilePage /><Footer bg={"bg-gray-300"} text={"text-gray-900"} /></>),
    },
    {
      path: "/*",
      element: (<><Navbar bg={"bg-slate-900"} text={"text-gray-300"} /> <ErrorPage /><Footer bg={"bg-slate-900"} text={"text-gray-300"}  /></>),
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