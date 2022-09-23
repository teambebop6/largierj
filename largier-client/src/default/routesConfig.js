/**
 * Created by Henry Huang.
 */
import Home from './pages/Home';
import Concerts from './pages/Concerts';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/concerts',
    component: Concerts,
    exact: true,
  },
];
