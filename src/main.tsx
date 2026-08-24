import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App';
import { LoginPage } from './pages/LoginPage';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <App />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
