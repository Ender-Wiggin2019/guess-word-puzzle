import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Challenges from './Challenges';
import Challenge from './Challenge';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'challenges', element: <Challenges /> },
      { path: 'challenge/:id', element: <Challenge /> },
    ],
  },
]);
