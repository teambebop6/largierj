/**
 * Created by Henry Huang.
 */
import path from 'path';
import AdminHomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ConfigurationPage from './pages/Configuration/ConfigurationPage';
// Subroutes
import eventsRoutes from './pages/Events/routesConfig';

const routes = [
  {
    path: '/admin',
    component: AdminHomePage,
    exact: true,
    admin: true,
  },
  {
    path: '/admin/configuration',
    component: ConfigurationPage,
    exact: true,
    admin: true,
  },
  {
    path: '/login',
    component: LoginPage,
    exact: true,
  },
];

// Plugin events subroute
const eventsBaseUrl = '/admin/events/';
eventsRoutes.forEach((route, index) => {
  eventsRoutes[index].path = path.join(eventsBaseUrl, route.path);
});

export default routes.concat(eventsRoutes);
