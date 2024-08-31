import { StrictMode } from 'react'
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'

import App from './App'
import Home from './pages/Home/Home.jsx'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes.jsx'
import Error from './pages/Error/Error.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)


