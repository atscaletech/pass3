import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Register from 'features/auth/Register';
import Login from 'features/auth/Login';
// import Dashboard from 'features/dashboard/Dashboard';
import PATHS from './paths';

const routes: RouteObject[] = [
  { path: PATHS.auth.signIn, element: <Login /> },
  { path: PATHS.auth.register, element: <Register /> },
  // {
  //   path: PATHS.dashboard,
  //   element: <Dashboard />,
  // },
  {
    path: '*',
    element: <Navigate to={PATHS.auth.register} />,
  },
];

export default routes;
