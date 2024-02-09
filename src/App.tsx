import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Pages/Layout.tsx';
import Error from './Pages/Error.tsx';
import Home from './Pages/Home.tsx';
import Customization from './Pages/Customization.tsx';


function App() {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Error/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/customization",
          element: <Customization/>,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
