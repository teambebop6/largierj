import List from './List';
import Add from './Add';
import Modify from './Modify';

export default [
  {
    path: '/add',
    component: Add,
    exact: true,
    admin: true,
  },
  {
    path: '/modify/:id',
    component: Modify,
    exact: true,
    admin: true,
  },
  {
    path: '/',
    component: List,
    exact: false,
    admin: true,
  },
];
