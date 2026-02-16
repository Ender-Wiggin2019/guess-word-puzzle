import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import Home from './Home';
import Login from './Login';
import Register from './Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);
