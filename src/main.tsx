import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HomePage } from './pages/HomePage';
import App from './App';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
