import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Users from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import AddStation from "./pages/AddStation";
import Stations from "./pages/Stations";
import EditStation from "./pages/EditStation";
import AddPort from "./pages/addPort";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element:          <AuthGuard>
        <DashboardLayout />
      </AuthGuard>,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'AddStation', element: <AddStation /> },
        { path: 'users', element: <Users /> },
        { path: 'stations', element: <Stations /> },
        { path: 'edit/:id', element: <EditStation /> },
        { path: 'AddPort/:id', element: <AddPort /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element:<GuestGuard> <LogoOnlyLayout /> </GuestGuard>,
      children: [
        { path: '/', element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
