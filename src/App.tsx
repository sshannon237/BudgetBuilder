import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './pages/Layout.tsx';
// import Error from './pages/Error.tsx';
import Home from './pages/Home.tsx';
import Customization from './pages/Customization.tsx';
import Purchases from './pages/Purchases.tsx';
import { Suspense } from 'react';


function App() {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      // errorElement: <Error/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/customization",
          element: <Customization/>,
        },
        {
          path: "/purchases",
          element: <Purchases/>,
        },
      ],
    }
  ]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
