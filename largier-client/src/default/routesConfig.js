/**
 * Created by Henry Huang.
 */
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Concerts from './pages/Concerts';

export default [
  {
    path: '/',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/v2',
    component: Home,
    exact: true,
  },
  {
    path: '/concerts',
    component: Concerts,
    exact: true,
  },
];
