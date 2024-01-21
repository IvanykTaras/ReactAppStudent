import ReactDOM from 'react-dom/client';
import {App} from "./components/routes/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Import min bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './components/routes/Login';
import { Register } from './components/routes/Register';
import { createContext } from 'react';
import { Photos } from './components/routes/Photos';
import { Profile } from './components/routes/Profile';
import { Blog } from './components/routes/Blog';
import { Users } from './components/routes/Users';
import { Home } from './components/routes/Home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/Photos",
        element: <Photos/>
      },
      {
        path: "/Profile",
        element: <Profile/>
      },
      {
        path: "/Blog",
        element: <Blog/>
      },
      {
        path: "/Users",
        element: <Users/>
      },
      
      {
        path: "/",
        element: <Home/>
      }
    
    ]
  } 
]);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RouterProvider router={router} />
);

