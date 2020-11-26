import HomePage from './containers/HomePage';
import Dashboard from './containers/Dashboard';

const routes = [
  {
    path: '/home',
    component: Dashboard,
    layout: '/dashboard',
  },
];

export default routes;
