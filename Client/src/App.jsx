import React from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {MyProvider} from "../context/useContext.jsx";
import {AddJob, AllJobs, Dashboard, Edit, ErrorPage, Home, Landing, Login, Register, Stats} from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <AddJob />
          },
          {
            path: "stats",
            element: <Stats />
          },
          {
            path: "all-jobs",
            element: <AllJobs />
          },
          {
            path: "edit/:jobId",
            element: <Edit />
          }
        ]
      }
    ]
  },
 
]);

function App(){
  return(
    <MyProvider>
    <RouterProvider router={router}></RouterProvider>
    </MyProvider>
    
  )
};

export default App;